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
    async getUserEmergencyContacts(req, res) {
        try {
            // Obtener el usuario por su ID
            const user = await userService.getUserById(req.params.id);

            // Verificar si el usuario existe
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            

            // Obtener los contactos de emergencia del usuario
            const emergencyContacts = user.emergency_contacts;

            // Extraer nombre y teléfono de cada contacto de emergencia
            const contactsData = emergencyContacts.map(contact => ({
                name: contact.name,
                phone: contact.phone
            }));

            // Enviar los datos de los contactos de emergencia
            return res.status(200).send(contactsData);
        } catch (err) {
            res.status(500).send(err);
        }
    },
};
