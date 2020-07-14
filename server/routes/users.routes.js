const express = require("express");

let api = express.Router(),
  userController = require("../controllers/users.controller"),
  authController = require("../controllers/middlewares/auth.controller");

//users ENDPOINT
api.post("/login", userController.loginUsers);

module.exports = api;
