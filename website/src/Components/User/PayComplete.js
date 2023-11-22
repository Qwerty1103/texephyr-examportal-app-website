import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "./paymentComp.css";
import done_icon from "../images/tick.png"

function PayComplete() {
  return(
    <>
    <Navbar />
    <div className="paySuccess">
      <img className='doneImg' src={done_icon}/>
      <div className="message">Thank you !!</div>
      <Link className="homelink" to="/">Home Page</Link>
      <div className="sociallinks" style={{"gap": "10px"}}>
        <a href='https://www.instagram.com/mitwpu_texephyr/' target='_blank'>  <img className='img-fluid' src="https://img.icons8.com/material-outlined/24/FFFFFF/instagram-new--v1.png"/> </a>
        <a href='https://www.linkedin.com/company/mit-wpu-texephyr/' target='_blank'>  <img className='img-fluid' src="https://img.icons8.com/ios-glyphs/24/FFFFFF/linkedin-2--v1.png"/> </a>
        <a href='https://www.facebook.com/texephyr/' target='_blank'>  <img className='img-fluid' src="https://img.icons8.com/ios-glyphs/24/FFFFFF/facebook-new.png"/> </a>
      </div>
      <div className="pageslink">
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms & Conditions</Link>
      </div>
      <div className="copyrighttext">
        <p>Copyright ©2023 All rights reserved by Texephyr 2023</p>
      </div>
    </div>
    </>
  )
};
/* test */
export default PayComplete