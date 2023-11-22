const mongoose = require('mongoose');
const { Schema } = mongoose;

const CodeSchema=new Schema({
    problem_code:{type:String,required:true},
    questionName:{type:String,required:true},
    problem:{type:String,required:true},
    example:[{
        input:{type:String,required:true},
        output:{type:String,required:true},
        explanation:{type:String},
        show:{type:Boolean, required:true}
    }],
    constraints:[{
        statement:{type:String,required:false}
    }],
    time_limit:{type:Number,require:false},
    Space_Complexity:{type:String},
    resultCode:{type:String}
})

module.exports=CodeSchema
