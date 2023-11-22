const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoundSchema = new Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event',
    required: true,
  },

  name: {
    type: String,
    required: true
  },

  level: {
    type: Number,
    required: true
  },

  type: {                       // MCQ, Puzzle or Coding
    type: String,
    required: true
  },

  rules: {
    type: String,
    required: true
  },

  time: {                       // Time limit for the Round in Minutes
    type: Number,
    required: true,
  },

  startTime: {
    type: String,
    required: true
  },

  endTime: {
    type:Number,
    required: true
  },

  date: {
    type: Date,
    required: true,
  },

  status: {
    type: Boolean,
    default: false,
  },

  camera: {
    type: Boolean,
    default: false,
  }
});

const Round = mongoose.model("round", RoundSchema);
Round.createIndexes();
module.exports = Round;
