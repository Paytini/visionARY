import routes from '../api/index.js';
import config from '../config/index.js';
import bodyParser from 'body-parser';
import express from 'express';
import User from '../models/user.js';
import path from 'path';
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);


export default app => {

    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());
    // must return a Router
    app.use(config.api.prefix, routes());

    app.post('/register', (req, res) => {
        //const {email, password} = req.body;
        const { id, name, email, password, rol } = req.body;
        try {

            // Crear un nuevo usuario utilizando el modelo User
            const newUser = new User({ id, name, email, password, rol });
    
            // Guardar el nuevo usuario en la base de datos
            newUser.save();
    
            // Enviar una respuesta indicando que el usuario ha sido registrado correctamente
            res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
        } catch (error) {
            // Si ocurre algún error durante el registro, enviar una respuesta de error
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
        /*
        const user = new User({email, password});
        user.save(err => {
            if(err){
                res.status(500).send('ERROR AL REGISTRAR AL USUARIO');
            }else{
                res.status(500).send('USUARIO REGISTRADO');
            }
        });*/
    });

    app.post('/authenticate', (req, res) => {
        //const {email, password} = req.body;
        const { id, name, email, password, rol } = req.body;
        User.findOne({email}, (err, user) => {
            if(err){
                res.status(500).send('ERROR AL AUTENTIFICAR AL USUARIO');
            }else if(!user){
                res.status(404).send('EL USUARIO NO EXISTE');
            }else{
                user.isCorrectPassword(password, (err,result) => {
                    if(err){
                        res.status(500).send('ERROR AL AUTENTIFICAR');

                    }else if(result){
                        res.status(200).send('USUARIO AUTENTIFICADO CORRECTAMENTE');

                    }else{
                        res.status(401).send('USUARIO Y/O CONSTRASEñA INCORRECTA');

                    }
                });
            }
        });
    });

    app.get('/', (req, res) => {
        res.send('HELLO FELLOW DEVELOPERS!');
    });

    app.listen(config.port, err => {
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
