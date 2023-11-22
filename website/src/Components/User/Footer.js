import React from 'react'
import './footer.css'
import texlogo from "../images/tex-final.png"
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
/* test */
function Footer() {
    return (
        <div>
            <footer className='mainFooter'>
                <div className="container footerContainer">
                    <div className="row align-items-center logoNlinks">
                        <div className="col-3">
                            <img className='img-fluid custom-logo' src={texlogo} alt="Tex Logo" />
                        </div>
                        <div className="col-7 d-flex justify-content-around footerText" style={{fontSize: "14px"}}>
                          <a style={{color: "white"}} href='/terms'>  Terms and Conditions </a>
                          <a style={{color: "white"}} href='/privacy'>  Privacy Policy </a>
                          <a style={{color: "white"}} href='/refund'>  Refund/Cancellation Policy </a>
                        </div>
                        <div className="col-2 d-flex justify-content-end socialLogos" style={{"gap": "10px"}}>
                          <a href='https://www.instagram.com/mitwpu_texephyr/' target='_blank'>  <img className='img-fluid' src="https://img.icons8.com/material-outlined/24/FFFFFF/instagram-new--v1.png"/> </a>
                          <a href='https://www.linkedin.com/company/mit-wpu-texephyr/' target='_blank'>  <img className='img-fluid' src="https://img.icons8.com/ios-glyphs/24/FFFFFF/linkedin-2--v1.png"/> </a>
                          <a href='https://www.facebook.com/texephyr/' target='_blank'>  <img className='img-fluid' src="https://img.icons8.com/ios-glyphs/24/FFFFFF/facebook-new.png"/> </a>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 d-flex justify-content-center text-white cpyrght">
                            <p className='footerText'>Copyright ©2023 All rights reserved by Texephyr 2023</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
