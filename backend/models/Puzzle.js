const mongoose = require('mongoose');
const { Schema } = mongoose;



const PuzzleSchema = new Schema({ 
  ques:{type:String},
  options:[
   {
      id:{type:Number},
      q:{type:String},
     _id:false
   },
],
  ans:{type:Array}


} )

module.exports = PuzzleSchema;
