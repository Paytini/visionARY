import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
    idRew: {
        type: Number,
        required:true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    puntaje:{
        type: String,
        required: true,
    }
});

const model = mongoose.model('experience', rewardSchema);

export default model;
