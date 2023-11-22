const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const Member = require("../models/Member");
const Event = require("../models/Event");
const { generateMemberAccessToken } = require("../utils/jwt-utils");
const Registration = require("../models/Registration");
const testRegister = require("../models/testRegistration");
dotenv.config({ path: __dirname + "../config.env" });
const User = require("../models/User");
const nodemailer = require("nodemailer")

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

router.post('/fetchMember', async (req, res) => 
{
  const member = await Member.findById(req.body.id);
  if (member)
    res.status(200).json(member)
  else
    res.status(400).json({error: "User Not Found"})
}
)

router.post('/fetchAllMember', async (req, res) => {
  const member = await Member.find();
  
  if (member){
    res.status(200).json({member})
  }
    
  else
    res.status(400).json({error: "No Records Found"})
}
)

router.post(
  "/fetchMemberDept",
  async(req, res) =>{
    const member = await Member.find({'dept' : req.body.dept});
    if(member){
      res.status(200).json({member})
    }else{
      res.status(400).json({error:'some error occured'})
    }
    
  }
);

// 
router.post(
  "/getEvent",
  async(req, res) =>{
    const event = await Event.find({'dept' : req.body.dept});
    if(event){
      res.status(200).json({event})
    }else{
      res.status(400).json({error:'some error occured'})
    }
  }
);

router.post(
  "/getEventSales",
  async(req, res) =>{
    const result=[];
    const event = await Event.find({'dept' : req.body.dept});
    if(event){
      for(var i=0;i<event.length;i++){
        const element=event[i];
        var temp={id:element["_id"],eventName:element["name"],offline:0,online:0,total:0,target:element["target"],fees:element["fees"]}
        const registration=await Registration.find({"eventid":element["_id"]});
        for(var j=0;j<registration.length;j++){
          if(registration[j].reg_type=="offline")temp.offline+=element["fees"];
          if(registration[j].reg_type=="online")temp.online+=element["fees"];
          temp.total+=element["fees"];
        }

        result.push(temp);
      }
      res.status(200).json({result});
    }else{
      res.status(400).json({error:'some error occured'})
    }
  }
);

router.post(
  "/testGetEventSales",
  async(req, res) =>{
    const result=[];
    const event = await Event.find({'dept' : req.body.dept});
    if(event){
      for(var i=0;i<event.length;i++){
        var element=event[i];
        console.log("Event->",element["_id"])
        var temp={id:element["_id"],eventName:element["name"],offline:0,online:0,total:0,target:element["target"],fees:element["fees"]}
        const reg = await testRegister.find({events:{$elemMatch:{"event":element["_id"]}}})
        for(var j=0;j<reg.length;j++){
          console.log(reg[j]);
          if(reg[j].reg_type=="offline") temp.offline+=element["fees"];
          else temp.online+=element["fees"]*reg.length;
          temp.total+=element["fees"];
        }
        result.push(temp);
      }
      res.status(200).json({result});
    }else{
      res.status(400).json({error:'some error occured'})
    }
  }
);


router.get(
  "/getEventBoxes",
  async(req, res) =>{
    const event = await Event.find();
    if(event){
      res.status(200).json({event})
    }else{
      res.status(400).json({error:'some error occured'})
    }
    
  }
);

router.post(
  "/resetPassword",
  async(req, res) =>{
    const oldPassword = req.body.password
    const newPassword = req.body.newPassword
    const id = req.body.id
    const member = await Member.findById(id);
    if(member.password == oldPassword){
      if(member.password != newPassword){
        await Member.findOneAndUpdate({ password: oldPassword }, { password: newPassword })
        res.status(200).json("Success")
      //res.status(200).json({oldPassword})
      }
      else{
        res.status(400).json({error:'Password Should be Unique'})
      }
      
    }else{
      res.status(400).json({error:'Member not found'})
    }
    
  }
);


