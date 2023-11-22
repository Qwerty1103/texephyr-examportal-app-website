import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { USERAPIURL } from '../Constants'
import './About.css'
import Navbar from './Navbar'
import Footer from './Footer'
//
function About() {

  const [s1p1, sets1p1] = useState("")
  const [s1p2, sets1p2] = useState("")
  const [s1p3, sets1p3] = useState("")

  useEffect(() => {
    axios(
      {
        method: "POST",
        url: USERAPIURL + "getContent",
        data: { "page": "about" }
      }
    )
      .then((response) => {
        sets1p1(response.data.content.s1p1)
        sets1p2(response.data.content.s1p2)
        sets1p3(response.data.content.s1p3)
      }
      )
      .catch((err) => { console.log(err) })
  }, [])

  return (
    <>
    <Navbar />
    <section className='joining-section'>
      <div className='container'>
        <div className='col-lg-12 text-center mb-4'>
          <h1 className="head">{s1p1}</h1>
        </div>
        <div className='col-lg-12 mb-5'>
          <p className="content">{s1p2} <br /><br /> {s1p3}</p>
        </div>
        <hr />
        <div className='col-lg-12 mt-4'>
          <div className='row'>
            <div className='col-lg-4 mb-5'>
              <h2 className="thirty num">20+</h2>
              <h3 className="text">Events</h3>
            </div>
            <div className='col-lg-4 mb-5'>
              <h2 className="seven num">10+</h2>
              <h3 className="workshop text">Workshops</h3>
            </div>
            <div className='col-lg-4 mb-5'>
              <h2 className="three num">3500+</h2>
              <h3 className="part text">Participants</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}

export default About
