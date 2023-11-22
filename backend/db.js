const mongoose = require('mongoose');
const dotenv = require('dotenv');
mongoose.set('strictQuery', false);

dotenv.config({path: __dirname + '/config.env' });

const uri = process.env.DATABASE;

const connectToMongo = () => {
    mongoose.connect(uri).then( ()=> {
        console.log("Mongo Connected");
    }).catch((err) => console.log("Could Not Connect"));
}

module.exports = connectToMongo;