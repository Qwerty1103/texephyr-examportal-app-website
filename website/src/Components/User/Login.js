import { Carousel, CarouselItem, Row } from 'react-bootstrap'
import './loginpage.css'
import axios from 'axios'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { AUTHAPIURL, FRONTENDURL, USERAPIURL } from '../Constants';
import Navbar from './Navbar';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Footer from './Footer';

const Login = () => { //Proper Validation and New Images

  const location = useLocation()

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      axios.get(USERAPIURL + 'getUser',
        { headers: { "Authorization": `${localStorage.getItem('userToken')}` } })
        .then(() => { window.location.replace(FRONTENDURL); })
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.removeItem('userToken')
            window.location.replace(FRONTENDURL + "login")
          }
          else
            toast.error(err.response.data.error);
        })
    }
  }, [])

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const setValUser = event => {
    setUsername(event.target.value);
  }

  const setValPass = event => {
    setPassword(event.target.value);
  }

  const validate = () => {

    let valid = false;

    if (((!username) || (username === "")) && ((!password) || (password === ""))) {
      toast.error("Please enter a username and password")
    }
    else if (username.length >= 10 && password.length >= 8) {
      valid = true;
    } else {
      toast.error("Please enter valid username and password")
    }
    return valid;
  }
/* test */
  const submit = () => {
    if (validate()) {
      axios(
        { 
          method: "POST",
          url: AUTHAPIURL + "loginUser",
          data: { username, password }
        }
      ).then((res) => {
        localStorage.setItem("userToken", res.data.authToken)
        toast.success("Login Successfull")
        if (location.state) {
          window.location.replace(location.state.path)
        }          // The page that calls login will send it's path as props so that we can navigate to that path after successfull login
        else {
          window.location.replace(FRONTENDURL);
        }
      }).catch((err) => {
        toast.error(err.response.data.error)
      })
    }
  }

  return (
    // Bug in using back button
    <>
    <Navbar />
    <div className="loginPage"> 
        <section className='user-login-section' style={{ margin: '0px', padding: '0px', border: 'none' }}>
          <div className='ctn' style={{ backgroundColor: 'red', height: '100vh' }}>
            <Carousel>
              <CarouselItem className='imgs'>
                <img src='https://wallpaperaccess.com/full/2029165.jpg' alt="" />
              </CarouselItem >
              <CarouselItem className='imgs'>
                <img src='https://wallpaperaccess.com/full/917648.jpg' alt="" />
              </CarouselItem>
              <CarouselItem className='imgs'>
                <img src='https://wallpaperaccess.com/full/2637581.jpg' alt="" />
              </CarouselItem>
            </Carousel>
          </div>
          <div className='loginRight' style={{ backgroundColor: '#171717', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Row>
              <div className='loginContainer'>
                <div className="loginUpper">
                  <div className='tex'>
                    Welcome to Texephyr
                  </div>
                </div>
                <div className="loginLower">
                  <div className="loginForm">
                    <div className="loginUsername">
                      <span className='txt'>Email or Phone Number</span>
                      <input type="text" className='txt-f' onChange={setValUser} />
                    </div>
                    <div className="loginPass">
                      <span className='txt'>Password</span>
                      <input type="password" className='txt-f' onChange={setValPass} />
                    </div>
                  </div>
                  {/* <span className='lnk'>
                    <Link to="/"> Forgot Password? </Link>
                  </span> */}
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <button style={{ marginTop: '40px', textAlign: 'center' }} className='lgn-btn' onClick={submit}>Login</button>
                  </div>
                  <Link className='registerLink' to="/forgotpassword" style={{ marginTop: '50px' }}> Forgot password ? </Link>
                  <Link className='registerLink' to="/register" style={{ marginTop: '50px' }}> New? Register here </Link>
                  
                </div>


              </div>
            </Row>


          </div>

        </section>
      </div>

    <Footer />
    </>
  );
};

export default Login;