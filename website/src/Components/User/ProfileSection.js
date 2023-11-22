import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FRONTENDURL, USERAPIURL } from "../Constants";
import texlogo from "../images/tex-final.png" 

import "./profileSection.css";
import ProfileEvent from "./ProfileEvent";
import Navbar from "./Navbar";
import { toast } from "react-hot-toast";
import Footer from "./Footer";

const ProfileSection = () => {

  const navigate = useNavigate()

  const [texid, setTexid] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [eventsData, seteventsData] = useState([])

  function login ()
  {
    navigate("/login", { state: { path: FRONTENDURL + 'profile' } })
  }

  useEffect(() => 
  {
    if(localStorage.getItem('userToken'))
    {
      axios.get(USERAPIURL + 'getUser',
      { headers: { "Authorization": `${localStorage.getItem('userToken')}` } })
      .then((res) => {
        setTexid(res.data.currentUser._id)
        setName(res.data.currentUser.name)
        setEmail(res.data.currentUser.email)
        axios.post(USERAPIURL + 'getAllRegisteredEvents', {id: res.data.currentUser._id}).then((response) => {
          seteventsData(response.data.events)
        })
      })
      .catch((err) => {
        localStorage.removeItem('userToken')
            toast.error(err.response.data.error);
            login()
      })
    }
    else
    {
        login()
    }
  }, [])

    const events = eventsData.map((event) => (
      <ProfileEvent
        key={event._id}
        id = {texid}
        event = {event}
      />
    ));

  return (
    <>
    <Navbar />
    <section className="joining-section">
      <div className="container" style={{marginTop:"20px"}}>
        <div className="col-md-6">
            <p className="profile-subheading mb-3">{texid}</p>
            <h1 className="profile-heading mb-3">{name}</h1>
            <p className="profile-subheading mb-3">{email}</p>
        </div>
        <div className="col-lg-12">
          <h2 className="profile-events-heading mb-5">Events</h2>
          <div className="row">
            {events}
          </div>
        </div>
      </div>
    </section>
    <div>
            <footer className='mainFooter custom-footer'>
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
    </>
  );
};
/* test */
export default ProfileSection;
