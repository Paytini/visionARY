const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const fs = require("fs");
const https = require("https");
const multer = require('multer');

const app = express();
const port = 4000;
const privateKey = fs.readFileSync("private.key");
const certificate = fs.readFileSync("certificate.crt");

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/front'));
app.use(express.static(__dirname + '/recourses'));
app.use(express.json());
app.use(cors());

app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/front/PaginaPrincipal.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/front/login.html');
});
app.get('/intro', (req, res) => {
    res.sendFile(__dirname + '/front/PaginaIntro.html');
});
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/front/pagAdmin.html');
});

const uri = "mongodb+srv://dianaperez84:9iJLUefvRcSEjgDC@visionary.7coaqcl.mongodb.net/";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

app.get('/get-archiver', (req, res) => {
    const folderPath = __dirname + '/recourses';

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return res.status(500).send('Internal Server Error');
        }

        res.json(files);
    });
});

app.get('/get-recourses', async (req, res) => {
    try {
        const db = client.db("cursos3d");
        const collection = db.collection('cursos3d');
        const cursor = collection.find({});
        const data = await cursor.toArray();
        if (!data) {
            return res.status(404).send('No data found');
        }
        res.send(data);
    } catch (error) {
        console.error("Error fetching resources data:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/get-users', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('users');
        const cursor = collection.find({});
        const data = await cursor.toArray();
        if (!data) {
            return res.status(404).send('No data found');
        }
        res.send(data);
    } catch (error) {
        console.error("Error fetching users data:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/save-user', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('users');
        const user = req.body;
        await collection.insertOne(user);
        res.sendStatus(201);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/update-user/:id', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('users');
        const { id } = req.params;
        const user = req.body;
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: user });
        res.sendStatus(200);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/delete-user/:id', async (req, res) => {
    try {
        const db = client.db("test");
        const collection = db.collection('users');
        const { id } = req.params;
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.sendStatus(200);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/save-resource', async (req, res) => {
    try {
        const db = client.db("cursos3d");
        const collection = db.collection('cursos3d');
        const resource = req.body;
        await collection.insertOne(resource);
        res.sendStatus(201);
    } catch (error) {
        console.error("Error adding resource:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/update-resource/:id', async (req, res) => {
    try {
        const db = client.db("cursos3d");
        const collection = db.collection('cursos3d');
        const { id } = req.params;
        const resource = req.body;
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: resource });
        res.sendStatus(200);
    } catch (error) {
        console.error("Error updating resource:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/delete-resource/:id', async (req, res) => {
    try {
        const db = client.db("cursos3d");
        const collection = db.collection('cursos3d');
        const { id } = req.params;
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.sendStatus(200);
    } catch (error) {
        console.error("Error deleting resource:", error);
        res.status(500).send('Internal Server Error');
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'recourses/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// La parte de archivo
const upload = multer({ storage: storage });

app.post('/upload-file', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    res.json({ filename: file.originalname, path: file.path });
});

app.post('/rename-file', (req, res) => {
    const { oldName, newName } = req.body;
    const oldPath = `${__dirname}/recourses/${oldName}`;
    const newPath = `${__dirname}/recourses/${newName}`;

    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error('Error renaming file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('File renamed successfully:', newName);
            res.sendStatus(200);
        }
    });
});

app.delete('/delete-file/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = `${__dirname}/recourses/${filename}`;

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('File deleted successfully:', filename);
            res.sendStatus(200);
        }
    });
});

async function startServer() {
    try {
        await connectToDatabase();
        const credentials = {
            key: privateKey,
            cert: certificate,
            passphrase: "123456"
        };
        const httpsServer = https.createServer(credentials, app);
        httpsServer.listen(port, () => {
            console.log('HTTPS server listening on port:', port);
        }).on('error', err => {
            console.error('Error starting server:', err);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();
