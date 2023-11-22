import { Link } from "react-router-dom"
import logo from "./images/TexLogo.svg"
// import profile from "../images/profile-image.png"
// import cart from "../images/cartIcon.png"
import './navbar.css'
import { useEffect, useState } from "react"

export default function Navbar() {

  const [iconVisible, setIconVisible] = useState('notVisible')
  const [textVisible, setTextVisible] = useState('notVisible')
  const [cartVisible, setCartVisible] = useState('notVisible')

  useEffect(() => {
    if (localStorage.getItem('userTokenPortal')) {
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

  return (
    <>
      <nav class="navbar navbar-expand-lg" style={{backgroundColor: "#111111"}}>
        <div class="container-fluid">
        <Link className="navbar-brand" to="/"> <img className="navLogo" src={logo} alt="" /></Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="" role="button" ><i class="fa fa-bars" aria-hidden="true" style={{color: '#e6e6ff'}}></i></span>
          </button>
          <div class="navbar-collapse collapse justify-content-between align-items-center w-100 mobileNav" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto ">
            <li className="nav-item ">
                <Link className="nav-link navText" style={{color: 'white'}} to="/">Home</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link navText" style={{color: 'white'}} to="/round/u/scoreboard">LeaderBoard</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link navText" style={{color: 'white'}} to="/contact">Contact Us</Link>
              </li>
            </ul>
            <form class="d-flex navIcons" role="search">
            {/* <Link className={`navbar-brand ${cartVisible} navIcon`} to="/cart"> <img className="cartIcon" src={cart} alt="" /></Link> */}
            {/* <Link className={`navbar-brand ${iconVisible} navIcon`} to="/profile"> <img className="profileImage" src={profile} alt="" /></Link> */}
            <Link className={`navbar-brand ${cartVisible} navIcon`} to="/logout"> <button className="logoutBtn removeBtn">Logout</button></Link>
            <Link className={`navbar-brand ${textVisible} navIcon`} to="/login"> <button className="navLoginBtn"> Login </button> </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

/* test */