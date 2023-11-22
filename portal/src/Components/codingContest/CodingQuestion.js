import React, { useEffect, useState } from "react";
import EditorContainer from "./EditorContainer";
import { Markup } from "interweave";
import "./editor.css";
// import WebcamView from "../Proctoring/camera";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FRONTENDURL, USERAPIURL } from "../Constants";

function CodingQuestion(props) {
  const navigate = useNavigate();
  const [problemStatementObject, setProblemStatementObject] = useState(
    props.problemStatementObject
  );

  const [userid, setuserid] = useState("");

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
          console.log(err);
        });
    } else {
      login();
    }
  }, []);

  useEffect(() => {
    setProblemStatementObject(props.problemStatementObject)
    
    const tempObj=[...props.questionsList];
      tempObj.forEach((element)=>{
        if(element["_id"]===problemStatementObject["_id"]){
          element.casesPassed=problemStatementObject.casesPassed;
        }
      })
  }, [props.problemStatementObject,problemStatementObject]);

  return (
    <>
      <div id="mainProblemStatementContainer">
        <div id="problemStatment">
          <h3>
            {problemStatementObject.problem_code}.{" "}
            {problemStatementObject.questionName}
          </h3>
          <Markup content={problemStatementObject.problem} />
        </div>
        <div id="exampleContainer">
          {problemStatementObject.example.map((element, i) => {
            if (element.show) {
              return (
                <div style={{ padding: "1vw" }} key={i}>
                  <div
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: "1vw",
                      borderRadius: "1vw",
                    }}
                  >
                    <br></br>
                    <p>Input - {element.input}</p>
                    <p>Output - {element.output}</p>
                    <p>Explanation - {element.explanation}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div id="contraintContainer">
          <h4>Constraints</h4>
          {problemStatementObject.constraints.map((e, i) => {
            return (
              <div key={i}>
                <p> {e.statement}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div
        id="homeMainEditorContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <hr style={{ width: "80%", margin: "1vw", color: "#cfd7cf" }}></hr>
        <EditorContainer
          questionObject={problemStatementObject}
          setProblemObject={setProblemStatementObject}
          submit={props.submit}
        />
      </div>
    </>
  );
}

export default CodingQuestion;
