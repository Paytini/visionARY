import express from 'express';
import config from './config/index.js';
import loaders from './loaders/index.js';
import cors from 'cors'; // Importa el módulo CORS

async function startServer() {
    const app = express();

    // Usa CORS middleware
    app.use(cors({
        origin:'https://localhost:4000', // Permite solicitudes solo desde este origen (puerto 3000)
        optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios SmartTVs) interpretan el código de estado 204 como una falla, así que se usa 200 aquí.
    }));

    await loaders(app).catch(e => {
        console.log('AN ERROR OCCURED!');
        throw e;
    });
}

startServer();