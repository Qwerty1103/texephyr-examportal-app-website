const express = require("express");
const crypto = require("crypto");
const router = express.Router();
var nodemailer = require('nodemailer');


// Details Regarding Sender 
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'inamdaraditya98@gmail.com',
    pass: 'lravugtrvhssvznb'
  }
});

async function generateOtp(username) {
  const algorithm = "aes-256-cbc";

  // generate 16 bytes of random data
  const initVector = crypto.randomBytes(16);


  const otp = Math.random().toString(36).slice(2, 7);
  console.log("the otp is -> "+ otp)
  
  // Generate Security Key using otp and randomBits 
  const randomBits="678d1t3456g891h23456789123s"
  const Securitykey = Buffer.from(otp+randomBits,"utf-8");
  // the cipher function
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

  
  // encrypt the username 
  let encryptedData = cipher.update(username, "utf-8", "hex");

  encryptedData += cipher.final("hex");


  // Email otp to the user using their respective email 
  var mailOptions = {
      from: 'anujsingh2409@gmail.com',
      to: username,
      subject: 'OTP for Texephyr Login',
      text: "Code ->" + otp
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 

    const data = {
        key:randomBits,
        encryption:encryptedData,
    }
    console.log(data);
  return data
}


router.post("/generateOtp",async (req,res)=>{
    const user=req.body.username;
    res.send(await generateOtp(user));
})

module.exports = router;
