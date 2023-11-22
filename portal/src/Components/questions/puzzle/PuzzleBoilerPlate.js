import React, { useState, useEffect } from "react";
import "./PuzzleStyle.css";

function PuzzleBoilerPlate(props) {
  function dragElementQuestion(id) {
    let obj = props.optionArray.find((o) => o.id === id);
    const filteredArray = props.optionArray.filter((item) => item.id !== id);
    props.setAnswer([...props.answerArray, obj]);
    props.setOptions(filteredArray);
  }
  function dragElementAnswer(id) {
    let obj = props.answerArray.find((o) => o.id === id);
    const filteredArray = props.answerArray.filter((item) => item.id !== id);
    props.setOptions([...props.optionArray, obj]);
    props.setAnswer(filteredArray);
  }
  // Function for keeping track of coundown

  useEffect(() => {
    props.setOptions(props.question.options);
    props.setAnswer(props.question.userAns);
  }, [props.question.options, props.question.userAns]);

  return (
    <div className="puzzle__boilerContainer">
      <div
        className="puzzle__currentQuestion"
        style={{
          height: "100%",
        }}
        id={props.currentQuestion + "-Id"}
      >
        <div style={{ width: "80%", margin: "0 auto" }}>
          Question - {props.question.ques}
        </div>
        <div
          className="basicFlexRow"
          style={{
            width: "80%",
            height: "13vw",
            margin: "1.3rem auto",
          }}
          id="optionsContainer"
        >
          {props.optionArray.map((element, i) => {
            return (
              <div
                key={element.id}
                id={element.id}
                className="puzzle__card"
                onClick={() => dragElementQuestion(element.id)}
              >
                {element.q}
              </div>
            );
          })}
        </div>
        <div
          className="basicFlexRow"
          style={{
            width: "80%",
            background: "#6D78A4",
            height: "17vw",
            margin: "0 auto",
            borderRadius: "10px",
          }}
          id="answerContainer"
        >
          {props.answerArray.map((element, i) => {
            return (
              <div
                className="puzzle__card"
                key={element.id}
                id={element.id}
                style={{}}
                onClick={() => dragElementAnswer(element.id)}
              >
                {element.q}
              </div>
            );
          })}
        </div>
        <div className="puzzle__flex">
          <div>
            <button
              className="button-6 "
              onClick={() => {
                props.setCurrentQuestion(props.currentQuestion - 1);
              }}
              disabled={props.currentQuestion !== 0 ? false : true}
            >
              Previous
            </button>
            <button
              className="button-6"
              onClick={() => {
                props.setCurrentQuestion(props.currentQuestion + 1);
              }}
              disabled={
                props.currentQuestion < props.questionsArray.length - 1
                  ? false
                  : true
              }
            >
              Next
            </button>
          </div>

          <div>
            <button
              className="button-6"
              style={{
                background: "#C96A8E",
                color: "#3B4870",
              }}
              onClick={() => {
                props.submitTest();
              }}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PuzzleBoilerPlate;
