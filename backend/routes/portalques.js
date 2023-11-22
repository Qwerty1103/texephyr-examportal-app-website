const express = require("express");
const User = require("../models/User");
const mongoose = require("mongoose");
const fs = require('fs')
const multer = require('multer')
const { parse } = require('csv-parse')
// const Questions=require("../models/Questions")
const FFF_Questions = require("../models/FFF_questions.js");
const MCQ_Questions = require("../models/MCQ_Questions.js");
const csvtojson=require("csvtojson")
const PS_Questions = require("../models/PC_questions");
const Puzzle = require("../models/Puzzle")
const _ = require('underscore');
const Round = require("../models/Round");
const ScoreBoardSchema = require("../models/Scoreboard");
const ShortlistedSchema = require("../models/Shortlisted");
const router = express.Router();


// router.post('/round_activate', async (req, res) => {
//   const n = req.body.n
//   let r_id = req.body.r_id
//   const details = await Round.find({ _id: r_id }, { eventId: 1, name: 1, level: 1 })
//   const event_id = details[0]['eventId'].valueOf()//eventid
//   Round.updateOne({ _id: r_id }, { $set: { "status": true } })
//   const round_name = details[0]['name']
//   const level = details[0]['level']
//   const table1 = String(round_name.slice(0, -7).toUpperCase() + "_ROUND" + (level - 1) + "_SCOREBOARD")
//   const table2 = round_name + "_QUALIFIED"
//   const model1 = mongoose.model(table1, ScoreSchema)
//   const model2 = mongoose.model(table2, ShortlistedSchema)
//   const results = await model1.find()
//   results.sort((a, b) => b.marks - a.marks)
//   if (n != null) {
//     const qualified = results.slice(0, n)
//     model2.insertMany(qualified)
//   }
//   else {
//     model2.insertMany(results)
//   }
//   //Event.updateOne({_id:event_id},{$set:{"status":true}})
//   //const round_name=Round.find
// })

// router.post('/round_activate',async(req,res)=>{
//   const n = req.body.n
//   const r_id=req.body.r_id
//   const details = await Round.find({_id: r_id},{eventId:1, name:1, level:1})
//   const event_id=details[0]['eventId'].valueOf()//eventid
//   const object_id = new mongoose.Types.ObjectId(r_id)
//   const done = await Round.updateOne({_id: r_id}, {status: true})
//   const round_name=details[0]['name']
//   const level=details[0]['level']
//   const table1=String(round_name.slice(0,-7).toUpperCase()+"_ROUND" + (level-1)+"_SCOREBOARD")
//   const table2=round_name+"_QUALIFIED"
//   const model1=mongoose.model(table1,ScoreBoardSchema)
//   const model2=mongoose.model(table2,ShortlistedSchema )
//   const results=await model1.find().sort({ marks: -1, time: 1 })   
//   if(n!=null){
//     const qualified=results.slice(0,n)
//     model2.insertMany(qualified)
//     res.send(qualified)
//   }
//   else{
//     model2.insertMany(results)
//     res.send(results)
//   }
//   //Event.updateOne({_id:event_id},{$set:{"status":true}})
//   //const round_name=Round.find
// })

router.post('/round_activate',async(req,res)=>{
  const n = req.body.n
  const r_id=req.body.r_id
  const details = await Round.find({_id: r_id},{eventId:1, name:1, level:1})
  const event_id=details[0]['eventId'].valueOf()//eventid
  const object_id = new mongoose.Types.ObjectId(r_id)
  const done = await Round.updateOne({_id: r_id}, {status: true})
  const round_name=details[0]['name']
  const level=details[0]['level']
  if(level==1){
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
  }
  else{
  const table1=String(round_name.slice(0,-7).toUpperCase()+"_ROUND" + (level-1)+"_SCOREBOARD")
  const table2=round_name+"_QUALIFIED"
  const model1=mongoose.model(table1,ScoreBoardSchema)
  const model2=mongoose.model(table2,ShortlistedSchema )
  const results=await model1.find().sort({ marks: -1, time: 1 })   
  if(n!=null){
    const qualified=results.slice(0,n)
    model2.insertMany(qualified)
    res.send(qualified)
  }
  else{
    model2.insertMany(results)
    res.send(results)
  }
}
  //Event.updateOne({_id:event_id},{$set:{"status":true}})
  //const round_name=Round.find
})



router.post("/add_codingQuestion", async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  try {
    const ques = await Coding.create(
      {
        problem_code: req.body.problemid,
        questionName: req.body.questionname,
        problem: req.body.problem,
        example: [{
          input: req.body.ex1_input,
          output: req.body.ex1_output,
          explanation: req.body.ex1_explanation
        },
        {
          input: req.body.ex2_input,
          output: req.body.ex2_output,
          explanation: req.body.ex2_explanation
        },
        {
          input: req.body.ex3_input,
          output: req.body.ex3_output,
          explanation: req.body.ex3_explanation
        }],
        constraints: [{
          statement: req.body.constraint1
        },
        {
          statement: req.body.constraint2
        },
        {
          statement: req.body.constraint3
        },
        {
          statement: req.body.constraint4
        },
        {
          statement: req.body.constraint5
        },
        ],
        time_limit: req.body.timecomplexity
      }
    )
    if (ques) {
      return res.status(200).json({ "message": "Question Successfully Added" })
    }
  }
  catch (error) {
    return res.status(400).json({ "errors": { error } })
  }
}
)

//  TODO: Add upload functionality
// const uploadLocation = multer({ dest: '/home/sauravbhise/college/projects/tex/TEXEPHYR-2023/backend/csv' });

