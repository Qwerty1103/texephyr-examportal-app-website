import {Carousel, CarouselItem, Row} from 'react-bootstrap'
import './loginpage.css'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AUTHAPIURL, FRONTENDURL } from '../Constants';


const Login = (props) => {

  const navigate = useNavigate()

  const [username,setUsername] =  useState("")
  const [password,setPassword] = useState("")

  const setValUser = event => {
      setUsername(event.target.value);
  }

  const setValPass = event => {
    setPassword(event.target.value);
  }

  const validate = () => {
    
    let valid = false;

    if(((!username) || (username === "")) && ((!password) || (password === ""))){
      alert("Please enter a username and password")
    }
    if(username.length >= 10 && password.length >= 8){
        valid = true;
    }else{
      alert("Please enter valid username and password")
    }
    return valid;
  
  }

  const submit = () => {
    if (validate()){
      axios(
        {
          method: "POST",
          url: AUTHAPIURL + "loginUserPortal",
          data:{username,password}
        }
      ).then(async (res) => {
        await localStorage.setItem("userTokenPortal", res.data.authToken)
        if(props.path)
          navigate(props.path)         
          // The page that calls login will send it's path as props so that we can navigate to that path after successfull login
        else
         window.location.replace(`${FRONTENDURL}round/u/`);
         
      }).catch((err) => {
        alert(err.response.data.error)
      })
    }else{
      alert("Credentials not valid")
    }
  }



    return(
      <section style={{margin:'0px',padding:'0px',border:'none'}}>
        <div className='ctn' style={{backgroundColor:'red',height:'100vh'}}>     
          <Carousel>
            <CarouselItem className='imgs'>
              <img src='https://wallpaperaccess.com/full/2029165.jpg' alt=""/>
            </CarouselItem >
            <CarouselItem className='imgs'>
              <img src='https://wallpaperaccess.com/full/917648.jpg' alt=""/>
            </CarouselItem>
            <CarouselItem className='imgs'>
              <img src='https://wallpaperaccess.com/full/2637581.jpg' alt=""/>
            </CarouselItem>
          </Carousel>
        </div>
        <div style={{backgroundColor:'#171717',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
          <Row>
            <div style={{width:'100%'}}>
            <h1 className='tex'>
              Welcome to texephyr
            </h1>
            <div style={{width:'fit-content', display:'flex',alignItems:'center',flexDirection:'column',height:'fit-content',textAlign:'left'}}>
              <span style={{width:'100%'}} className='txt'>Username or Phone Number</span>
              <input type="text" style={{width:'400px'}} className='txt-f' onChange={setValUser}/>
              <span style={{width:'100%'}} className='txt'>Password</span>
              <input type="password" style={{width:'400px'}} className='txt-f'onChange={setValPass}/>
              <br/>
              <span className='lnk'>
                <a href="/"> Contact Admin </a>
              </span>
              <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
              <button style={{marginTop:'40px',textAlign:'center'}} className='lgn-btn' onClick={submit}>Login</button>
              </div>
              <Link to="/register" style={{marginTop:'100px'}}> New? Register here </Link>
            </div>
            </div>
          </Row>
           
          
        </div>
      
      </section>
    );
};

export default Login;