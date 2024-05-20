const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, GridFSBucket } = require('mongodb');
const fs = require("fs");
const https = require("https");
const multer = require('multer');

const app = express();
const port = 4000;
// const userRouter = require("./routers/userRouter.js");
const llavePrivada = fs.readFileSync("private.key");
const certificado = fs.readFileSync("certificate.crt");


app.use(express.static(__dirname));
app.use(express.static(__dirname+'/front'));
app.use(express.static(__dirname+'/recourses'));
app.use(express.json());
app.use(cors());

app.get('/main',(req,res)=>{
    res.sendFile(__dirname+'/front/PaginaPrincipal.html');
})
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

// 定义路由
app.get('/get-archiver', (req, res) => {
    const folderPath = __dirname+'/recourses';

    // Read the files in the folder
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Send the list of files as JSON
        res.json(files);
    });
});
app.get('/get-recourses', async (req, res) => {
    try {
        const base = client.db("cursos3d");
        const collection = base.collection('cursos3d');
        const cursor = collection.find({});
        const data = await cursor.toArray();
        if (!data) {
            return res.status(404).send('No data found');
        }
        console.log("existe");
        res.send(data);
    } catch (error) {
        console.error("Error fetching pattern data:", error);
        res.status(500).send('Internal Server Error');
    }
});
// app.use('/get-users',userRouter);
app.get('/get-users', async (req, res) => {
    try {
        const base = client.db("test");
        const collection = base.collection('users');
        const cursor = collection.find({});
        const data = await cursor.toArray();
        if (!data) {
            return res.status(404).send('No data found');
        }
        console.log("existe");
        res.send(data);
    } catch (error) {
        console.error("Error fetching pattern data:", error);
        res.status(500).send('Internal Server Error');
    }
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'recourses/'); // 指定上传文件保存的目录
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // 保留上传文件的原始文件名
    }
  });
  const upload = multer({ storage: storage });

  app.post('/upload-file', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    // 在这里处理文件，比如保存文件路径到数据库中或者执行其他操作
    res.json({ filename: file.originalname, path: file.path }); // 返回文件信息
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
        // client.close();
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();