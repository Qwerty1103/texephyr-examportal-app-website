import React, { useEffect } from "react";
import "./ps.css";
import { useState } from "react";

function BoilerPlate(props) {
  // Change questions on Trigger Event
  useEffect(() => {
    document.getElementById(props.currQuestion + "-Id").style.visibility =
      "visible";
  }, [props.currQuestion]);

  function changeQuestion(currentId, nextId) {
    document.getElementById(currentId + "-Id").style.visibility = "hidden";
    props.setques(nextId);
  }

  const [response, setResponse] = useState("");

  const handleResponseChange = (event) => {
    // 👇️ access textarea value
    setResponse(event.target.value);
  };

  return (
    <>
      <div id={props.index + "-Id"} className="questionContainer">
        <label>questionId :{props.Id}</label>
        <div id="mainQuestionContainer">
          <div>
            <p>{props.Desc}</p>
          </div>
        </div>
        <div className="mainOptionsContainer">
          <div className="optionsContainer">
            <label>
              <textarea
                placeholder="Answer here.."
                rows="5"
                cols="50"
                name={"inputElement-" + props.Id}
                className={"inputElement-" + props.Id}
                value={response}
                onChange={handleResponseChange}
                style={{
                  overflowY: "scroll",
                }}
              />
            </label>
          </div>
        </div>
        <div className="buttonContainer">
          <button
            className="button-6"
            onClick={(Event) => {
              changeQuestion(props.currQuestion, props.currQuestion - 1);
              Event.preventDefault();
            }}
            disabled={props.currQuestion === 1 ? true : false}
          >
            Back
          </button>
          <button
            className="button-6"
            onClick={(Event) => {
              changeQuestion(props.currQuestion, props.currQuestion + 1);
              Event.preventDefault();
            }}
            disabled={props.TotalQuestions > props.currQuestion ? false : true}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default BoilerPlate;
