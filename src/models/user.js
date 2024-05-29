import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const saltRounds = 10;
const UserSchema = new mongoose.Schema({
    id: {
        type: String,
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


UserSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword)  => {
            if(err){
                next(err);
            }else{
                document.password = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
});

UserSchema.methods.isCorrectPassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) {
            // Si hay un error al comparar las contraseñas, pasa el error al callback
            return callback(err);
        }
        // Si la comparación fue exitosa, pasa el resultado al callback
        callback(null, isMatch);
    });
};

// Método para verificar si una contraseña proporcionada coincide con la contraseña almacenada
UserSchema.methods.isMatch = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Error al comparar las contraseñas');
    }
};

const model = mongoose.model('User', UserSchema);

export default model;