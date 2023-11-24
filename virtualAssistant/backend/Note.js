const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: String,
  description: String,
  time: { type: Date, default: Date.now },
  username: String,
});

const NoteModel = new mongoose.model("notes", NoteSchema);

module.exports = NoteModel;
