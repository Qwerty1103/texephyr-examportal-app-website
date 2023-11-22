const mongoose = require("mongoose");
const { Schema } = mongoose;

const Fquestions = new Schema({
    questionId: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        id: Number,
        option: String,
        _id: false  
      },
    ],
    timerSeconds: {
      type: Number,
      required: true,
    },
    answerOption: {
      type: Number,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  }, { versionKey: false });

module.exports = Fquestions;


