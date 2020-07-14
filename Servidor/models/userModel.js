const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = Schema({
    nombre: { type: String },
    apellido: { type: String },
    edad: { type: Number },
    email: { type: String },
    passw: { type: String },
    sessionID: { type: String },
    createAt: { type: Date },
    rol: { type: String },
});

module.exports = mongoose.model("usuarios", userModel);