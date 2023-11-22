import { useState } from  "react";
import  ReactQuill  from  "react-quill";
import  "react-quill/dist/quill.snow.css";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./CodingAdmin.css"
const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
};

const  CodingAdmin  = () => {
    const [inputs, setInputs] = useState({});
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    
    const handleSubmit = (event) => {
      event.preventDefault();
      inputs.problem = ProblemState
      console.log("Submit");
      console.log(inputs);
      axios.post(`http://localhost:5001/add_codingQuestion`,  inputs )
        .then(res => {
          console.log(res);
          console.log(res.data);
          alert(res.data.message);
        })
  
    }
  


    const [ProblemState, setProblemState] = useState("" );
    return ( 
        <div className="App">
        <header className="App-header">
          Coding Round Question
        </header>
        <form onSubmit={handleSubmit}>
     
          <label><b>Round &emsp;</b>
          <select name="roundid" value={inputs.roundid || ""}  onChange={handleChange}>
                <option value="Codestorm Round 1">Codestorm Round 1</option>
                <option value="Codestorm Round 2">Codestorm Round 2</option>
                <option value="Powerpuff Round 1">Powerpuff Round 1</option>
                <option value="Powerpuff Round 2">Powerpuff Round 2</option>
            </select>
          </label>
          
          &emsp;&emsp;&emsp;
          <label><b>Problem ID&emsp;</b>
          <input 
            type="text" 
            name="problemid" 
            value={inputs.problemid || ""} 
            onChange={handleChange}
          />
          </label>
          &emsp;&emsp;&emsp;
          
          
          <label><b>Question Name&emsp;</b>
          <input 
            type="text" 
            name="questionname" 
            value={inputs.questionname || ""} 
            onChange={handleChange}
          />
          </label>
        
          
          <br></br>
          <Container fluid="md">
            <p><b><u>Problem</u></b></p>
          
    
            <ReactQuill  modules={modules} theme="snow" onChange={setProblemState} placeholder="Problem Statement" />
            </Container>
            <br/>
            <Container fluid="md">
        <Row>    
       <p><b><u>Example 1</u></b></p>
        
                <Col>
       <label><b>Input: &emsp;</b>
          <textarea style={{width: "370px", verticalAlign:"middle"}}
            rows= {9}
            type="textarea" 
            name="ex1_input" 
            value={inputs.ex1_input || ""} 
            onChange={handleChange}
          />
          </label>
          </Col>
          {/* &emsp;&emsp;&emsp;&emsp; */}
          <Col>
          <label><b>Output: &emsp;</b>
          <textarea style={{width: "370px", verticalAlign:"middle"}}
            rows= {9}
            type="text" 
            name="ex1_output" 
            value={inputs.ex1_output || ""} 
            onChange={handleChange}
          />
          </label>
          </Col>
          <Col>
          <label><b>Explanation: &emsp;</b>
          <textarea style={{width: "370px", verticalAlign:"middle"}}
            rows= {9}
            type="text" 
            name="ex1_explanation" 
            value={inputs.ex1_explanation || ""} 
            onChange={handleChange}
          />
          </label>
          </Col>
          <br></br>
          </Row>
         
        <br></br>
      <Row>
            
        <p><b><u>Example 2</u></b></p>
     <Col>
     <label><b>Input: &emsp;</b>
        <textarea style={{width: "370px", verticalAlign:"middle"}}
          rows= {9}
          type="textarea" 
          name="ex2_input" 
          value={inputs.ex2_input || ""} 
          onChange={handleChange}
        />
        </label>
      </Col>  
        {/* &emsp;&emsp;&emsp;&emsp; */}
      <Col>
        <label><b>Output: &emsp;</b>
        <textarea style={{width: "370px", verticalAlign:"middle"}}
          rows= {9}
          type="text" 
          name="ex2_output" 
          value={inputs.ex2_output || ""} 
          onChange={handleChange}
        />
        </label>
        </Col>
        {/* &emsp;&emsp;&emsp;&emsp; */}
        <Col>
        <label><b>Explanation: &emsp;</b>
        <textarea style={{width: "370px", verticalAlign:"middle"}}
          rows= {9}
          type="text" 
          name="ex2_explanation" 
          value={inputs.ex2_explanation || ""} 
          onChange={handleChange}
        />
        </label>
        </Col>
        </Row>
        
        <br></br>
      
      <Row>
    
       <p><b><u>Example 3</u></b></p>
     <Col>
     <label><b>Input: &emsp;</b>
        <textarea style={{width: "370px", verticalAlign:"middle"}}
          rows= {9}
          type="textarea" 
          name="ex3_input" 
          value={inputs.ex3_input || ""} 
          onChange={handleChange}
        />
        </label>
        {/* &emsp;&emsp;&emsp;&emsp; */}
        </Col>
        <Col>
        <label><b>Output: &emsp;</b>
        <textarea style={{width: "370px", verticalAlign:"middle"}}
          rows= {9}
          type="text" 
          name="ex3_output" 
          value={inputs.ex3_output || ""} 
          onChange={handleChange}
        />
        </label>
        </Col>
        {/* &emsp;&emsp;&emsp;&emsp; */}
        <Col>
        <label><b>Explanation: &emsp;</b>
        <textarea style={{width: "370px", verticalAlign:"middle"}}
          rows= {9}
          type="text" 
          name="ex3_explanation" 
          value={inputs.ex3_explanation || ""} 
          onChange={handleChange}
        />
        </label>
        </Col>
        </Row>
        </Container>

        <br/>
        <hr  style={{
          border: '1px solid #ccc',
    }}/> 
         <Container>
         <p><b><u>Constraints</u></b></p>
        <Row>
        <label><b>Constraint 1 &emsp;</b>
          <input 
            type="text" 
            name="constraint1" 
            value={inputs.constraint1 || ""} 
            onChange={handleChange}
          />
          </label>
          </Row>
          <br/>
          <Row>
          <label><b>Constraint 2 &emsp;</b>
          <input 
            type="text" 
            name="constraint2" 
            value={inputs.constraint2 || ""} 
            onChange={handleChange}
          />
          </label>
          </Row>
          <br/>
          <Row>
          <label><b>Constraint 3 &emsp;</b>
          <input 
            type="text" 
            name="constraint3" 
            value={inputs.constraint3 || ""} 
            onChange={handleChange}
          />
          </label>
          </Row>
          <br/>
          <Row>
          <label><b>Constraint 4 &emsp;</b>
          <input 
            type="text" 
            name="constraint4" 
            value={inputs.constraint4 || ""} 
            onChange={handleChange}
          />
          </label>
          </Row>
          <br/>
          <Row>
          <label><b>Constraint 5 &emsp;</b>
          <input 
            type="text" 
            name="constraint5" 
            value={inputs.constraint5 || ""} 
            onChange={handleChange}
          />
          </label>
          </Row>
          <br/><br/>
          <Row>
          <label><b>Time Complexity &emsp;</b>
          <input 
            type="text" 
            name="timecomplexity" 
            value={inputs.timecomplexity || ""} 
            onChange={handleChange}
          />
          </label>
          </Row>
          <br/>
          </Container>
       <p><input type="submit" /></p>
       
       </form>
      </div>


   )
};

export  default  CodingAdmin;
