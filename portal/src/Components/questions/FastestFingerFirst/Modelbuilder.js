import React, { useEffect, useState } from "react";
import Model from "./Model";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PostData } from "../../apis/PostApi";
import { FRONTENDURL, USERAPIURL } from "../../Constants";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function Modelbuilder(props) {
  const roundName = props.roundname;
  const roundId = props.roundid;
  const [tabChange, setTabChange] = useState(0);
  const [userid, setuserid] = useState("");
  const navigate = useNavigate();
  function login() {
    navigate("/login", { state: { path: FRONTENDURL + "round/u/" } });
  }

  function submitTest() {
    setStatus(true);
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

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        if (tabChange >= 3) {
          toast.error("Violations exceeded. Test will be auto submitted.");
          submitTest();
        } else {
          toast.error("Do not leave the tab");
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
      toast.error("Full screen exited. Test will be auto submitted.");
      submitTest();
    };
    if (document.fullscreenElement != null) {
      document.addEventListener("fullscreenchange", handleExitFullScreen);
    }
    return () => {
      document.removeEventListener("fullscreenchange", handleExitFullScreen);
    };
  });

  // current question
  const [currentQuestion, setCurrentQuestion] = useState({});
  // a list of all questions
  const [allQuestions, setQuestionsArray] = useState([]);
  // keeping track of questions using ids
  const [currentQuestionId, setQuestionId] = useState(0);
  const [questionTimer, resetTimer] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [qcount, setQCount] = useState(0);
  const [done, setDone] = useState(0);

  // for rendering result page
  const [testEnded, setStatus] = useState(false);
  // for checking if user has marked answer or not
  const [answerStatus, setAnswerStatus] = useState(false);

  function calculateScore() {
    // if (currentQuestion === {}) return;
    var inputs, index;
    // check all inputs radio button for correct answer
    inputs = document.getElementsByTagName("input");
    for (index = 0; index < inputs.length; ++index) {
      if (inputs[index].checked) {
        if (
          toString(currentQuestion.answerOption) ===
          toString(inputs[index].value)
        ) {
          //( 1 - (( {response time} / {question timer} ) / 2 )) {points possible}

          const responseTime = currentQuestion.timerSeconds - questionTimer;
          const totalTimer = currentQuestion.timerSeconds;
          const pointsPossible = currentQuestion.points;

          var score = (1 - responseTime / totalTimer / 2) * pointsPossible;
          setTotalScore(totalScore + score);
        }
      }
    }
  }
  // get questions from database
  useEffect(() => {
    const response = fetch(
      USERAPIURL + "getFffQuestions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: roundName, roundId: roundId, userid:userid }),
      }
    );
    response.then(async (r) => {
      var res = await r.json();
      localStorage.setItem("StartTime", Date.now());
      localStorage.setItem("EndTime", res.endTime);
      res = res.questionArray;
      setQuestionsArray([...res]);
      setQuestionId(0);
    });
  }, [userid]);

  useEffect(() => {
    if(done)
    {
        const TimeTaken =
        (Date.now() - localStorage.getItem("StartTime")) / 1000;
      PostData(USERAPIURL + "sendScore", {
        score: totalScore,
        time: TimeTaken,
        userid: userid,
        round: roundName,
      }).then(() => {
        toast.success("Test has been submitted!");
        setTimeout(function () {
          window.location.replace(FRONTENDURL + `round/u/`);
        }, 1000);
      }).catch((err) => toast.error(err));
      return;
    }
  }, [done])

  // change timer, current question, all questions array, total score and keep tab of tests status
  useEffect(() => {
    const interval = setInterval(() => {
      if(!done)
      {
        if (questionTimer > 0 && answerStatus === false)
        resetTimer(questionTimer - 1);
      else {
        if(qcount === allQuestions.length - 1)
        {
          setDone(true)
        }
        else if (!testEnded) {
          calculateScore();
          setQuestionId(currentQuestionId + 1);
          resetTimer(60);
          setQCount(qcount + 1);
          setAnswerStatus(false);
        } else {
          setDone(true)
          return;
        }
      }
      }
      else
      {
        return () => clearInterval(interval);
      }
    }, 1000);
    if (allQuestions.length !== 0) {
      if (currentQuestionId < allQuestions.length) {
        setCurrentQuestion(allQuestions[currentQuestionId]);
      } else {
        setStatus(true);
      }
    }
    return () => clearInterval(interval);
  }, [
    questionTimer,
    currentQuestionId,
    allQuestions,
    testEnded,
    totalScore,
    answerStatus,
  ]);

  return (
    <>
      <ToastContainer />
      <div className="FFFContainer">
        <div id="FFFmainTimerContainer">
          Time till Next Question:
          <div className="timerContainerClass">{questionTimer}</div>
        </div>
        {Object.keys(currentQuestion).length === 0 ? (
          "Loading Questions"
        ) : (
          <Model
            Id={currentQuestion.questionId}
            Desc={currentQuestion.question}
            option={currentQuestion.options}
            timer={currentQuestion.timerSeconds}
            changeTimer={resetTimer}
            answer={setAnswerStatus}
          />
        )}
      </div>
    </>
  );
}

export default Modelbuilder;
