import express from 'express';
import config from './config/index.js';
import loaders from './loaders/index.js';
import cors from 'cors';
import os from 'os';

async function startServer() {
    const app = express();

    // 获取当前服务器的 IP 地址
    const interfaces = os.networkInterfaces();
    let ipAddress = 'localhost'; // 默认使用 localhost
    for (const interfaceName of Object.keys(interfaces)) {
        const iface = interfaces[interfaceName];
        for (const alias of iface) {
            if (alias.family === 'IPv4' && !alias.internal) {
                ipAddress = alias.address;
                break;
            }
        }
    }

    // 使用 CORS 中间件
    app.use(cors({
        origin: [`https://${ipAddress}:4000`,`https://localhost:4000`], // 使用当前 IP 地址作为路由地址，端口为 4000
        optionsSuccessStatus: 200
    }));

    await loaders(app).catch(e => {
        console.log('AN ERROR OCCURRED!');
        throw e;
    });
}

startServer();
