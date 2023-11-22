import React, { useEffect, useState } from "react";
import "./mcq.css";


function BoilerPlate(props) {
  // Change questions on Trigger Event

  const[disabledBtn, setDisabledBtn] = useState("enabledBtn")

  useEffect(() => {
    document.getElementById(props.currQuestion+"-Id").style.visibility = "visible";
  }, [props.currQuestion]);

  function changeQuestion(currentId, nextId) {
    document.getElementById(currentId+"-Id").style.visibility = "hidden";
    props.setques(nextId);
  }

  return (
    <>
      <div id={props.index+"-Id"} className="MCQquestionContainer">
        <label>questionId :{props.Id}</label>
        <div id="mainQuestionContainer">
          <div>
            <p>{props.Desc}</p>
          </div>
        </div>
        <div className="mainOptionsContainer">
          {props.option.map((element, i) => {
            return (
              <div className="optionsContainer">
                <label>
                  <input
                    type="radio"
                    value={element.id}
                    name={"inputElement-" + props.Id}
                    className={"inputElement-" + props.Id}
                  />
                  {element[`o`]}
                </label>
              </div>
            );
          })}
        </div>
        <div className="buttonContainer">
          <button
            onClick={(Event) => {
              changeQuestion(props.currQuestion, props.currQuestion - 1);
              Event.preventDefault();
            }}
            disabled={props.currQuestion === 1 ? true : false}
            className="nxtBtn"
          >
           <span> Back </span>
           <i></i>
          </button>
          <button
            onClick={(Event) => {
              changeQuestion(props.currQuestion, props.currQuestion + 1);
              Event.preventDefault();
              // if(props.TotalQuestions === props.currQuestion)
              // {
              //   setDisabledBtn("disabledBtn")
              // } 
              // else
              // {
              //   setDisabledBtn("enabledBtn")
              // }
            }}
            disabled={props.TotalQuestions === props.currQuestion ? true : false}
            className={`nxtBtn ${disabledBtn}`}
          >
            <span>Next</span>
            <i></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default BoilerPlate;
