const mongoose = require('mongoose');
const { Schema } = mongoose;

const PortalAdminSchema = new Schema({
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

const PortalAdmin = mongoose.model('portaladmin', PortalAdminSchema);
PortalAdmin.createIndexes();
module.exports = PortalAdmin;