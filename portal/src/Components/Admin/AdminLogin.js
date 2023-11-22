import './adminlogin.css'
import axios from 'axios'
import {useState } from 'react'
import { Row } from 'react-bootstrap';
import { AUTHAPIURL, FRONTENDURL } from '../Constants';

const AdminLogin = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const validate = () => {

    if (((!username) || (username === "")) && ((!password) || (password === ""))) {
      alert("Please enter a username and password")
      return false;
    }
    else
      return true

  }

  const submit = () => {
    if (validate()) {
      axios(
        {
          method: "POST",
          url: AUTHAPIURL + "loginPortalAdmin",
          data: { username, password }
        }
      ).then(async (res) => {
        await localStorage.setItem("adminTokenPortal", res.data.authToken)
        window.location.replace(FRONTENDURL);
      }).catch((err) => {
        alert(err.response.data.error)
      })
    } else {
      alert("Credentials not valid")
    }
  }

  return (
    <>
        <div style={{backgroundColor:'#171717',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
          <Row>
            <div style={{width:'100%'}}>
            <h1 className='tex'>
              TEXEPHYR Admin 
            </h1>
            <div style={{width:'fit-content', display:'flex',alignItems:'center',flexDirection:'column',height:'fit-content',textAlign:'left'}}>
              <input placeholder = "Enter Username" type="text" style={{width:'400px'}} value={username} className='txt-f' onChange={(e) => {setUsername(e.target.value)}}/>
              <input placeholder = "Enter Password" type="text" style={{width:'400px'}} value={password} className='txt-f' onChange={(e) => {setPassword(e.target.value)}}/>
              <br/>
              <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
              <button style={{marginTop:'40px',textAlign:'center'}} className='lgn-btn' onClick={submit}>Login</button>
              </div>
            </div>
            </div>
          </Row>
        </div>
    </>
  );
};

export default AdminLogin;
