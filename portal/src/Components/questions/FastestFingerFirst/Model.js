import React, { useEffect, useState } from "react";
import "./FFF.css";
import { toast } from "react-toastify";

export default function Model(props) {
  // states for managing Time
  useEffect(() => {
    // change timer once component is loaded!
    props.changeTimer(props.timer);
  }, []);
  useEffect(() => {
    const list = document.getElementsByName("inputElement-" + props.Id);
    list.forEach((element) => {
      element.checked = false;
    });
  }, [props.option]);
  return (
    <>
      <div id={props.Id} className="FFFQuestionContainer">
        <div id="mainQuestionContainer">
          <div>Question - {props.Desc} </div>
        </div>
        <div className="optionContainer">
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
                  {element.option}
                </label>
              </div>
            );
          })}
        </div>
        <button
          className="FFFSubmitBtn"
          onClick={() => {
            props.answer(true);
            toast.success("Answer Was Recorded");
          }}
        >
          Submit Answer
        </button>
      </div>
    </>
  );
}
