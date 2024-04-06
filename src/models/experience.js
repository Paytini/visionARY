import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    idExp: {
        type: Number,
        required:true,
    },
    descripcion: {
        type: String,
        required: true,
    },
});

const model = mongoose.model('experience', UserSchema);

export default model;
