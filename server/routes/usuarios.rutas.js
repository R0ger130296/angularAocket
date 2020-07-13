;
'use strict'
const express = require('express');
let api = express.Router(),
    usuarioControl = require('../controllers/usuario.controller');

api.post('/login', usuarioControl.login)
module.exports = api