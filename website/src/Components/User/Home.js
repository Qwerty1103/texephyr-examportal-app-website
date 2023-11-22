import React from 'react'
import Events from './Events';
import EventSlider from './EventSlider'
import Footer from './Footer';
import HeroSection from './HeroSection';
import LandingPage from './LandingPage'
import PreviousEvents from './PreviousEvents';
import Banner from './Banner';
import contentStack from '../images/cs-2.png'
import studysmart from '../images/study-smart.png'
import foodpartner from '../images/food-partner.png'
import Sponsor from './Sponsor';


function Home() {

  return (
    <>
      <HeroSection />
      <LandingPage />
 
      <EventSlider />
      <PreviousEvents />
      <Events />
      <Banner />
      {/* <div className='joining-section'>
            <div className='container'>

            <div className='row mb-5'>
                    <div className='col-lg-12 mb-3'>
                        <h1 className="joining-heading text-center" >
                            TITLE SPONSOR
                        </h1>
                    </div>
                    <div className='col-lg-12 mt-2 position-relative text-center'>
                        <img src={contentStack} alt="ContentStack" className='img-fluid contentStack' />
                    </div>
                </div>

      <div className='row mb-5'>
                    <div className='col-lg-12 mb-3'>
                        <h1 className="joining-heading text-center">
                            OVERSEAS SPONSOR
                        </h1>
                    </div>
                    <div className='col-lg-12 mt-5 position-relative text-center'>
                        <img src={studysmart} alt="studysmart" className='img-fluid' />
                    </div>
                </div>

               

                <div className='row mb-5'>
                    <div className='col-lg-12 mb-3'>
                        <h1 className="joining-heading text-center">
                            SNACKS PARTNER
                        </h1>
                    </div>
                    <div className='col-lg-12 mt-5 position-relative text-center'>
                        <img src={foodpartner} alt="foodpartner" className='img-fluid' style={{ width: "200px", height: "100px" }} />
                    </div>
                </div>
                </div>
                </div> */}
           <Sponsor/>
      <Footer />
    </>
  )
}

export default Home
