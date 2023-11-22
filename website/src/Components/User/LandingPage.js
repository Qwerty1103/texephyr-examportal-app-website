
import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import './landingpage.css'
import { Canvas, useThree } from '@react-three/fiber'
import Blob from "./Blob"

function LandingPage() {
  const cameraPos = window.innerWidth >= 1023?8:10;

  return (
    <>
    <section className='landing-section' >
      <div className='container'>
        <div className='row align-items-center text-left'>
          <div className='col-lg-12 mb-4 margin-bottom-sm'>
          <h1 className='about-heading'>
          Welcome to the Biggest National Level Tech Fest</h1>
          </div>

          <div className="col-lg-5 wow fadeInLeft text-left animated mb-4" style={{visibility: "visible",animationDelay: "0s", animationName: "fadeInLeft", backgroundSize: "cover",position:"relative"}}>
                
                <Suspense>
                <Canvas camera={{ position: [0.0, 0.0, cameraPos] }} style={{height: "500px"}} >
                  
                    <Blob />
                  
                </Canvas>
                </Suspense>
   
          </div>

          <div className="col-lg-6 wow fadeInLeft animated mb-4" style={{visibility: "visible",animationDelay: "0s", animationName: "fadeInLeft", backgroundSize: "cover"}}>
                <p className='heading-paragraph'>
                Technical events establish a bridge between students and the industry. Texephyr, a national level techfest organized by the students of MIT WPU Pune provides a platform for creative minds nation wide to showcase their curricular and extracurricular talents. Texephyr is beyond just a technical fest. It is a foundation for students to experience various aspects of professional life.
                </p>

                <div class="spacer10"></div>

                <Link to="/about">
                  <div className="kmButton about-btn">
                    <div className="t2"></div>
                    <div className="t1">Know more</div>
                  </div>
                </Link>
              </div>    
        </div>
      </div>
    </section>
    </>
  )
}

export default LandingPage
