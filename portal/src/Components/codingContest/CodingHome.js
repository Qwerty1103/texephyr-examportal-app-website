import React, { useEffect, useState } from "react";
import { PostData } from "../apis/PostApi";
import { USERAPIURL, FRONTENDURL } from "../Constants";
import "./coding.css";
import { useNavigate, useLocation } from "react-router-dom";
import Timer from "../Timer/Timer";
import axios from "axios";
import CodingQuestion from "./CodingQuestion";
import Camera from '../Proctoring/camera'
import "./coding.css"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function CodingHome() {
  function submitTest(GivenTime = -1) {
    if (GivenTime === -1) {
      const list = document.getElementsByClassName("Timer-SubContainer");
      GivenTime =0;
      for(var i=0;i<list.length;i++){
        GivenTime+=list[i].innerHTML*(60**(2-i));
      }
      GivenTime=(time*60)-GivenTime;
    }
    var score = 0;
    questionList.forEach((element) => {
      score += element.casesPassed;
    });
    PostData(USERAPIURL + "sendScore", { score: score,time:GivenTime,userid:userid,round:roundName });
    toast.success("Test has been submitted!");
    setTime(5);
    setTimeout(function () {
      window.location.pathname = `round/u/`;
    }, 2000);
    return;
  }
  const navigate = useNavigate();
  const location = useLocation();
  const camera = location.state.camera;
  const roundId = location.state.roundid;
  const roundName = location.state.roundname;
  const [time, setTime] = useState(5);
  const [userid, setuserid] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionList, setQuestionsList] = useState([]);
  const [tabChange, setTabChange] = useState(0);
  const [question, setQuestion] = useState({
    problem_code: "",
    questionName: "",
    problem: "",
    example: [
      {
        input: "",
        output: "",
        explanation: "",
        show: false,
      },
    ],
    constraints: [
      {
        statement: "",
      },
    ],
    time_limit: "",
    Space_Complexity: "",
  });

  function login() {
    navigate("/login", { state: { path: FRONTENDURL + "round/u/" } });
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
          const data = PostData(`${USERAPIURL}codingQuestions`, {
            name: roundName,
            roundId: roundId,
            userid: userid
          });
          data.then((r) => {
            setTime((r.endTime-Date.now())/60000);
            r.questionArray.forEach((element) => {
              localStorage.setItem(element.problem_code,"")
              element.casesPassed = 0;
            });
            localStorage.setItem("StartTime",Date.now());
            localStorage.setItem("EndTime",r.endTime);
            setQuestionsList(r.questionArray);
            setQuestion(r.questionArray[0]);
            setQuestionNumber(0);
          });
        })
        .catch((err) => {
          localStorage.removeItem("userTokenPortal");
          login();
        });
    } else {
      login();
    }
  }, [userid]);

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

  useEffect(() => {
    if (questionList.length !== 0) {
      const resultContainer=document.getElementById("resultContainer");
      if(resultContainer!==null){
        resultContainer.innerHTML="";
        setQuestion(questionList[questionNumber]);

      }else{
        toast.error("Submission in Progress!");
      }
      
    }
  }, [questionNumber]);

  useEffect(() => {}, [questionList]);

  return (
    <>
      <ToastContainer/>
      <div className="mainContainer">
        <div>
          { camera ? <Camera /> : null}
          <Timer time={time} submitTest={submitTest} /> 
        </div>
        <div className="basicFlexBoxRow">
          {questionList.map((element, key) => {
            return (
              <div
                className="box"
                key={key}
                onClick={() => setQuestionNumber(key)}
              >
                {key + 1}
              </div>
            );
          })}
        </div>
        <div>
          <CodingQuestion
            problemStatementObject={question}
            setQues={setQuestionsList}
            questionsList={questionList}
          />
        </div>
        
          <button onClick={() => submitTest()} className="submit-btn-code">Finish</button>
        
      </div>
    </>
  );
}
