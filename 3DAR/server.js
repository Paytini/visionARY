const express = require('express');
const cors = require('cors');
const fs = require("fs");
const https = require("https");
const path = require("path");
const app = express();
const port = 3000;

const llavePrivada = fs.readFileSync("private.key");
const certificado = fs.readFileSync("certificate.crt");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/3D2.html'); 
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
