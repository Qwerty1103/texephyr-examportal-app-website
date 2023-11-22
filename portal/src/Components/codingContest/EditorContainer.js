import { decode as base64_decode, encode as base64_encode } from "base-64";
import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import { CirclesWithBar } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import testCases from "./testCases.json";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "./editor.css";
import { CODINGAPIURL } from "../Constants";

// List of Languages our Editor Supports

const languageIds = [
  {
    mode: "javascript",
    id: 63,
  },
  {
    mode: "java",
    id: 62,
  },
  {
    mode: "python",
    id: 71,
  },
  {
    mode: "c_cpp",
    id: 54,
  },
];

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

//Import library for each Language
languageIds.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang.mode}`);
  require(`ace-builds/src-noconflict/snippets/${lang.mode}`);
});

// Main Function

function EditorContainer(props) {
  const [currentLanguage, setLang] = useState("javascript");
  const [code, setCode] = useState(
    localStorage.getItem(props.questionObject.problem_code)
  );
  const [loader, setLoader] = useState(false);
  const [resultList, setResultList] = useState([]);

  function getSubmission(response, type) {
    var responseList = [];
    const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));
    response.forEach(async (element, i) => {
      console.log("Element->", element);
      const options = {
        method: "GET",
        url: CODINGAPIURL,
        params: {
          tokens: element.token,
          base64_encoded: "true",
          fields: "*",
        },
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "aec0b4cb69msh06e61cd2ebdc681p13dd8cjsn994e53643a5d",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      };

      axios

        .request(options)
        .then(async function (res) {
          for (var key in res.data.submissions) {
            var temp = res.data.submissions[key];
            const input = base64_decode(temp.stdin);
            var obj = props.questionObject.example.find(
              (o) => o.input === input
            );
            var tempObject = {
              status: temp.status,
              desc: temp.stdout === null ? null : base64_decode(temp.stdout),
              input: base64_decode(temp.stdin),
              compilation_output: temp.compile_output=== null ? null : base64_decode(temp.compile_output),
              output: obj.output,
              show: obj.show,
              color: temp.status.id == 3 ? "green" : "red",
            };
            if (tempObject.color === "green" && type) {
              props.setProblemObject((prevObj) => ({
                ...prevObj,
                casesPassed: prevObj.casesPassed + 1,
              }));
            }
            if (tempObject.status.id < 3) responseList.push(element);
            else {
              setResultList((resultList) => [...resultList, tempObject]);
            }

            if (response.length === i + 1) {
              if (responseList.length !== 0) {
                await waitFor(2000);
                getSubmission(responseList, type);
              } else setLoader(false);
            }
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  }

  useEffect(() => {
    setCode(localStorage.getItem(props.questionObject.problem_code));
  }, [loader, resultList, props.questionObject, code]);
  // Run Function
  function submitFunction(code, type) {
    if (code === "") {
      toast.error("Enter Code!");
      return;
    }
    //reload result set
    setResultList([]);
    // start loader
    setLoader(true);
    const langSubmitted = languageIds.find(
      (e) => e.mode === document.getElementById("lang").value
    ).id;

    // Set Axios for Batched Submission
    const optionData = { submissions: [] };
    /*
      optionData={
        submissions:[
          language_id: ,
          source_code: ,
          stdin: ,
        ]
      }
    */

    if (!type) {
      // for run function!
        props.questionObject.example.forEach((element) => {
          if (element.show) {
            const temp = {
              language_id: langSubmitted,
              source_code: base64_encode(code),
              stdin: base64_encode(element.input),
              expected_output: base64_encode(element.output),
            };
            optionData.submissions.push(temp);
          }
        });
    } else {
      // for submit function!
      props.questionObject.example.forEach((element) => {
        const temp = {
          language_id: langSubmitted,
          source_code: base64_encode(code),
          stdin: base64_encode(element.input),
          expected_output: base64_encode(element.output),
        };
        optionData.submissions.push(temp);

        // Reset Test Cases to 0
        props.setProblemObject((prevObj) => ({
          ...prevObj,
          casesPassed: 0,
        }));
      });
    }
    const options = {
      method: "POST",
      url: CODINGAPIURL,
      params: { base64_encoded: "true" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "aec0b4cb69msh06e61cd2ebdc681p13dd8cjsn994e53643a5d",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: JSON.stringify(optionData),
    };

    axios.request(options).then(function (response) {
      // Test Solution against each test case
      getSubmission(response.data, type);
    });
  }

  // Render editor
  return (
    <>
      <div
        id="mainC"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          id="aceContainer"
          style={{
            width: "80%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div id="selectorContainer">
            <select
              name="lang"
              id="lang"
              onChange={(event) => {
                setLang(event.target.value);
              }}
            >
              {/* Set All Languages */}
              {languageIds.map((ele, i) => {
                return (
                  <option key={i} value={ele.mode} id={ele.id}>
                    {ele.mode}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Ace Editor */}
          <AceEditor
            placeholder="Code From Here"
            mode={currentLanguage}
            name="MainEditorElement"
            onChange={(c) => {
              setCode(c);
              localStorage.setItem(props.questionObject.problem_code, c);
            }}
            fontSize={20}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            width="80%"
            value={code}
          />
          <div
            style={{
              display: "flex",
              width: "80%",
              margin: "1vw",
              justifyContent: "space-between",
            }}
          >
            <div
              id="customTestContainer"
              style={{ display: "flex", flexDirection: "column" }}
            ></div>
            <div className="btn-container">
              <button
                className="ContainerBtn"
                onClick={() => submitFunction(code, false)}
              >
                Run Code
              </button>
              <button
                className="ContainerBtn"
                onClick={() => submitFunction(code, true)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {loader ? (
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor="red"
          innerCircleColor="orange"
          barColor=""
          ariaLabel="circles-with-bar-loading"
        />
      ) : (
        <div className="resultSection">
          <h1 style={{ margin: "10px" }}>Result</h1>
          <div id="resultContainer">
            {resultList.map((element, i) => {
              return (
                <>
                  {!element.show ? (
                    <div
                      className="resultCard"
                      style={{
                        backgroundColor: element.color,
                      }}
                    >
                      <p>Test Case - {i + 1} Hidden</p>
                      <p>
                        Status -:{" "}
                        {element.status.description === "In Queue" ||
                        element.status.description === "Processing"
                          ? "TLE"
                          : element.status.description}
                      </p>
                    </div>
                  ) : (
                    <div
                      className="resultCard"
                      style={{
                        backgroundColor: element.color,
                      }}
                    >
                      <p>Test Case - {i + 1}</p>
                      <p>
                        Status -:{" "}
                        {element.status.description === "In Queue" ||
                        element.status.description === "Processing"
                          ? "TLE"
                          : element.status.description}
                      </p>
                      <p>Input -: {element.input}</p>
                      <p>Output -: {element.desc}</p>
                      Compilation Errors -:
                      <p className="compOut"> {element.compilation_output}</p>
                      <p>Expected Output -: {element.output}</p>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default EditorContainer;
