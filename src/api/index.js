import user from './routes/user.js';
import express from 'express';
// guaranteed to get dependencies
export default () => {
    const router = express.Router();
    user(router);
    return router;
};
