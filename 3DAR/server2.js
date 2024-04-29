const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, GridFSBucket } = require('mongodb');
const fs = require("fs");
const https = require("https");

const app = express();
const port = 4000;

const llavePrivada = fs.readFileSync("private.key");
const certificado = fs.readFileSync("certificate.crt");

app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://haifengyu:145365258@3d.nkhtzja.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// 连接到 MongoDB
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

// 定义路由
app.get('/', async (req, res) => {
    try {
        const base = client.db("3d");
        const collection = base.collection('images');
        const doc = await collection.findOne({});
        if (!doc) {
            return res.status(404).send('No data found');
        }
        console.log("existe");
        const patternData = Buffer.from(doc.image.buffer);
        res.send(patternData);
    } catch (error) {
        console.error("Error fetching pattern data:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/model', async (req, res) => {
    try {
        const base = client.db("3d");
        const bucket = new GridFSBucket(base);

        // Download the model file from GridFS
        const downloadStream = bucket.openDownloadStreamByName('tren.glb');

        let modelData = Buffer.from('');
        
        downloadStream.on('data', (chunk) => {
            modelData = Buffer.concat([modelData, chunk]);
        });

        downloadStream.on('error', (error) => {
            console.error("Error downloading model:", error);
            res.status(500).send('Internal Server Error');
        });

        downloadStream.on('end', () => {
            console.log('Model retrieved from database');
            // Send the model data to the client
            res.send(modelData);
        });

    } catch (error) {
        console.error("Error fetching model data:", error);
        res.status(500).send('Internal Server Error');
    }
});


async function startServer() {
    try {
        await connectToDatabase();
        const credenciales = {
            key: llavePrivada,
            cert: certificado,
            passphrase: "123456" // Contraseña de la llave privada utilizada en la creación del certificado
        };
        const httpsServer = https.createServer(credenciales, app);
        httpsServer.listen(port, () => {
            console.log('Servidor HTTPS escuchando en el puerto:', port);
        }).on('error', err => {
            console.log('Error al iniciar el servidor:', err);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();
