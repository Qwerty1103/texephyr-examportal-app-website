import React from 'react'
import video from "../images/heroBackground.mp4"
import Navbar from './Navbar';

import "./hersec.css"
import Spotting from './Spotting';
import Intro from './Intro';

function HeroSection() {

  return (
    <>
      <Navbar />
      <div className='heroSection'>
            <div className="heroText">
              <div className="part1">
                MIT WPU
              </div>
              <div className="part2">
                Texephyr Fest 2023
              </div>
              <div className="part3">
                Get your seat before the price goes up
              </div>
            </div>
            <video className="BackgroundVideo" autoPlay loop muted>
              <source src={video} type="video/mp4" />
            </video>
    </div>
      <Spotting/>

    </>
  )
}

export default HeroSection;