router.post('/memberStatus', async (req, res) => {
  const username = req.body.id
  const password = req.body.password
  const member = await Member.findById(req.body.id);
  const result = [];
  if (member) {
    if (member.password === password) {
      const token = await generateMemberAccessToken({ id: username })
      await Member.findOneAndUpdate({ _id: username }, { status: 1 })
      const data = {
        token: token,
        status: member.status
      };

      // console.log("RESPONSE DATA: ",{data})
      result.push(data);

      res.status(200).json({result})
    }
    else {
      res.status(400).json({error: "Credentials Don't Match"})
    }
  }
  else
    res.status(400).json({error: "User Not Found"})
}
);


router.post('/memberLogin', async (req, res) => {
  const username = req.body.id
  const password = req.body.password
  const member = await Member.findById(req.body.id);
  const result = [];
  if (member) {
    if (member.password === password) {
      const token = await generateMemberAccessToken({ id: username })

      const data = {
        token: token,
        status: member.status
      };

      console.log("RESPONSE DATA: ",{data})
      result.push(data);

      res.status(200).json({result})
    }
    else {
      res.status(400).json({error: "Credentials Don't Match"})
    }
  }
  else
    res.status(400).json({error: "User Not Found"})
}
)

router.post('/clearBalance', async (req, res) => {
  const member = await Member.findById(req.body.memId);
  if (member)
    if (member.role === "All") {
      const update = await Member.findById(req.body.id)
      await Member.findOneAndUpdate({ _id: update.id }, { money_holding: 0, total_money: update.total_money + update.money_holding })
      res.status(200).json("Updated Successfully")
    }
    else
      res.status(401).json("Not Authorized!")
  else
    res.status(400).json("User Not Found!")
}
)

router.get('/memberWithHolding', async (req, res) => {
  const members = await Member.find();
  const result = []
  // const counter = 0
  members.map((element) => {
    if (element.money_holding > 0) {
      const data = {
        texid: element._id,
        name: element.name,
        money_holding: element.money_holding,
        total: element.total_money
      }
      result.push(data)
    }
    // counter++;
    // if(counter === members.length)
  })
  res.status(200).json({result})
}
)

router.post('/memberWithHolding', async (req, res) => {
  const members = await Member.find();
  const result = []
  members.map((element) => {
    if (element.money_holding > 0) {
      const data = {
        texid: element._id,
        name: element.name,
        money_holding: element.money_holding,
        total: element.total_money
      }
      result.push(data)
    }
  })
  res.status(200).json({result})
}
)

router.post('/updateMemberBalance', async (req, res) => {
  const member = await Member.findById(req.body.id);
  if(member)
  {
    await Member.findOneAndUpdate({ _id: req.body.id }, { money_holding: member.money_holding - req.body.amount, total_money: member.total_money + req.body.amount }).then(() => {
      res.status(200).json({message: "Success"})
    }).catch((error) => {
      res.status(400).json({error: error})
    })
  }
  else
  {
    res.status(400).json({error: "TEXID Invalid"})
  }
}
)

router.post(
  "/register",
  async (req, res) => {
    try
    {
      const details = req.body.details;
      console.log(details)
      eventsArray = details.events;
      userIdArray = details.userid;
      const member = await Member.findById(details.memberid);
      if(member)
      {
        await Member.findOneAndUpdate({ _id: details.memberid }, { money_holding: member.money_holding + details.amt_holding})
      }
      console.log(userIdArray)
      let count = 0; 
      eventsArray.forEach((element) => 
      {
          Registration.create({
            eventid: element,
            userid: userIdArray,
            reg_type: 'offline',
            reference_id: details.memberid
          }).then(() => count = count + 1).catch((err) => {
            console.log(err)
            throw new Error("Registration Failed!")
          })
        }
        )
      res.status(200).json({message: "Registration Successful"})
    }
    catch(error)
    {
      res.status(400).json({error : error})
      console.log(error)
    }
  });

