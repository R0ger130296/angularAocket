const express = require("express");

let api = express.Router(),
    userController = require("../controllers/users.controller"),
    authController = require("../controllers/auth.controller");

//users ENDPOINT
api.post("/login", userController.login);

module.exports = api;