const mongoose = require('mongoose');
const { Schema } = mongoose;

const WebAdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
})

const WebAdmin = mongoose.model('webadmin', WebAdminSchema);
WebAdmin.createIndexes();
module.exports = WebAdmin;