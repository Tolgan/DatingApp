const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  image: { type: String, required: true },
  likedUsers: [
    { type: mongoose.Schema.Types.ObjectId, unique: true, ref: "User" },
  ],
  dislikedUsers: [
    { type: mongoose.Schema.Types.ObjectId, unique: true, ref: "User" },
  ],
  likedBy: [
    { type: mongoose.Schema.Types.ObjectId, unique: true, ref: "User" },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
