import express from 'express';
import userController from '../../controllers/userController.js';
const route = express.Router();

export default router => {
    route.get('/', (req, res) => userController.getAllUsers(req, res));
    route.get('/admin', (req, res) => userController.getAllAdminUsers(req, res));
    route.get('/:id', (req, res) => userController.getUserById(req, res));
    route.post('/', (req, res) => userController.createUser(req, res));
    route.put('/:id', (req, res) => userController.updateUser(req, res));
    route.delete('/:id', (req, res) => userController.deleteUser(req, res));
    route.post('/login',(req,res)=> userController.loginUser(req,res));

    router.use('/users', route);
};
