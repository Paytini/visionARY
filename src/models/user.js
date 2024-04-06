import mongoose from 'mongoose';

const EmergencyContactSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    relationship: {
        type: String,
        required: true,
    }
});

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
    phone: {
        type: String,
        required: true,
    },
    blood_type: {
        type: String,
        required: false,
    },
    emergency_contacts: [EmergencyContactSchema] // Array of emergency contacts
});

const model = mongoose.model('User', UserSchema);

export default model;
