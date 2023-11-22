const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
const Content = require("../models/Content");
const Registration = require("../models/Registration");
const User = require("../models/User");
const Payment = require("../models/Payment");
const Event = require("../models/Event");
const Round = require("../models/Round");
const MCQ_Questions = require("../models/MCQ_Questions");
const CodingSchema = require("../models/CodingSchema");
const FSchema = require("../models/FFF_questions");
const PS_Questions = require("../models/PC_questions");
const PSschema = require("../models/PsuedoCode");
const { Puzzle } = require("../models/Puzzle");
const PuzzleSchema = require("../models/Puzzle");
const ScoreSchema = require("../models/Scoreboard");
const ShortlistedSchema = require("../models/Shortlisted");
const Temp = require("../models/Temp");
const nodemailer = require("nodemailer");
const { authenticateToken } = require("../middleware/jwt-auth");
dotenv.config({ path: __dirname + "../config.env" });
var bcrypt = require("bcryptjs");
const Insta = require("instamojo-nodejs");
const url = require("url");
const Game = require("../models/Game");

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

router.post("/getContent", async (req, res) => {
  const { page } = req.body;
  const content = await Content.find();
  if (page === "home") {
    res.status(200).json({ content: content[0].home });
  } else if (page === "about") {
    res.status(200).json({ content: content[0].about });
  } else if (page === "contact") {
    res.status(200).json({ content: content[0].contact });
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

router.get(
  // User Details for Profile Page
  "/getUser",
  authenticateToken,
  async (req, res) => {
    const currentUser = await User.findById(req.user.id);
    if (currentUser) res.status(200).json({ currentUser });
    else res.status(400).json({ error: "User Not Found!" });
  }
);

router.post(
  // User Details for Profile Page
  "/getUserByEmail",
  async (req, res) => {
    const currentUser = await User.findOne({ email: req.body.email });
    if (currentUser) res.status(200).json({ user: currentUser });
    else res.status(400).json("User Not Found!");
  }
);

router.post("/checkID", async (req, res) => {
  const userid = req.body.userid;
  const eventid = req.body.eventid;
  if (!userid) {
    return res.status(204).json({ text: "TEXID is empty" });
  } else if (!(await User.exists({ _id: userid }))) {
    return res.status(401).json({ message: "TEXID is wrong" });
  } else if (await Registration.exists({ userid: userid, eventid: eventid })) {
    return res
      .status(400)
      .json({ message: "You have already registered for this Event" });
  } else {
    return res.sendStatus(200);
  }
});

router.post("/getEvents", async (req, res) => {
  const event = await Event.find({ dept: req.body.dept });
  if (event) {
    res.status(200).json({ events: event });
  } else {
    res.status(400).json({ error: "Events Not Found" });
  }
});

router.post("/getEventById", async (req, res) => {
  const event = await Event.find({ _id: req.body.id });
  if (event) {
    res.status(200).json({ event: event });
  } else {
    res.status(400).json({ error: "Events Not Found" });
  }
});

async function removeDuplicates(arr) {
  const ids = arr.map((o) => o._id);
  const filtered = arr.filter(
    ({ _id }, index) => !ids.includes(_id, index + 1)
  );
  return filtered;
}

router.post("/getAllRegisteredEvents", async (req, res) => {
  const registrations = await Registration.find({ userid: req.body.id }).select(
    "eventid -_id"
  );
  let events = [];
  for (let i = 0; i < registrations.length; i++) {
    await Event.find({ _id: registrations[i].eventid }).then((event) => {
      events.push(event[0]);
    });
  }
  if (events) {
    removeDuplicates(events)
      .then((newEvents) => {
        res.status(200).json({ events: newEvents });
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  } else res.status(400).json({ message: "Internal Server Error" });
});

router.post("/contactUs", async (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.thoughts;
  const mail = {
    from: name,
    to: "texephyr23.communications@gmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ message: "Message Sent" });
    }
  });

  const mailTo = {
    from: "texephyr23.communications@gmail.com",
    to: email,
    subject: "Thanks for Contacting",
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
                                        <td align="left"
                                            style="font-family: 'Chakra Petch', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 30px;">
                                            <p style="font-size: 18px; font-weight: 800; line-height: 24px; color: #000000;">
                                                Hey! ${name},
                                            </p>
                                            <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #000000;">
                                                Thanks for contacting us. We will get back to you soon.</br>
                                                Hope to see you at the fest!</br>
                                                </br>
                                                Regards,</br>
                                                Team Texephyr
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
  contactEmail.sendMail(mailTo, (error) => {
    if (error) {
      throw new Error("Error In Mail");
    }
  });
});

router.post("/rounds", async (req, res) => {
  const userid = req.body.userid;
  const user = await User.findById(userid);
  const registrations = await Registration.find({ userid: userid }); // all events the user has registered for
console.log(registrations);
  const eventIds = [];
  for (let i = 0; i < registrations.length; i++) {
    const element = registrations[i];
    console.log(element);
    eventIds.push(element.eventid.toString());
  }
  console.log(eventIds)
  const activeRounds = [];
  const round_name_f = [];
  for (let j = 0; j < eventIds.length; j++) {
    const element = eventIds[j];
    console.log(element)
    const round_name = await Round.find(
      { eventId: element, status: true },
      { name: 1, level: 1, _id: 0 }
    );
    if (round_name.length != 0) {
      round_name_f.push(round_name);
    }
    console.log(round_name_f[0])
  }
  console.log(round_name_f[0])
  for (var i = 0; i < round_name_f.length; i++) {
    for (let m = 0; m < round_name_f[i].length; m++) {
       console.log("index(i)", i);
       console.log("index(j)", m);
       console.log(round_name_f[i][m]);
      const model_name = round_name_f[i][m]["name"] + "_QUALIFIED";
       console.log(model_name);
      const model = mongoose.model(model_name, ShortlistedSchema);
      const check = await model.find({ user_id: userid, completed: false });
      if (check.length > 0) {
        const round = await Round.find(
          { name: round_name_f[i][m]["name"] },
          { status: 0 }
        );
        activeRounds.push(round);
      }
    }
  }

  res.json(activeRounds);
});

router.post("/pay", (req, res) => {
  Insta.setKeys(process.env.API_KEY, process.env.AUTH_KEY);
  const data = new Insta.PaymentData();
  Insta.isSandboxMode(false);
  console.log(req.body.amount);
  data.purpose = req.body.purpose;
  data.amount = req.body.amount;
  data.buyer_name = req.body.buyer_name;
  data.redirect_url = req.body.redirect_url;
  data.email = req.body.email;
  data.phone = req.body.phone;
  data.send_email = false;
  data.webhook = "http://www.example.com/webhook/";
  data.send_sms = false;
  data.allow_repeated_payments = false;

  Insta.createPayment(data, function (error, response) {
    if (error) {
      // some error
      res.status(400).json({ message: error });
    } else {
      // Payment redirection link at response.payment_request.longurl
      const responseData = JSON.parse(response);
      console.log(responseData);
      const redirectUrl = responseData.payment_request.longurl;
      res.status(200).json(redirectUrl);
    }
  });
});

router.get("/callback/", (req, res) => {
  let url_parts = url.parse(req.url, true),
    responseData = url_parts.query,
    details = JSON.parse(responseData.details);
  refid = responseData.ref;
  let events = [];
  details.forEach((element) => {
    events.push(element.event);
  });
  // console.log(details);
  // console.log(responseData);

  if (responseData.payment_id) {
    Payment.create({
      userid: responseData.user_id,
      amount: responseData.amount,
      events: events,
      paymentID: responseData.payment_id,
      paymentRequestID: responseData.payment_request_id,
    }).then(async () => {
      try {
        let events = "<br>";
        details.forEach((element) => {
          Registration.create({
            eventid: element.event,
            userid: element.users,
            reg_type: "online",
            reference_id: refid,
          });
          Event.findOne({ _id: element.event }).then((event) => {
            events =
              events + event.name + " (Rs. " + event.fees + ")" + " <br> ";
          });
        });

        setTimeout(async () => {
          let instaFees = Number(responseData.amount * 0.02) + 3;
          let tax = Math.ceil(instaFees * 0.18);
          let totalAmount =
            Number(responseData.amount) + Number(instaFees) + Number(tax);

          const currentUser = await User.findOne({ _id: responseData.user_id });

          toEmail = currentUser.email;

          const mail = {
            from: "texephyr23.communications@gmail.com",
            to: toEmail,
            subject: "Registration Confirmation",
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
                                                          Thank You For Registering! </h2>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td align="center"
                                                      style="font-family: 'Chakra Petch', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                                      <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #000000;">
                                                          Your Transaction id is ${responseData.payment_id}
                                                      </p>
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
                                                                  Rs. ${totalAmount} </td>
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
          return res.redirect("https://texephyr.in/payment-complete");
        }, 3000);
      } catch (error) {
        res.status(400).json({ error: error });
        console.log(error);
      }
    });
  }
});

router.post("/rules", async (req, res) => {
  const roundId = req.body.roundId;
  try {
    const round = await Round.findById(roundId);
    res.json({ rules: round.rules, type: round.type });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

router.post("/getMcqQuestions", async (req, res) => {
  const roundName = req.body.name;
  const roundId = req.body.roundId;
  const userid = req.body.userid;
  console.log(userid);
  console.log(roundId)

  try {
    const Qualified = mongoose.model(`${roundName}_qualifieds`, ShortlistedSchema);
    const qualified = await Qualified.findOne({ user_id: userid, completed: false });
      console.log("qualified"+qualified);
    if (qualified === null) {
      throw new Error("Round completed / User not registered")
    }
      const roundTime = await Round.find({ _id: roundId, status: true}, { time: 1, endTime: 1 }).lean();
      console.log(roundTime);
      if (roundTime.length===0){
        throw new Error("Round not active");
      } 
        const Questions = mongoose.model(`${roundName}`, MCQ_Questions);
        const questions = await Questions.aggregate([{ $sample: { size: 30 } }]);
        const data = { questionArray: questions, time: roundTime[0].time, endTime: roundTime[0].endTime };
        Qualified.updateMany({ user_id: userid }, { completed: true }).then(() => console.log("Marked as completed"))
        res.status(200).json(data);
      
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err});
  }
});

router.post("/codingQuestions", async (req, res) => {
  const roundName = req.body.name;
  const roundId = req.body.roundId;
  const userid = req.body.userid;
  try {
    const Qualified = mongoose.model(`${roundName}_qualifieds`, ShortlistedSchema);
    const qualified = await Qualified.findOne({ user_id: userid, completed: false });
      console.log("qualified"+qualified);
    if (qualified === null) {
      throw new Error("Round completed / User not registered")
    }
      const roundTime = await Round.find({ _id: roundId, status: true}, { time: 1, endTime: 1 }).lean();
      console.log(roundTime);
      if (roundTime.length===0){
        throw new Error("Round not active");
      } 
    const Questions = mongoose.model(`${roundName}`, CodingSchema);
    const questions = await Questions.aggregate([{ $sample: { size: 7 } }]);
    const data = {
      questionArray: questions,
      endTime: roundTime[0].endTime,
      roundId: roundId,
    };

    Qualified.updateMany({ user_id: userid }, { completed: true }).then(() => console.log("Marked as completed"))
    res.status(200).json(data);
  
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

router.post("/getFffQuestions", async (req, res) => {
  const roundName = req.body.name;
  const roundId = req.body.roundId;
  const userid = req.body.userid;
  try {
    const Qualified = mongoose.model(`${roundName}_qualifieds`, ShortlistedSchema);
    const qualified = await Qualified.findOne({ user_id: userid, completed: false });
      console.log("qualified"+qualified);
    if (qualified === null) {
      throw new Error("Round completed / User not registered")
    }
      const roundTime = await Round.find({ _id: roundId, status: true}, { time: 1, endTime: 1 }).lean();
      console.log(roundTime);
      if (roundTime.length===0){
        throw new Error("Round not active");
      } 
    const Questions = mongoose.model(`${roundName}`, FSchema);
    const questions = await Questions.aggregate([{ $sample: { size: 30 } }]);
    const data = { questionArray: questions, time: roundTime[0].time };
    Qualified.updateMany({ user_id: userid }, { completed: true }).then(() => console.log("Marked as completed"))
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

router.post("/getPuzzleQuestions", async (req, res) => {
  const roundName = req.body.name;
  const roundId = req.body.roundId;
  const userid = req.body.userid;
  try {
    const Qualified = mongoose.model(`${roundName}_qualifieds`, ShortlistedSchema);
    const qualified = await Qualified.findOne({ user_id: userid, completed: false });
      console.log("qualified"+qualified);
    if (qualified === null) {
      throw new Error("Round completed / User not registered")
    }
      const roundTime = await Round.find({ _id: roundId, status: true}, { time: 1, endTime: 1 }).lean();
      console.log(roundTime);
      if (roundTime.length===0){
        throw new Error("Round not active");
      } 
    console.log("Round Information -> ", roundTime);
    const PQuestions = mongoose.model(`${roundName}`, PuzzleSchema);
    const questions = await PQuestions.aggregate([{ $sample: { size: 7 } }]);
    const data = { questionArray: questions, endTime: roundTime[0].endTime };
    console.log(data);
  
    Qualified.updateMany({ user_id: userid }, { completed: true }).then(() => console.log("Marked as completed"))
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

router.post("/getPSQuestions", async (req, res) => {
  const roundName = req.body.name;
  const roundId = req.body.roundId;
  const userid = req.body.userid;
  try {
    const Qualified = mongoose.model(`${roundName}_qualifieds`, ShortlistedSchema);
    const qualified = await Qualified.findOne({ user_id: userid, completed: false });
      console.log("qualified"+qualified);
    if (qualified === null) {
      throw new Error("Round completed / User not registered")
    }
      const roundTime = await Round.find({ _id: roundId, status: true}, { time: 1, endTime: 1 }).lean();
      console.log(roundTime);
      if (roundTime.length===0){
        throw new Error("Round not active");
      } 
    const Questions = mongoose.model(`${roundName}`, PS_Questions);
    const questions = await Questions.aggregate([{ $sample: { size: 7 } }]);
    const data = { questionArray: questions, endTime: roundTime[0].endTime };
    Qualified.updateMany({ user_id: userid }, { completed: true }).then(() => console.log("Marked as completed"))
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

router.get("/fetchScoreboard/:roundid", async (req, res) => {
  try {
    var doc = mongoose.model("foo", ScoreSchema, req.params.roundid);
    let scoreboard = await doc
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            user_id: 1,
            name: "$user.name",
            marks: 1,
            _id: 0,
            time: 1,
          },
        },
      ])
      .sort({ marks: -1, time: 1 })
      .exec();
    //  let scoreboard = await doc.find().sort({marks:-1}).exec();
    //console.log(scoreboard);
    if (scoreboard) {
      res.status(200).json({ scoreboard });
    } else {
      res.status(400).json({ error: "Could not Retrieve Scoreboard" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

router.get("/fetchRounds", async (req, res) => {
  try {
    let rounds = await Round.find();
    if (rounds) {
      res.status(200).json({ rounds });
    } else {
      res.status(400).json({ error: "Could not Retrieve Rounds List" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

router.post("/sendScore", async (req, res) => {
  const score = req.body.score;
  const time = req.body.time;
  const userid = req.body.userid;
  const roundName = req.body.round;
  try {
    const scoreboard = mongoose.model(`${roundName}_scoreboards`, ScoreSchema);
    scoreboard
      .insertMany({ user_id: userid, marks: score, time: time })
      .then(() => console.log("inserted Successfully"))
      .catch((err) => console.log(err));

    const qualified = mongoose.model(
      `${roundName}_qualifieds`,
      ShortlistedSchema
    );
    qualified
      .updateMany({ user_id: userid }, { completed: true })
      .then(() => console.log("Marked as completed"))
      .catch((err) => console.log(err));

    res.status(200).json("data");
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

router.post("/sendPS", async (req, res) => {
  const responses = req.body.responses;
  const userid = req.body.userid;
  const roundName = req.body.round;

  //const time = req.body.time
  try {
    const scoreboard = mongoose.model(`${roundName}_responses`, PSschema);
    scoreboard
      .insertMany({ userId: userid, responses: responses })
      .then(() => console.log("inserted Successfully"))
      .catch((err) => console.log(err));

    // const qualified = mongoose.model(`${roundName}_qualifieds`, ShortlistedSchema);
    // qualified.updateMany({ user_id: userid }, { completed: true }).then(() => console.log("Marked as completed"));

    res.status(200).json("success");
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

router.post("/testRegister", async (req, res) => {});

router.get("/getUserId", authenticateToken, async (req, res) => {
  if (req.user.user.id) res.status(200).json({ id: req.user.user.id });
  else res.status(400).json({ error: "User Not Found!" });
});

router.get("/getWebUserId", authenticateToken, async (req, res) => {
  if (req.user.id) res.status(200).json({ id: req.user.id });
  else res.status(400).json({ error: "User Not Found!" });
});

router.get("/getUserForPortal", authenticateToken, async (req, res) => {
  const currentUser = await User.findById(req.user.user.id);
  if (currentUser) res.status(200).json({ currentUser });
  else res.status(400).json({ error: "User Not Found!" });
});

router.post("/getRegStats", async (req, res) => {
  const result = [];
  const event = req.body.eventName;
  const foundEvent = await Event.findOne({ name: event }, { _id: 1 });
  console.log(foundEvent._id);
  const userList = await Registration.find(
    { eventid: foundEvent._id },
    { userid: 1, _id: 0 }
  );
  console.log(userList);
  for (let i = 0; i < userList.length; i++) {
    const grpMem = [];
    for (let j = 0; j < userList[i].userid.length; j++) {
      await User.findOne({ _id: userList[i].userid[j] }).then(
        async (foundUser) => {
          grpMem.push({
            id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            college: foundUser.college,
            phone: foundUser.phone,
            proof: foundUser.proof,
          });
        }
      );
    }
    result.push(grpMem);
  }
  res.status(200).json(result);
});

router.get("/getAllEventNames", async (req, res) => {
  const result = [];
  const eventList = await Event.find({}, { name: 1, _id: 0 });
  for (let i = 0; i < eventList.length; i++) {
    await result.push(eventList[i].name);
  }
  res.status(200).json(result);
});

router.post("/sendGameScore", async (req, res) => {
  const time = req.body.time;
  const userid = req.body.userid;
  const gameName = req.body.gameName;
  const type = req.body.type;
  console.log(gameName);

  if (gameName === "TexRace" || gameName === "24Hit") {
    try {
      console.log("in sever");
      const scoreboard = mongoose.model(`${gameName}`, Game);
      const existingScore = await scoreboard.findOne({ user_id: userid });

      if (existingScore) {
        if (time < existingScore.time) {
          existingScore.time = time;
          await existingScore.save();
          res.status(200).json("Score updated successfully");
        } else {
          res.status(200).json("New time is greater than existing time");
        }
      } else {
        await scoreboard.create({ user_id: userid, time: time });
        console.log("Score recorded successfully");
        res.status(200).json("Score recorded successfully");
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ err: err });
    }
  } else if (gameName === "Route51") {
    try {
      const scoreboard = mongoose.model(`${gameName}`, Game);
      const existingScore = await scoreboard.findOne({
        user_id: userid,
        type: type,
      });

      if (existingScore) {
        if (time < existingScore.time) {
          existingScore.time = time;
          await existingScore.save();
          res.status(200).json("Score updated successfully");
        } else {
          res.status(200).json("New time is greater than existing time");
        }
      } else {
        await scoreboard.create({ user_id: userid, time: time, type: type });
        console.log("Score recorded successfully");
        res.status(200).json("Score recorded successfully");
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ err: err });
    }
  }
});

router.get("/fetchLeaderboard/:gameName", async (req, res) => {
  try {
    var doc = mongoose.model("foo", Game, req.params.gameName + "s");
    let scoreboard = await doc
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            user_id: 1,
            name: "$user.name",
            _id: 0,
            time: 1,
          },
        },
      ])
      .sort({ time: 1 })
      .exec();
    if (scoreboard) {
      res.status(200).json({ scoreboard });
    } else {
      res.status(400).json({ error: "Could not Retrieve Scoreboard" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

router.get("/fetchRouteLeaderboard/:type", async (req, res) => {
  const type = req.params.type;

  try {
    var doc = mongoose.model("route51", Game, req.params.gameName);
    console.log(doc);
    let scoreboard = await doc
      .aggregate([
        { $match: { type: type } },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            user_id: 1,
            name: "$user.name",
            _id: 0,
            time: 1,
            type: 1,
          },
        },
      ])
      .sort({ time: 1 })
      .exec();
    if (scoreboard) {
      res.status(200).json({ scoreboard });
    } else {
      res.status(400).json({ error: "Could not Retrieve Scoreboard" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

router.post("/getTeamMembers", async (req, res) => {
  const leaderid = req.body.id;
  const eventid = req.body.eventid;
  let foundEntry = await Registration.find({userid: leaderid, eventid: eventid}, {userid: 1, _id: 0})
  console.log(foundEntry[0].userid)
  if(foundEntry[0].userid[0] === leaderid) {
    res.status(200).json({userid: foundEntry[0].userid})
  }
  else
  {
    res.status(401).json({message: "Only Team Leader can Update Members"})
  }
});

router.post("/updateTeamMembers", async (req, res) => {
  const userid = req.body.userid;
  const eventid = req.body.eventid;
  let foundEntry = await Registration.findOneAndUpdate({userid: userid[0], eventid: eventid}, {userid})
  if(foundEntry) {
    res.status(200).json({message: "Team Members Updated Successfully"})
  }
  else
  {
    res.status(400).json({message: "Could Not Update Team Members"})
  }
});

router.post("/forgotPass", async (req, res) => {
  const email = req.body.email;
  let foundEntry = await User.findOne({ email: new RegExp(`^${email}$`, "i") });
  if (foundEntry) {
    let salt = await bcrypt.genSalt(10);
    let SecPass = await bcrypt.hash(foundEntry._id, salt);
    const mail = {
      from: "texephyr23.communications@gmail.com",
      to: email,
      subject: "Reset Your Password",
      html: `<!DOCTYPE html>
      <html lang="en">
      <body>
      Your Password Will Be Changed to ${foundEntry._id}
          <form method="get" action="https://texephyr.live/api/webuser/resetForgotPass">
              <input style="display: none;" type="text" name="email" id="email" value=${email} />
              <input style="display: none;" type="text" name="password" id="password" value=${SecPass} />
              <button type="submit">Reset Password to Default</button>
          </form>
      </body>
      </html>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        throw new Error("Error In Mail");
      }
    });
    res.status(200).json({ message: "A Mail was sent to your email address" });
  } else {
    res.status(400).json({ message: "Email is not Registered" });
  }
});

router.get("/resetForgotPass", async (req, res) => {
  const email = req.query.email;
  const pass = req.query.password;
  console.log(email, pass);
  let foundEntry = await User.findOneAndUpdate(
    { email: new RegExp(`^${email}$`, "i") },
    { password: pass }
  );
  res.status(200).redirect("https://texephyr.in/login");
});

module.exports = router;
