const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { check, body, oneOf, validationResult } = require("express-validator");
const validator = require("validator");
var bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const WebAdmin = require("../models/WebAdmin");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generatePortalAdminAccessToken, generateAdminAccessToken } = require("../utils/jwt-utils");
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const Round = require("../models/Round");
const PortalAdmin = require("../models/PortalAdmin");
const nodemailer = require("nodemailer");
const { authenticateToken } = require("../middleware/jwt-auth");
dotenv.config({ path: __dirname + "../config.env" });

const mysecretkey = process.env.SECRETPASS;

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "texephyr23.communications@gmail.com",
    pass: "yvhkzgdouxfsgkbm",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

const generateTexId = async () => {
  do {
    TexId = "TEX" + [...Array(5)].map((_) => (Math.random() * 10) | 0).join``;
  } while (await User.exists({ _id: TexId }));
  return TexId
}

router.post(
  "/createUser",
  async (req, res) => {

    let exists = 0;
    if (await User.findOne({ email: req.body.email })) {
      exists = 1;
    } else if (await User.findOne({ phone: req.body.phone })) {
      exists = 1;
    }

    if (exists)
      return res.status(400).json({ error: "User Already Exists" });
    else {
        try {
        const salt = await bcrypt.genSalt(10);
        let SecPass = await bcrypt.hash(req.body.password, salt);

        let TexId = await generateTexId()

        let sampleFile = req.files.proof;
        let filename = TexId + "-" + new Date().toISOString().slice(0, 10) + ".jpg"
        let uploadPath = path.join(__dirname, '..', '/public/proofs/') + filename;

        const done = sampleFile.mv(uploadPath)

        if (done) {
          const user = await User.create({
            _id: TexId,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            college: req.body.college,
            password: SecPass,
            proof: filename
          });

          if (user) {
            const data =
            {
              id: user.id
            }
            
          const mail = {
            from: "texephyr23.communications@gmail.com",
            to: req.body.email,
            subject: "Registration Successful",
            html: `<!DOCTYPE html>
            <html>

            <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; chaRs. et=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <style type="text/css">
                    @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;600;700&display=swap');
                    body,
                    table,
                    td,
                    a {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }

                    table,
                    td {
                        mso-table-lspace: 0pt;
                        mso-table-Rs. pace: 0pt;
                    }

                    img {
                        -ms-interpolation-mode: bicubic;
                    }

                    img {
                        border: 0;
                        height: auto;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                    }

                    table {
                        border-collapse: collapse !important;
                    }

                    body {
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }

                    a[x-apple-data-detectoRs. ] {
                        color: inherit !important;
                        text-decoration:: none !important;
                        font-size:: inherit !important;
                        font-family:: inherit !important;
                        font-weight:: inherit !important;
                        line-height:: inherit !important;
                    }

                    @media screen and (max-width: 480px) {
                        .mobile-hide {
                            display: none !important;
                        }

                        .mobile-center {
                            text-align: center !important;
                        }
                    }

                    div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                    }
                </style>

            <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
                <div
                    style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Chakra Petch', sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
                    For what reason would it be advisable for me to think about business content? That might be little bit risky to
                    have crew member like them.
                </div>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                <tr>
                                    <td align="center" valign="top" style="font-size:0; padding: 15px;" bgcolor="#000000">

                                        <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                                            class="mobile-hide">
                                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                style="max-width:300px;">
                                                <tr>
                                                    <td align="center" valign="top"
                                                        style="font-family: Chakra Petch; font-size: 48px; font-weight: 400; line-height: 48px;">
                                                        <img style="height: 3rem;text-align:center;" src="https://safoam.org.in/temp/texLogo.png"/>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;"
                                        bgcolor="#ffffff">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="max-width:600px;">
                                            <tr>
                                                <td align="center"
                                                    style="font-family: 'Chakra Petch', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                                    <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png"
                                                        width="125" height="120" style="display: block; border: 0px;" /><br>
                                                    <h2
                                                        style="font-size: 36px; font-weight: 700; line-height: 36px; color: #333333; margin: 0;">
                                                        Greetings From Team texephyr </h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center"
                                                    style="font-family: 'Chakra Petch', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                                    <p style="font-size: 18px; font-weight: 800; line-height: 24px; color: #000000;">
                                                        Hey! ${req.body.name}, Thanks For Registering
                                                    </p>
                                                    <p style="font-size: 18px; font-weight: 800; line-height: 24px; color: #000000;">
                                                    </br>
                                                        Your Tex Id is <span style="color: #DE3163; font-size: 20px;">${TexId}</span> </br>
                                                        </br>
                                                        Congrats!!! You are now officialy a part of TEXEPHYR 2023.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="max-width:600px;">
                                            <tr>
                                                <td align="center"
                                                    style="font-family: 'Chakra Petch', sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                                    <p
                                                        style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                                        To Know More Details Visit <a href="https://texephyr.in" target="_blank"
                                                            style="color: #777777;">Texephyr Website</a>. </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>

            </html>`,
          };
          contactEmail.sendMail(mail, (error) => {
            if (error) {
              throw new Error("Error In Mail")
            }
          });
            const authToken = await generateAccessToken(data)
            return res.status(200).json({ authToken: authToken })
          }
        }
      }
      catch
      {
          return res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }
);

router.post(
  "/createUserByApp",
  async (req, res) => {
    console.log(req.body)
    let exists = 0;
    if (await User.findOne({ email: req.body.email })) {
      exists = 1;
      console.log(exists)
    } else if (await User.findOne({ phone: req.body.phone })) {
      exists = 1;
      console.log(exists)
    }

    if (exists)
      return res.status(400).json({ error: "User Already Exists" });
    else {
      const salt = await bcrypt.genSalt(10);
      let SecPass = await bcrypt.hash(req.body.password, salt);

      let TexId = await generateTexId()
      console.log(typeof(TexId))

        const user = await User.create({
          _id: TexId,
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          college: req.body.college,
          password: SecPass,
          proof: " "
        });

        if (user) {
          const data =
          {
            id: user.id
          }

          const mail = {
            from: "texephyr23.communications@gmail.com",
            to: req.body.email,
            subject: "Registration Successful",
            html: `<!DOCTYPE html>
            <html>

            <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; chaRs. et=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <style type="text/css">
                    @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;600;700&display=swap');
                    body,
                    table,
                    td,
                    a {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }

                    table,
                    td {
                        mso-table-lspace: 0pt;
                        mso-table-Rs. pace: 0pt;
                    }

                    img {
                        -ms-interpolation-mode: bicubic;
                    }

                    img {
                        border: 0;
                        height: auto;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                    }

                    table {
                        border-collapse: collapse !important;
                    }

                    body {
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }

                    a[x-apple-data-detectoRs. ] {
                        color: inherit !important;
                        text-decoration:: none !important;
                        font-size:: inherit !important;
                        font-family:: inherit !important;
                        font-weight:: inherit !important;
                        line-height:: inherit !important;
                    }

                    @media screen and (max-width: 480px) {
                        .mobile-hide {
                            display: none !important;
                        }

                        .mobile-center {
                            text-align: center !important;
                        }
                    }

                    div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                    }
                </style>

            <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
                <div
                    style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Chakra Petch', sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
                    For what reason would it be advisable for me to think about business content? That might be little bit risky to
                    have crew member like them.
                </div>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                <tr>
                                    <td align="center" valign="top" style="font-size:0; padding: 15px;" bgcolor="#000000">

                                        <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                                            class="mobile-hide">
                                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                style="max-width:300px;">
                                                <tr>
                                                    <td align="center" valign="top"
                                                        style="font-family: Chakra Petch; font-size: 48px; font-weight: 400; line-height: 48px;">
                                                        <img style="height: 3rem;text-align:center;" src="https://safoam.org.in/temp/texLogo.png"/>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;"
                                        bgcolor="#ffffff">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="max-width:600px;">
                                            <tr>
                                                <td align="center"
                                                    style="font-family: 'Chakra Petch', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                                    <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png"
                                                        width="125" height="120" style="display: block; border: 0px;" /><br>
                                                    <h2
                                                        style="font-size: 36px; font-weight: 700; line-height: 36px; color: #333333; margin: 0;">
                                                        Greetings From Team texephyr </h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center"
                                                    style="font-family: 'Chakra Petch', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                                    <p style="font-size: 18px; font-weight: 800; line-height: 24px; color: #000000;">
                                                        Hey! ${req.body.name}, Thanks For Registering
                                                    </p>
                                                    <p style="font-size: 18px; font-weight: 800; line-height: 24px; color: #000000;">
                                                    </br>
                                                        Your Tex Id is <span style="color: #DE3163; font-size: 20px;">${TexId}</span> </br>
                                                        </br>
                                                        Congrats!!! You are now officialy a part of TEXEPHYR 2023.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="max-width:600px;">
                                            <tr>
                                                <td align="center"
                                                    style="font-family: 'Chakra Petch', sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                                    <p
                                                        style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                                        To Know More Details Visit <a href="https://texephyr.in" target="_blank"
                                                            style="color: #777777;">Texephyr Website</a>. </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>

            </html>`,
          };
          contactEmail.sendMail(mail, (error) => {
            if (error) {
              throw new Error("Error In Mail")
            }
          });

          const authToken = await generateAccessToken(data)
          res.status(200).json({message: "User Created Successfully", texid: TexId})
        }
      }
    }

);

router.post(
  "/loginUser",
  [
    oneOf([check("username").isNumeric(), check("username").isEmail()]),
    body("password", "Password Must Not be Blank").exists(),
  ],
  async (req, res) => {
    const { username, password } = req.body;
    var user = {};

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (validator.isEmail(req.body.username)) {
        user = await User.findOne({ email: new RegExp(`^${username}$`, 'i') })
      } else {
        user = await User.findOne({ phone: username });
      }

      if (!user)
        return res.status(400).json({ error: "Credentials not Recognized" });

      let comparedPassword = await bcrypt.compare(password, user.password);

      if (!comparedPassword)
        return res.status(400).json({ error: "Credentials not Recognized" });

      const data =
      {
        id: user.id
      }
      const authToken = await generateAccessToken(data)
      res.status(200).json({ authToken: authToken })
    } catch (error) {
      res.status(400).json({ error: "Session Expired!" });
      console.log(error);
    }
  }
);

router.post(
  "/loginUserPortal",
  [
    oneOf([check("username").isNumeric(), check("username").isEmail()]),
    body("password", "Password Must Not be Blank").exists(),
  ],
  async (req, res) => {
    const { username, password } = req.body;
    var user = {};

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (validator.isEmail(req.body.username)) {
        user = await User.findOne({ email: new RegExp(`^${username}$`, 'i') })
      } else {
        user = await User.findOne({ phone: username });
      }

      if (!user)
        return res.status(400).json({ error: "Credentials not Recognized" });

      let comparedPassword = await bcrypt.compare(password, user.password);

      if (!comparedPassword)
        return res.status(400).json({ error: "Credentials not Recognized" });

      // if (user.portal_logged_in)
      //   return res.status(400).json({ error: "This Account is Already Logged in From a Device" });

      else {
        await User.findOneAndUpdate({ _id: user._id }, { portal_logged_in: 1 });
        const data =
        {
          user: {
            id: user.id
          }
        }
        const authToken = await generateAccessToken(data)
        res.status(200).json({ authToken: authToken })
      }
    } catch (error) {
      res.status(400).json(error);
      console.log(error);
    }
  }
);

