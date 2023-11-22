const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShortlistedSchema=new Schema({

    user_id:{type:String},
    completed: {type: Boolean, default: false}

})

//const ScoreBoard=mongoose.model("ScoreBoard",ScoreBoardSchema)
module.exports=ShortlistedSchema
