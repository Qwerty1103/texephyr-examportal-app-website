const express=require("express")
const auth_ad=require("../middleware/admin-auth")
const {authenticatePortalAdminToken}=require("../middleware/jwt-auth")
const Round=require("../models/Round")
const Event=require("../models/Event")
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { validationResult, body } = require("express-validator");
const dotenv = require("dotenv")
const QuesSchema = require("../models/MCQ_Questions")
const CodeSchema=require("../models/CodingSchema")
const PuzzleSchema=require("../models/Puzzle")
const FFF=require("../models/FFF_questions")
const PsuedoCode=require("../models/PsuedoCode")
const PC_questions=require("../models/PC_questions")
const ShortlistedSchema=require("../models/Shortlisted")
const ScoreSchema=require("../models/Scoreboard")

dotenv.config({ path: __dirname + "../config.env" });
const router = express.Router()

router.post("/getFirstUser", async (req, res) => {
  const result = []
  const event = req.body.eventName;
  //console.log(event)
  const foundEvent = await Event.findOne({ name: event }, { _id: 1 })
  //foundEvent1=foundEvent.toString()
  
  const userList = await Registration.find({eventid:foundEvent._id},{userid:1,_id:0})
  //console.log(userList)
  let mn=event+"_ROUND1"
  for (let i = 0; i < userList.length; i++) {
    const grpMem = []
    for (let j = 0; j < userList[i].userid.length; j++) {
      await User.findOne({ _id: userList[i].userid[j] }).then(async (foundUser) => {
        //console.log(foundUser._id)
        grpMem.push({
          user_id:foundUser._id,
          completed:false
        })
      })
    }
    const model=String(mn.toUpperCase()+"_QUALIFIED")
    const model1=mongoose.model(model,ShortlistedSchema)
    model1.insertMany(grpMem)
    //result.push(grpMem)
  }
  res.status(200).json("success");
});


router.post("/add_round", async(req,res)=>{ //add auth authenticatePortalAdminToken
  try{
  let level=req.body.level
  let eventName=req.body.eventName
  let d=req.body.endTime
  let date = new Date(d); // some mock date
  let milliseconds = date.getTime(); 
  console.log(eventName)
  const foundEvent = await Event.findOne({ name: eventName }, { _id: 1 })
  console.log(foundEvent)
  const round = await Round.create({
    eventId: foundEvent._id,
    name:req.body.name.toUpperCase(),
    level:level,
    type:req.body.type.toUpperCase(),
    rules:req.body.rules,
    startTime:req.body.startTime,
    endTime:milliseconds,
    time:req.body.time,
    date: new Date()
  })
  if(round){
    console.log("In Here")
      let name=req.body.name.toUpperCase()
      console.log(name.slice(0,-1).toUpperCase())
      const event_name = await Event.findOne({_id: foundEvent._id},{name:1})
      console.log(event_name)
      if(req.body.type.toUpperCase()=="MCQS"){
      const ques = String(name.toUpperCase())
      const ques1 = mongoose.model(ques,QuesSchema)
      const score=String(name.toUpperCase()+"_SCOREBOARD")
      const score1=mongoose.model(score,ScoreSchema)
      const regis=String(name.toUpperCase()+"_QUALIFIED")
      const regis1=mongoose.model(regis,ShortlistedSchema)

      //res.json(ques)
      //res.status(200).json({ques,score,regis})
      }
      if(req.body.type.toUpperCase()=="CODING"){
        const ques = String(name.toUpperCase())
      const ques1 = mongoose.model(ques,CodeSchema.CodeSchema)
      const score=String(name.toUpperCase()+"_SCOREBOARD")
      const score1=mongoose.model(score,ScoreSchema)
      const regis=String(name.toUpperCase()+"_QUALIFIED")
      const regis1=mongoose.model(regis,ShortlistedSchema)
      }
      if(req.body.type.toUpperCase()=="PUZZLE"){
      const ques = String(name.toUpperCase())
      const ques1 = mongoose.model(ques,PuzzleSchema)
      const score=String(name.toUpperCase()+"_SCOREBOARD")
      const score1=mongoose.model(score,ScoreSchema)
      const regis=String(name.toUpperCase()+"_QUALIFIED")
      const regis1=mongoose.model(regis,ShortlistedSchema)
      }
      if(req.body.type.toUpperCase()=="FFF"){
        const ques = String(name.toUpperCase())
        const ques1 = mongoose.model(ques,FFF)
        const score=String(name.toUpperCase()+"_SCOREBOARD")
        const score1=mongoose.model(score,ScoreSchema)
        const regis=String(name.toUpperCase()+"_QUALIFIED")
        const regis1=mongoose.model(regis,ShortlistedSchema)
        }
      if(req.body.type.toUpperCase()=="PSUEDOCODE"){
        const ques = String(name.toUpperCase())
        const ques1 = mongoose.model(ques, PC_questions)
        const responses=String(name.toUpperCase()+"_RESPONSES")
        const responses1=mongoose.model(responses, PsuedoCode)
        const regis=String(name.toUpperCase()+"_QUALIFIED")
        const regis1=mongoose.model(regis,ShortlistedSchema)
      }
      res.status(200).json({message: "Added round"})
    }
    else{
      res.status(400).json(error)
    }
}
catch(err){
  console.log(err)
  res.status(400).json({err: err})
}

router.get("/", (req, res) => {
  console.log("Hi")
})

})

//EXAMPLE INPUT JSON-
// {
//   "eventId":"63e24ea07751280648ef4388",
//   "name":"CODESTORM_ROUND1",
//   "type":"MCQS",
//   "rules":"rules",
//   "time":60,
//   "level":1
// }


module.exports = router;
