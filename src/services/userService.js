import dbService from './dbService.js';
import user from '../models/user.js';
export default {
    async getAllUsers() {
        return await dbService.find(user, {});
    },
    async getUserById(id) {
        return await dbService.findById(user, id);
    },
    async createUser(data) {
        return await dbService.create(user, data);
    },
    async updateUser(id, newData) {
        return await dbService.update(user, id, newData);
    },
    async deleteUser(id) {
        return await dbService.delete(user, id);
    },
    async getAllAdminUsers() {
        return await dbService.findByRole(user, 'Admin');
    },
    

};