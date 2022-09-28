const mongoose = require("mongoose");
const {Schema} = mongoose;

//Creacion del esquema del modelo de la base de datos
const RayCosScheme = new Schema(
{
    lugar: {type: String, require: true},
    temperatura: {type: Number, default:0},
    saturacion: {type: Number, default:0},
    luz: {type: Number, default:0},    
},
{
    timestamps: true,
}
);
module.exports = mongoose.model("infoRC", RayCosScheme)