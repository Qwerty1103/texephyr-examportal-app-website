import React, { useState, useEffect } from "react";
import PuzzleBoilerPlate from "./PuzzleBoilerPlate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FRONTENDURL, USERAPIURL } from "../../Constants";
import Camera from "../../Proctoring/camera";
import { useLocation } from "react-router-dom";
import Timer from "../../Timer/Timer";
import { PostData } from "../../apis/PostApi";
import "./PuzzleStyle.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function Puzzlehome() {
  const location = useLocation();
  const roundId = location.state.roundid;
  const roundName = location.state.roundname;
  const camera = location.state.camera;
  const [tabChange, setTabChange] = useState(0);
  const [userid, setuserid] = useState("");
  const navigate = useNavigate();

  const [time, setTime] = useState(5);

  function login() {
    navigate("/login", { state: { path: FRONTENDURL + "round/u/" } });
  }

  function submitTest(GivenTime = -1) {
    if (GivenTime === -1) {
      const list = document.getElementsByClassName("Timer-SubContainer");
      var GivenTime = 0;
      for (var i = 0; i < list.length; i++) {
        GivenTime += list[i].innerHTML * 60 ** (2 - i);
      }
      GivenTime = time * 60 - GivenTime;
    }

    var totalCount = 0;
    questionsArray.forEach((element) => {
      var temp = [];
      element.userAns.forEach((e) => {
        temp.push(e["id"]);
      });
      if (temp.toString() === element.ans.toString()) {
        totalCount = totalCount + 1;
      }
    });

    setTime(2);
    //API to Send Score
    PostData(USERAPIURL + "sendScore", {
      score: totalCount,
      time: GivenTime,
      userid: userid,
      round: roundName,
    });

    toast.success("Test has been submitted!");
    setTimeout(function () {
      window.location.pathname = `round/u/`;
    }, 2000);
  }
  useEffect(() => {
    if (localStorage.getItem("userTokenPortal")) {
      axios
        .get(USERAPIURL + "getUserId", {
          headers: {
            Authorization: `${localStorage.getItem("userTokenPortal")}`,
          },
        })
        .then((res) => {
          setuserid(res.data.id);
        })
        .catch((err) => {
          localStorage.removeItem("userTokenPortal");
          login();
        });
    } else {
      login();
    }
  }, []);

  // states for managing Time

  const [questionObject, setQuestion] = useState({
    _id: "",
    ques: "",
    options: [
      {
        id: 1,
        q: "",
      },
    ],
    ans: [],
    userAns: [],
  });
  const [userAnswerArray, setUserAnswerArray] = useState([]);
  const [optionsArray, setOptions] = useState(questionObject.options);


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionsArray, setQuestionsArray] = useState([questionObject]);
  const [formerQuestion,setFormerQuestion] = useState(0);

  useEffect(() => {
    async function setApi() {
      const response = await fetch(
        USERAPIURL + "getPuzzleQuestions",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: "no-referrer",
          body: JSON.stringify({
            name: roundName,
            roundId: roundId,
            userid: userid,
          }),
        }
      );
      const re = response.json();
      re.then((r) => {
        r.questionArray.forEach((element) => {
          element["userAns"] = [];
        });
        setQuestionsArray(r.questionArray);
        setQuestion(r.questionArray[0]);
        setTime((r.endTime - Date.now()) / 60000);
      });
    }
    setApi();
  }, [userid]);
  useEffect(() => {
    questionObject.userAns=userAnswerArray;
    questionObject.options=optionsArray;
    questionsArray[formerQuestion]=questionObject;
    
    setQuestionsArray(questionsArray);
    setFormerQuestion(currentQuestion)

    setQuestion(questionsArray[currentQuestion]);
  }, [currentQuestion]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        if(tabChange>=3){
          toast.error('Violations exceeded. Test will be auto submitted.');
          submitTest();
      }
      else{
        toast.error('Do not leave the tab');
        setTabChange(tabChange + 1);
      }
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [tabChange]);

  useEffect(() => {
    const handleExitFullScreen = (event) => {
      toast.error('Full screen exited. Test will be auto submitted.');
      submitTest();
    };
    if (document.fullscreenElement != null) {
      document.addEventListener("fullscreenchange", handleExitFullScreen);
    }
    return () => {
      document.removeEventListener("fullscreenchange", handleExitFullScreen);
    };
  });

  return (
    <div className="puzzle__container">
      {camera ? <Camera /> : null}
      <ToastContainer />
      <Timer time={time} submitTest={submitTest} />
      <div style={{ display: "flex", justifyContent: "center", margin: "2vh" }}>
        {questionsArray.map((element, i) => {
          return (
            <>
              <div
                className="puzzle__brigeElements"
                onClick={() => setCurrentQuestion(i)}
              >
                {i + 1}
              </div>
            </>
          );
        })}
      </div>

      <PuzzleBoilerPlate
        key={currentQuestion}

        question={questionObject}
        questionsArray={questionsArray}
        setCurrentQuestion={setCurrentQuestion}
        currentQuestion={currentQuestion}

        setArray={setQuestionsArray}
        answerArray = {userAnswerArray}
        setAnswer = {setUserAnswerArray}
        optionArray={optionsArray}
        setOptions={setOptions}
        
        submitTest={submitTest}
      />
    </div>
  );
}

export default Puzzlehome;
