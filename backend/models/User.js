const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true }, 
    role: String,
    status: { type: String, default: "active" }, 
    bio: String,
  },
  { timestamps: true } 
);


module.exports = mongoose.model("User", userSchema);
