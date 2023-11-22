const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  
  date: {
    type: Date,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  details: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },

  entries: {
    type: Number, // Solo Event or Group
    required: true,
  },

  dept:
  {
    type: String,
    required: true
  },

  // Image URL to display on the frontend
  image: {
    type: String,
    required: true,
  },

  fees: {
    type: Number,
    required: true
  },

  rounds: {
    type: Number,
    required: true
  },

  portal:{
    type: Boolean,
    default: false
  },

  collect_off: {
    type: Number,
    default: 0
  },

  collect_on: {
    type: Number,
    default: 0
  },

  // If the event is alive yet (Admin will authorize on event day)
  status: {
    type: Boolean,
    default: 0
  },

  target:
  {
    type: Number,
    default: 10
  }

});

const Event = mongoose.model("event", EventSchema);
Event.createIndexes();
module.exports = Event;