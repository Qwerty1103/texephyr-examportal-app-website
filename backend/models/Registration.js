const mongoose = require('mongoose');
const { Schema } = mongoose;

const RegistrationSchema = new Schema({
    eventid:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        required: true
    },

    userid:
    {
        type: [mongoose.Schema.Types.String],
        ref: "user",
        required: true
    },

    reg_type:                                       // Offline or Online
    {
        type: String,
        required: true
    },

    reference_id:                                   // Optional ID for offline PR
    {
        type: String,
        default: null
    },

    regDate:
    {
        type: Date,
        default: new Date().toISOString()
    },

    completed:
    {
        type: Boolean,
        default: false
    }
})

const Registration = mongoose.model('registrations', RegistrationSchema);
Registration.createIndexes();
module.exports = Registration;