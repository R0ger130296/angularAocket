;
'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuario_model = new Schema({
    nombre: { type: String },
    apellido: { type: String },
    email: { type: String },
    edad: { type: Number },
    passw: { type: String },
    createAt: { type: String },
    sessionID: { type: String },
    rol: { type: String },
});

module.exports = mongoose.model('usuarios', usuario_model);