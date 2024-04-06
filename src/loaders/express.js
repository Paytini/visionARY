import routes from '../api/index.js';
import config from '../config/index.js';
import bodyParser from 'body-parser';

export default app => {
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());
    // must return a Router
    app.use(config.api.prefix, routes());

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
