import dbService from './dbService.js';
import user from '../models/user.js';
import mongoose from 'mongoose';
// TODO: import user model
// TODO: Write query

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
};
