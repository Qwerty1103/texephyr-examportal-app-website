const mongoose = require('mongoose');
const { Schema } = mongoose;

const PC_questions = new Schema({
    questionId: {
        type: Number,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
})

module.exports=PC_questions;