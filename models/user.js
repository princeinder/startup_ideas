const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  favourite: [{ ref: "project", type: mongoose.Schema.Types.ObjectId }],
});

const user = mongoose.model("user", userSchema);
module.exports = { user };
