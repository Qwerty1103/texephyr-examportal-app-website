const mongoose = require("mongoose");
const { Schema } = mongoose;

const MemberSchema = new Schema ({

    _id:
    {
        type: String
    },

    name:
    {
        type: String,
        required: true
    },

    dept:
    {
        type: String,
        required: true
    },

    email:
    {
        type: String,
        required: true
    },

    phone:
    {
        type: Number,
        required: true
    },

    password:
    {
        type: String,
        required: true
    },

    role:                                   // All or Some or Few
    {
        type: String,
        required: true
    },

    money_holding:
    {
        type: Number,
        default: 0
    },

    total_money:
    {
        type: Number,
        default: 0
    },

    status:
    {
        type: Number,
        default: 0
    }

},
{ _id: false })

const Member = mongoose.model("member", MemberSchema);
Member.createIndexes();
module.exports = Member;

