const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  username: String,
});

const EventModel = new mongoose.model("events", EventSchema);

module.exports = EventModel;
