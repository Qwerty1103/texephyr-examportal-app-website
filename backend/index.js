const connectToMongo = require('./db')
const https = require("https");
const fs = require("fs");
const path = require("path")
connectToMongo();

const express = require('express')
const app = express()

const fileUpload = require('express-fileupload');

const cors = require('cors');
const morgan = require('morgan');
app.use(cors());

app.use(fileUpload());

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next();
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Backend Running Successfully')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/webadmin', require('./routes/admin'))
app.use('/api/webuser', require('./routes/webuser'))
app.use("/api/portal/questions",require('./routes/portalques'))
app.use("/api/portaladmin",require('./routes/portaladmin'))
app.use("/api/memberapp",require('./routes/mapp'))
app.use("/api/Otp",require('./routes/otp'))

// https
//   .createServer({
//     key: fs.readFileSync("key.pem"),
//     cert: fs.readFileSync("cert.pem"),
//   }, app)
//   .listen(process.env.PORT, ()=>{
//     console.log('Server is runing at port 3000')
//   });

app.listen(5000,()=>{console.log("port started on 5000")})