router.get("/logoutPortalUser", authenticateToken,
  async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    var id=req.user.user.id;
    //console.log(id);
    var user = await User.findById(id);
    //console.log(user);
    user.portal_logged_in=0;
    await user.save();
    res.status(200).json({"Logged out":user.id});
    }
    catch(err){
      res.status(400).json(err);
      console.log(err);
    }
  }
  );

router.post(
  "/loginUserApp",
  [
    oneOf([check("username").isNumeric(), check("username").isEmail()]),
    body("password", "Password Must Not be Blank").exists(),
  ],
  async (req, res) => {
    const { username, password } = req.body;
    var user = {};

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (validator.isEmail(req.body.username)) {
        user = await User.findOne({ email: username });
      } else {
        user = await User.findOne({ phone: username });
      }

      if (!user)
        return res.status(400).json({ error: "Credentials not Recognized" });

      let comparedPassword = await bcrypt.compare(password, user.password);

      if (!comparedPassword)
        return res.status(400).json({ error: "Credentials not Recognized" });

      if (user.portal_logged_in)
        return res.status(400).json({ error: "This Account is Already Logged in From a Device" });

      await User.findOneAndUpdate({ _id: user._id }, { app_logged_in: 1 });

      const data =
      {
        user: {
          id: user.id
        }
      }

      const authToken = jwt.sign(data, mysecretkey)
      res.status(200).json({ authToken: authToken })

    } catch (error) {
      res.status(400).json(error);
      console.log(error);
    }
  }
);

