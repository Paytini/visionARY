//import mongooseService from "../services/mongoose.js";
import userService from '../services/userService.js';

async function loginUser(email, password) {
    try {
        // Buscar usuario por email
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return { success: false, message: "El usuario no existe." };
        }

        // Comparar contraseñas (sin bcrypt)
        if (password === user.password) {
            // Contraseña correcta, iniciar sesión exitosa
            return { success: true, message: "Inicio de sesión exitoso.", user };
        } else {
            // Contraseña incorrecta
            return { success: false, message: "Contraseña incorrecta." };
        }
    } catch (error) {
        // Manejar errores
        console.error("Error al iniciar sesión:", error);
        return { success: false, message: "Error al iniciar sesión." };
    }
}
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
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const result = await loginUser(email, password);
            res.status(result.success ? 200 : 401).send(result);
        } catch (err) {
            res.status(500).send("Error interno del servidor.");
        }
    },
};