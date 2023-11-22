import React, { useEffect } from "react";

function QuestionBridge(props) {


  useEffect(() => {
    document.getElementById(props.currQuestion + "-Id").style.visibility =
      "visible";
  }, [props.currQuestion]);
  // function for changing questions!
  function changeQuestion(currentId, nextId) {
    if(currentId===nextId) return;
    document.getElementById(currentId + "-Id").style.visibility = "hidden";
    props.setques(nextId);
  }
  return (
    <div
      className="bridgeElements"
      onClick={() => {
        changeQuestion(props.currQuestion, props.id);
      }}
    >
      {props.id}
    </div>
  );
}

export default QuestionBridge;
