const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    _id:                        // We'll use TexID as id
    {
        type: String
    },
    
    name:
    {
        type: String,
        required: true
    },

    phone:
    {
        type: Number,
        required: true,
        unique: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },

    college: {
        type: String,
        required: true
    },

    proof: {
        type: String,
        required: false
    },
    
    app_logged_in: {                    // Prevents multiple logins of same account(App)
        type: Boolean,
        required: true,
        default: 0
    },

    portal_logged_in: {                 // Prevents multiple logins of same account(Portal)
        type: Boolean,
        required: true,
        default: 0
    }
},
{ _id: false })

const User = mongoose.model('user', UserSchema);
User.createIndexes();
module.exports = User;
