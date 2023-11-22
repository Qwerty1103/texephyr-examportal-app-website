const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScoreBoardSchema = new Schema({
  roundId:{type:mongoose.Schema.Types.ObjectId},
  user_id: { type: String },
  questionArray: [
    {
      questionName: { type: String },
      questionId: { type: mongoose.Schema.Types.ObjectId },
      testCases : {type:Number,default:0}
    },
  ],
  time:{type:Number}
});

const Temporary=mongoose.model("temporaries ",ScoreBoardSchema)
module.exports = Temporary;
