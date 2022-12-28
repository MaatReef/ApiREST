const mongoose = require ('mongoose');
const {Schema} = mongoose;

const CommentSchema = new Schema({
    comment : {type: String, required: true},
    description : {type: String},
    author: { 
        type: Schema.Types.ObjectId, 
        ref: "user", 
        required: true, 
        autopopulate: true
    }
});

// Plugin, antes de exportar el modelo..
// Son métodos que le dan más poder a mongoose.
// Con el autopopulate en true, cuando hace un find.. Hace la relación con el user
// No es siempre recomendable usarlo, pero ahora viene bien

CommentSchema.plugin(require("mongoose-autopopulate"));

// El nommbre entre "", hace referencia al mismo nombre del esquema, lo elegimos
module.exports = mongoose.model("comment", CommentSchema);