router.post(
  "/testRegister",
  async (req, res) => {
    try
    {
      const details = req.body.details;
      console.log(details)
      const member = await Member.findById(details.reference_id);
      if(member)
      {
        await Member.findOneAndUpdate({ _id: details.reference_id }, { money_holding: member.money_holding + details.totalAmt})
      }

      testRegister.create({
        events: details.events,
        userId: details.userId,
        reg_type: 'offline',
        reference_id: details.reference_id,
        totalAmt: details.totalAmt,
        regDate:new Date().toISOString()
      })

      const EventDetail = details.events;
      let events = "<br>";
      EventDetail.forEach((element) => {
        Registration.create({
          eventid: element.event,
          userid: element.groupMembers,
          reg_type: "offline",
        }).catch((err) => {
          console.log(err);
          throw new Error(err);
          });
        });

        Event.findOne({ _id: element.event }).then((event) => {
          events =
            events + event.name + " (Rs. " + event.fees + ")" + " <br> ";
        });

        const USER_TEXID = details.texId;

        setTimeout(async () => {

          const currentUser = await User.findOne({ _id: USER_TEXID });
        toEmail = currentUser.email
        console.log("USER EMAIL:-",{toEmail});
        const mail = {
          from: "texephyr23.communications@gmail.com",
          to: toEmail,
          subject: "Registration Confirmation",
          attachments: [
            {
              filename: "texLogo.png",
              path: "backend/public/texLogo.png",
              cid: "texephyruniquelogo@nodemailer.com", //same cid value as in the html img src
            },
          ],
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
                                                        <img style = "height: 3rem;" src="cid:texephyruniquelogo@nodemailer.com"/>
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
                                                        Thank You For Registering! </h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left" style="padding-top: 20px;">
                                                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="75%" align="left" bgcolor="#eeeeee"
                                                                style="font-family: 'Chakra Petch', sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                                Events</td>
                                                        </tr>
                                                        <tr>
                                                            <td width="75%" align="left"
                                                                style="font-family: 'Chakra Petch', sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px; padding-bottom:5px;">
                                                                Purchased Events - </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="75%" align="left"
                                                                style="font-family: 'Chakra Petch', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 10px; padding-top:5px;">
                                                                ${events} </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left" style="padding-top: 20px;">
                                                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="75%" align="left"
                                                                style="font-family: 'Chakra Petch', sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                                TOTAL (+ Convenience Fees) </td>
                                                            <td width="25%" align="left"
                                                                style="font-family: 'Chakra Petch', sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                                Rs. ${details.totalAmt} </td>
                                                        </tr>
                                                    </table>
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
                                                <td align="left"
                                                    style="font-family: 'Chakra Petch', sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                                    <p
                                                        style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                                        To Know More Details Visit Your Profile On <a href="https://texephyr.in" target="_blank"
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
        await contactEmail.sendMail(mail, (error) => {
          if (error) {
            throw new Error("Error In Mail");
          }
        });

        }, 3000)

      res.status(200).json({message: "Registration Successful"})
    }
    catch(error)
    {
      res.status(400).json({error : error})
      console.log(error)
    }
  });

  router.post(
  // User Details for Profile Page
  "/getUserByEmail",
  async (req, res) => {
    const currentUser = await User.findOne({ email: req.body.email });
    if (currentUser) res.status(200).json({ user: currentUser });
    else res.status(400).json("User Not Found!");
  }
);

router.post(
  // User Name
  "/getUserName",
  async (req, res) => {
    const currentUser = await User.findOne({ _id: req.body.id });
    if (currentUser) res.status(200).json({ user: currentUser });
    else res.status(400).json("User Not Found!");
  }
);

// do {
//     TexId =
//       "MEM" + [...Array(2)].map((_) => (Math.random() * 10) | 0).join``;
//   } while ((valid = await Member.exists({ _id: TexId })));

module.exports = router;