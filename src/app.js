import express from 'express';
import config from './config/index.js'; //TODO: Why can't i leave out the /index.js part?
import loaders from './loaders/index.js';

async function startServer() {
    const app = express();

    loaders(app).catch(e => {
        console.log('AN ERROR OCCURED!');
        throw e; // TODO: sensible error handling
    });
}

startServer();