// router.post('/uploadCSV', uploadLocation.single('upload'), async (req, res) => {
//   // const fileRows = [];

//   // open uploaded file
//   // csv.fromPath(req.file.path)
//   //   .on("data", function (data) {
//   //     fileRows.push(data); // push each row
//   //   })
//   //   .on("end", function () {
//   //     console.log(fileRows)
//   //     fs.unlinkSync(req.file.path);   // remove temp file
//   //     //process "fileRows" and respond
//   //   })

//   const questions = []

//   fs.createReadStream("/home/sauravbhise/college/projects/tex/TEXEPHYR-2023/backend/csv/upload.csv")
//     .pipe(parse({ delimiter: ",", from_line: 2 }))
//     .on("data", async function (row) {

//       const mcq_model = mongoose.model('mcq_model', MCQ_Questions);

//       const question = Object.assign({}, row)

//       const options = { id1: question[2], o1: question[3], id2: question[4], o2: question[5], id3: question[6], o3: question[7], id4: question[8], o4: question[9] }

//       const ques = { questionId: question[0], question: question[1], options: options, answerOption: question[10], marks: question[11] }

//       const newQues = await mcq_model.create(ques)

//       console.log(newQues)

//       res.json({ newQues })
//     })

// });

router.post("/csv_add_mcqs",async(req,res)=>{
  
  const r_name = req.body.name
  const path = __dirname + "/mcq.csv"
  const model = mongoose.model(r_name, MCQ_Questions)
  arr=[]

  csvtojson()
  .fromFile(path)
  .then(async csvData => {
    for(let i=0;i<csvData.length;i++){
      let object1 = {id: 1,o: csvData[i].o1}
      let object2 = {id: 2,o: csvData[i].o2}
      let object3 = {id: 3,o: csvData[i].o3}
      let object4 = {id: 4,o: csvData[i].o4}
      let optionsArray = [object1, object2, object3, object4]
      console.log(optionsArray)
     const creates = await model.create({
      questionId: csvData[i].question_id,
      question: csvData[i].question,
      options: optionsArray,
      answerOption: csvData[i].ansOption,
      marks: csvData[i].marks
     }
     )   
}
})
res.json({"message":"success"})
})

router.post("/csv_puzzle",async(req,res)=>{
  
  const r_name = req.body.name
  const path = __dirname + "/puzzle.csv"
  const model = mongoose.model(r_name,Puzzle)
  //console.log(check)
  arr=[]

  csvtojson()
  .fromFile(path)
  .then(async csvData => {
    for(let i=0;i<csvData.length;i++){
      let object1 = {id: 1,q: csvData[i].q1}
      let object2 = {id: 2,q: csvData[i].q2}
      let object3 = {id: 3,q: csvData[i].q3}
      let object4 = {id: 4,q: csvData[i].q4}
      let ans1 = parseInt(csvData[i].a1)
      let ans2 = parseInt(csvData[i].a2)
      let ans3 = parseInt(csvData[i].a3)
      let ans4 = parseInt(csvData[i].a4)
      let optionsArray = [object1, object2, object3, object4]
      let ansArray=[ans1,ans2,ans3,ans4]
      console.log(optionsArray)
      console.log(ansArray)
      console.log(r_name)
     const creates = await model.create({
      ques: csvData[i].ques,
      options: optionsArray,
      ans: ansArray
     }
     )   
}
res.json({"message":"success"})
})
.catch(err=>{
  res.json({"err":err})
})

})

router.post("/csv_fff",async(req,res)=>{
  
  const r_name = req.body.name
  const path = __dirname + "/fff.csv"
  const model = mongoose.model(r_name,FFF_Questions)
  //console.log(check)
  arr=[]

  csvtojson()
  .fromFile(path)
  .then(async csvData => {
    for(let i=0;i<csvData.length;i++){
      let object1 = {id: 1,option: csvData[i].option1}
      let object2 = {id: 2,option: csvData[i].option2}
      let object3 = {id: 3,option: csvData[i].option3}
      let object4 = {id: 4,option: csvData[i].option4}
      let optionsArray = [object1, object2, object3, object4]
     const creates = await model.create({
      questionId:csvData[i].questionId,
      question: csvData[i].question,
      options: optionsArray,
      timerSeconds: String(csvData[i].timerSeconds),
      answerOption: parseInt(csvData[i].ansOption),
      points:csvData[i].points
     }
     )   
}
res.json({"message":"success"})
})
.catch(err=>{
  res.json({"err":err})
})

})


router.post("/add_MCQ_Question", async (req, res) => {

  const { questionId, question, options, answerOption, marks } = req.body;

  const mcq_model = mongoose.model('mcq_model', MCQ_Questions);

  try {
    const ques = {
      questionId, question, options, answerOption, marks
    }

    const newQues = await mcq_model.create(ques)

    res.json({ newQues })

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

})

router.post("/add_PS_Question", async (req, res) => {

  const { questionId, question } = req.body;

  const PS_model = mongoose.model('PS_model', PS_Questions);

  try {
    const ques = {
      questionId, question
    }

    const newQues = await PS_model.create(ques)

    res.json({ newQues })

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

})


router.post("/add_FFF_Question", async (req, res) => {
  const { questionId, question, options, timerSeconds, answerOption, points } = req.body;

  const fff_model = mongoose.model('fff_model', FFF_Questions);

  try {
    const ques = { questionId, question, options, timerSeconds, answerOption, points }

    const newQues = await fff_model.create(ques)

    res.json({ newQues })

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;
