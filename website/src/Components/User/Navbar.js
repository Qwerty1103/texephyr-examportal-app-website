import { Link } from "react-router-dom"
import logo from "../images/tex-final.png"
import './navbar.css'
import { useEffect, useState } from "react"

export default function Navbar() {

  const [iconVisible, setIconVisible] = useState('notVisible')
  const [textVisible, setTextVisible] = useState('notVisible')
  const [cartVisible, setCartVisible] = useState('notVisible')

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setIconVisible('visible');
      setTextVisible('notVisible');
      setCartVisible('visible');
    }
    else {
      setIconVisible('notVisible');
      setTextVisible('visible');
      setCartVisible('notVisible');
    }
  }, [])

  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () =>{
     if(window.scrollY >= 50){
       setColorchange(true);
     }
     else{
       setColorchange(false);
     }
  };

  window.addEventListener('scroll', changeNavbarColor);
  return (
    <>
     <nav className="navbar navbar-expand-lg fixed-top navbar-dark" style={{zIndex:"5"}}>
        <div class="container">
        <Link className="navbar-brand" to="/"> <img className="navLogo" style={{margin:"0px",padding:"0px",height:"55px",width:"180px"}} src={logo} alt="" /></Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="" role="button" ><i class="fa fa-bars" aria-hidden="true" style={{color: '#e6e6ff'}}></i></span>
          </button>
          <div class="navbar-collapse collapse justify-content-end w-100 mobileNav" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li className="nav-item navlink-li">
                <Link className="nav-link  navText navlink-a" style={{color: 'white'}} to="/about">About</Link>
              </li>
              <li className="nav-item navlink-li">
                <Link className="nav-link navText navlink-a" style={{color: 'white'}} to="/events">Events</Link>
              </li>

              <li className="nav-item navlink-li">
                <Link className="nav-link navText navlink-a" style={{color: 'white'}} to="/contact">Contact Us</Link>
              </li>
              <li className={`nav-item ${textVisible} navlink-li`}>
                <Link className="nav-link navText navlink-a padding-right-40" style={{color: 'white'}} to="/login">Login</Link>
              </li>
              <li className={`nav-item ${cartVisible} navlink-li`}>
                <Link className="nav-link navText navlink-a" style={{color: 'white'}} to="/logout">Logout</Link>
              </li>
              <li className={`nav-item ${iconVisible} navlink-li`}>
                <Link className="nav-link navText navlink-a" style={{color: 'white'}} to="/profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                </Link>
              </li>
              <li className={`nav-item ${cartVisible} navlink-li`}>
                <Link className="nav-link navText navlink-a padding-right-40" style={{color: 'white'}} to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                </Link>
              </li>
              <li className={`nav-item navlink-li`}>
                <Link className="nav-link navText navlink-a navlink-a-playnow" style={{color: 'white'}} to="/game">PLAY GAME</Link>
              </li>
            </ul>
          </div>
        </div>
    </nav>
    </>
  )
}

/* test */