const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContentSchema = new Schema({
    home: 
    {
            "s1p1" : {type: String},
            "s1p2" : {type: String},
            "s2p1" : {type: String},
            "s2p2" : {type: String},
            "s2p3" : {type: String},
            "s2p4" : {type: String},
            "s2p5" : {type: String},
            "s2p6" : {type: String},
            "s2p7" : {type: String}
    },
    
    about:
    {
        "s1p1" : {type: String},
        "s1p2" : {type: String},
        "s1p3" : {type: String}
    },

    contact:
    {
        "s1p1" : {type: String},
        "s1p2" : {type: String},
        "s1p3" : {type: String}
    }
})

const Content = mongoose.model('content', ContentSchema);
Content.createIndexes();
module.exports = Content;