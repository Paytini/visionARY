import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required:true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
    },
});

const model = mongoose.model('User', UserSchema);

export default model;
