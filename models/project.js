const mongoose = require("mongoose");
const projectSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  likes: [{ ref: "user", type: mongoose.Schema.Types.ObjectId }],
  unlikes: [{ ref: "user", type: mongoose.Schema.Types.ObjectId }],
  superlikes: [{ ref: "user", type: mongoose.Schema.Types.ObjectId }],
  favourites: [{ ref: "user", type: mongoose.Schema.Types.ObjectId }],
});
const project = mongoose.model("project", projectSchema);
module.exports = { project };
