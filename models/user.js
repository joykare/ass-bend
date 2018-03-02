const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    unique: true
  }
})

module.exports = mongoose.model("User", userSchema);