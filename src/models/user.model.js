const mongoose = require('mongoose');
const { Schema } = mongoose;
// Para comparar las contraseñas, generar el hash y el salt
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');

// Lo que deseemos
const UserSchema = new Schema({
    name : {type: String, required: true},
    username : {type: String, required: true},
    password : {type: String, required: true}
});

// En esta función reescribimos el json quitando el password, para evitar que se vea
UserSchema.pre.toJSON = function (){
    let user = this.toObject();
    delete user.password;
    return user;
};

UserSchema.methods.comparePasswords = function(password){
    return compareSync(password, this.password);
};

// Hook para salvar cada vez que se ejecute el schema al guardar.
UserSchema.pre('save', async function(next){
    // Con la función tradicional, hacemos el scope del usuario que estamos guardando, no se pierde.
    const user = this;

    if(!user.isModified("password")){
        return next();
    }

    // Si la contraseña se modifica, armamos el salt
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
});

module.exports = mongoose.model('user', UserSchema);