import './adminlogin.css'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { AUTHAPIURL, FRONTENDURL } from '../Constants';

const AdminLogin = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const validate = () => {

    if (((!username) || (username === "")) && ((!password) || (password === ""))) {
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
          url: AUTHAPIURL + "loginAdmin",
          data: { username, password }
        }
      ).then(async (res) => {
        localStorage.setItem("adminToken", res.data.authToken)
        window.location.replace(FRONTENDURL + 'admin/home')
      }).catch((err) => {
        alert(err.response.data.error)
      })
    } else {
      alert("Credentials not valid")
    }
  }

  return (
    <>
      <div style={{ backgroundColor: '#171717', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Row>
          <div className='adminLogContainer'>
            <h1 className='admLogHead'>
              TEXEPHYR | Admin
            </h1>
            <div className='admLogForm'>
              <input placeholder="Enter Username" type="text" value={username} className='admLogformInput' onChange={(e) => { setUsername(e.target.value) }} />
              <input placeholder="Enter Password" type="password" value={password} className='admLogformInput' onChange={(e) => { setPassword(e.target.value) }} />
                <button className='lgn-btn' onClick={submit}>Login</button>
            </div>
          </div>
        </Row>
      </div>
    </>
  );
};

export default AdminLogin;
