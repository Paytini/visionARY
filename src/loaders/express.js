import routes from '../api/index.js';
import config from '../config/index.js';
import bodyParser from 'body-parser';
import express from 'express';
import User from '../models/user.js';
import path from 'path';
import https from 'https'; // 导入 https 模块
import fs from 'fs'; // 导入文件系统模块

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default app => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(config.api.prefix, routes());

    app.post('/register', (req, res) => {
        // 注册路由的逻辑
        const { id, name, email, password, rol } = req.body;
        try {
            const newUser = new User({ id, name, email, password, rol });
            newUser.save();
            res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    });

    app.post('/authenticate', (req, res) => {
        // 认证路由的逻辑
        const { email, password } = req.body;
        User.findOne({ email }, (err, user) => {
            if (err) {
                res.status(500).send('ERROR AL AUTENTIFICAR AL USUARIO');
            } else if (!user) {
                res.status(404).send('EL USUARIO NO EXISTE');
            } else {
                user.isCorrectPassword(password, (err, result) => {
                    if (err) {
                        res.status(500).send('ERROR AL AUTENTIFICAR');
                    } else if (result) {
                        res.status(200).send('USUARIO AUTENTIFICADO CORRECTAMENTE');
                    } else {
                        res.status(401).send('USUARIO Y/O CONTRASEÑA INCORRECTA');
                    }
                });
            }
        });
    });

    app.get('/', (req, res) => {
        res.send('HELLO FELLOW DEVELOPERS!');
    });

    // 读取 SSL 证书和私钥文件
    const privateKey = fs.readFileSync('../private.key', 'utf8');
    const certificate = fs.readFileSync('../certificate.crt', 'utf8');
    const credentials = { key: privateKey, cert: certificate, passphrase: "123456" };

    // 创建 HTTPS 服务器并监听 HTTPS 端口
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(config.port, err => {
        if (err) {
            process.exit(1);
            return;
        }
        console.log(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️ 
        ################################################
        `);
    });
};
