const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = Schema({
  name: { type: String },
  lastname: { type: String },
  age: { type: Number },
  email: { type: String },
  profile_pic: { type: String },
  password: { type: String },
  sessionID: { type: String },
  createAt: { type: Date },
  role: { type: String },
  academicTitle: { type: String },
});

module.exports = mongoose.model("User", userModel);
