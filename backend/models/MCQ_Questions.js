const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuesSchema = Schema({
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
      id: {type:Number},
      o: {type:String}
    },
    {
      id: {type:Number},
      o: {type:String}
    },
    {
      id: {type:Number},
      o: {type:String},
    },
    {
      id: {type:Number},
      o: {type:String}
    },
  ],
  answerOption: {
    type: Number,
    required: true,
  },
  marks:{
    type:Number,
    required:true
  }
});

module.exports = QuesSchema;
