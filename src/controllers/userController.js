//import mongooseService from "../services/mongoose.js";
import userService from '../services/userService.js';

export default {
    async getAllUsers(req, res) {
        try {
            return res.status(200).send(await userService.getAllUsers());
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            return res.status(200).send(user); // Envía toda la información del usuario
        } catch (err) {
            res.status(500).send(err);
        }
    },    
    async createUser(req, res) {
        try {
            return res.status(200).send(await userService.createUser(req.body));
        } catch (err) {
            res.status(500).send(err);
        }
    },
    
};
