const express = require("express");
const router = express.Router();
const { validationResult, body } = require("express-validator");
const dotenv = require("dotenv");
const Content = require("../models/Content");
const Event = require("../models/Event");
const path = require('path')
dotenv.config({ path: __dirname + "../config.env" });

router.post(
  "/postContent",
  async (req, res) => {
    const { page, newdata } = req.body
    if (page === 'home') {
      await Content.updateOne(Content.findOne()._id, { home: newdata });
      res.status(200).json({ message: "Successfully Changed Home Page Content!" })
    }
    else if (page === 'about') {
      await Content.updateOne(Content.findOne()._id, { about: newdata });
      res.status(200).json({ message: "Successfully Changed About Page Content!" })
    }
    else if (page === 'contact') {
      await Content.updateOne(Content.findOne()._id, { contact: newdata });
      res.status(200).json({ message: "Successfully Changed Contact Page Content!" })
    }
    else {
      res.status(400).json({ error: "Some Error Occurred" })
    }
  }
);

router.post(                                                      // Needs Admin Authentication
  "/createEvent",
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      let sampleFile = req.files.proof;
      let filename = req.body.name + "-" + new Date().toISOString().slice(0, 10) + ".jpg"
      let uploadPath = path.join(__dirname, '..', '/public/event_images/') + filename;

      const done = sampleFile.mv(uploadPath)

      if (done) {

        const event = await Event.create(
          {
            name: req.body.name,

            date: req.body.date,

            time: req.body.time,

            details: req.body.details,

            desc: req.body.description,

            entries: req.body.entries,

            dept: req.body.dept,

            rounds: req.body.rounds,

            fees: req.body.fees,

            image: filename
          }
          )

          if(event)
          {
            return res.status(200).json({ "message" : "Event Successfully Added" })
          }
      }
    }
    catch(error)
    {
      return res.status(400).json({ "errors": "Internal Server Error" })
    }
    }
);

router.get(
  "/fetchEvents",
  async (req, res) => {
    const events = await Event.find();
    if (events) {
      res.status(200).json({ events })
    } else {
      res.status(400).json({ error: 'Could not Retrieve Events List' })
    }
  }
);

module.exports = router;