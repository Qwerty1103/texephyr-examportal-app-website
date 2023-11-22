const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScoreBoardSchema=new Schema({

    user_id:{type:String},
    marks:{type:Number},
    time:{type:Number}
})

//const ScoreBoard=mongoose.model("ScoreBoard",ScoreBoardSchema)
module.exports=ScoreBoardSchema
