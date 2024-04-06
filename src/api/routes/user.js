import express from 'express';
import userController from '../../controllers/userController.js';
const route = express.Router();

export default router => {
    route.get('/', (req, res) => userController.getAllUsers(req, res));
    route.get('/:id', (req, res) => userController.getUserById(req, res));
    route.post('/', (req, res) => userController.createUser(req, res));
    router.get('/ec/:id', (req, res) => userController.getUserEmergencyContacts(req, res));

    router.use('/users', route);
    
};
