const mongoose = require("mongoose");
const { Schema } = mongoose;

const Game=new Schema({

    user_id:{type:String},
    time:{type:Number},
    type:{type:String}
})


module.exports=Game