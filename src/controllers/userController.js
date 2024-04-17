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
            return res.status(200).send(user);
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
    async updateUser(req, res) {
        try {
            const updatedUser = await userService.updateUser(req.params.id, req.body);
            return res.status(200).send(updatedUser);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async deleteUser(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            return res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async getAllAdminUsers(req, res) {
        try {
            const adminUsers = await userService.getAllAdminUsers('Admin');
            return res.status(200).send(adminUsers);
        } catch (err) {
            return res.status(500).json({message:"NO Error"});
        }
    },
};