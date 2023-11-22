import React, { useEffect, useState } from "react";
import BoilerPlate from "./BoilerPlate";
import QuestionBridge from "./QuestionBridge";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FRONTENDURL, USERAPIURL } from "../../Constants";
import Timer from "../../Timer/Timer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import '../Psuedocode/ps.css'

function ModelBuilder(props) {
  const roundName = props.roundname;
  const roundId = props.roundid;
  const [tabChange, setTabChange] = useState(0);
  const [userid, setuserid] = useState("");
  const navigate = useNavigate();
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

  const [time, setTime] = useState(1);

  // QuestionMap for keeping track of requested questions and their order.
  const [questionMap, setQuestionMap] = useState(new Map());

  //Keeping Track of the currently Displayed question
  const [currentQuestion, changeDisplayQuestion] = useState(1);

  // For storing questions
  const [questionsArray, setQuestion] = useState([]);

  //State for storing final result!

  // Mapping questions acquired by the api and rendering boilerPlate.js for each of them
  let questions = questionsArray.map((element, i) => {
    return (
      <BoilerPlate
        key={i}
        index={i + 1}
        Id={element.questionId}
        Desc={element.question}
        // option={element.options}
        setques={changeDisplayQuestion}
        currQuestion={currentQuestion}
        TotalQuestions={questionsArray.length}
      />
    );
  });

  //Function for sending responses data to the backend for further processing
  function submitTest(GivenTime = -1) {
    if (GivenTime === -1) {
      const list = document.getElementsByClassName("Timer-SubContainer");
      var GivenTime = 0;
      for (var i = 0; i < list.length; i++) {
        GivenTime += list[i].innerHTML * 60 ** (2 - i);
      }
    }
    const responseList = [];
    // getting all the questions documents by their className
    document.querySelectorAll(".questionContainer").forEach((div) => {
      const qId = parseInt(div.id) - 1;

      // finding object from list of object based on their questionId
      const temp = questionsArray.find(
        (q) => q.questionId === parseInt(questionMap.get(qId))
      );
      let inputList = document.getElementsByClassName(
        "inputElement-" + questionMap.get(qId)
      );

      for (var i = 0; i < inputList.length; i++) {
        const inputName = String(inputList.item(i).name);
        const qid = inputName.replace("inputElement-", "");
        const response = {
          questionId: qid,
          answer: inputList.item(i).value,
        };
        responseList.push(response);
      }
    });

    // Changing deadline to trigger end of Exam

    //Fetch API to connect with the backend
    fetch(USERAPIURL + "sendPS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userid,
        responses: responseList,
        round: roundName,
      }),
    });

    // revert back to HomePage
    toast.success("Test has been submitted!");
    setTimeout(function () {
      window.location.pathname = `round/u/`;
    }, 2000);
  }

  // API to get Questions from Backend
  useEffect(() => {
    const response = fetch(USERAPIURL + "getPSQuestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: roundName,
        roundId: roundId,
        userid: userid,
      }),
    });
    response.then(async (r) => {
      var res = await r.json();
      // setTime(time);
      setTime((res.endTime - Date.now()) / 60000);

      localStorage.setItem("StartTime", Date.now());
      localStorage.setItem("EndTime", res.endTime);

      res = res.questionArray;
      let temp = new Map();
      setQuestion([...res]);
      setQuestionMap(temp);
      await res.forEach((element, i) => {
        temp.set(i, element.questionId);
      });
    });
  }, [userid]);
  useEffect(() => {}, [time]);

  return (
    <>
      <ToastContainer />
      <div
        id="ModelBuilderMainContainer"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Timer time={time} submitTest={submitTest} />

        {/* Questions Bridge */}
        <div
          id="mainQuestionCounter"
          style={{ display: "flex", justifyContent: "center", margin: "2vh" }}
        >
          {questionsArray.map((element, i) => {
            return (
              <>
                <QuestionBridge
                  id={i + 1}
                  currQuestion={currentQuestion}
                  setques={changeDisplayQuestion}
                />
              </>
            );
          })}
        </div>
        <div id="mainModelBuilderContainer">
          <form>{questions}
          <button
              className="button-6 positioning"
              style={{
                background: "#e74d61",
                color: "#fff",
                padding: "0.8em 1.4em",
              }}
              type="submit"
              onClick={() => {
                submitTest();
              }}
            >
              Finish
            </button></form>
        
        </div>
      
      </div>
    </>
  );
}

export default ModelBuilder;
