const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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

app.get('/', async (req, res) => {
    let base;
    try {
        await client.connect();
        base = client.db("3d");
        const collection = base.collection('images');
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const doc = await collection.findOne({});
        const patternData = Buffer.from(doc.image.buffer);
        res.send(patternData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    } finally {
        if (client) await client.close();
    }
});

app.get('/model', async (req, res) => {
    let base;
    try {
        await client.connect();
        base = client.db("3d");
        const collection = base.collection('models');
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const doc = await collection.findOne({});
        const modelData = Buffer.from(doc.model.buffer);
        res.send(modelData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    } finally {
        if (client) await client.close();
    }
});

app.get('/scene', async (req, res) => {
    let base;
    try {
        await client.connect();
        base = client.db("3d");
        const collection = base.collection('scenes');
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const doc = await collection.findOne({});
        const sceneData = Buffer.from(doc.scene.buffer);
        res.send(sceneData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    } finally {
        if (client) await client.close();
    }
});

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