router.post(
  "/loginAdmin",
  [
    body("username", "Username Must Not be Blank").exists(),
    body("password", "Password Must Not be Blank").exists(),
  ],
  async (req, res) => {
    const { username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const admin = await WebAdmin.findOne({ username: username });

      if (!admin)
        return res.status(400).json({ error: "Credentials not Recognized" });

      if (password != admin.password)
        return res.status(400).json({ error: "Credentials not Recognized" });

      const data = {
        user: {
          id: admin.id,
        }
      };

      const authToken = await generateAdminAccessToken(data);
      res.status(200).json({ authToken: authToken });
    } catch (error) {
      res.status(400).json(error);
      console.log(error);
    }
  }
);


router.post(
  "/loginPortalAdmin",
  [
    body("username", "Username Must Not be Blank").exists(),
    body("password", "Password Must Not be Blank").exists(),
  ],
  async (req, res) => {
    const { username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const admin = await PortalAdmin.findOne({ username: username });

      if (!admin)
        return res.status(400).json({ error: "Credentials not Recognized" });

      if (password != admin.password)
        return res.status(400).json({ error: "Credentials not Recognized" });

      const data = {
        user: {
          id: admin.id,
        }
      };

      const authToken = await generatePortalAdminAccessToken(data);
      res.status(200).json({ authToken: authToken });
    } catch (error) {
      res.status(400).json(error);
      console.log(error);
    }
  }
);

module.exports = router;
