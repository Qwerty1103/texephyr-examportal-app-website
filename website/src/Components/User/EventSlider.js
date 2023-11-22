
import React, { useEffect, useState } from "react";
import "./eventSlider.css";


const EventSlider = () => {



  return (
    <>
     <section className='e-section bg-light'>
        <div class="container-fluid">
          <div class="card image-wrapper bg-full bg-image bg-overlay bg-overlay-light-500 pb-15">
            <div class="card-body py-14 px-0">
              <div class="container">
                <div class="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0">
                  <div class="col-lg-4 text-center text-lg-start">
                    <h3 class="display-4 mb-3 pe-xxl-15">WHY YOU SHOULD JOIN OUR EVENTS</h3>
                    {/* <p class="lead fs-lg mb-0 pe-xxl-10">We bring solutions to make life easier for our customers.</p> */}
                  </div>
                  <div class="col-lg-8 mt-lg-2">
                    <div class="row align-items-center counter-wrapper gy-6 text-center">
                      <div class="col-md-4 mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256.1 256.01" data-inject-url="https://sandbox.elemisthemes.com/assets/img/icons/solid/target.svg" class="svg-inject icon-svg icon-svg-sm solid-duo text-grape-fuchsia mb-3"><path class="fill-secondary" d="M178.66 79.37L166.93 91.1a76.68 76.68 0 014.91 11.52 85.77 85.77 0 0114.93-1.28h1.39a93.65 93.65 0 00-9.5-21.97zM0 128a96.1 96.1 0 00109.65 95 82.93 82.93 0 01-5.65-15.42 67 67 0 01-8 .43A80 80 0 0196 48a79 79 0 0137 9.17l11.73-11.73A94.73 94.73 0 0096 32a96.14 96.14 0 00-96 96z"></path><path class="fill-secondary" d="M37.33 128A58.78 58.78 0 0096 186.68a47.26 47.26 0 005.44-.32A82.71 82.71 0 01103 170a37.32 37.32 0 01-7 .64 42.67 42.67 0 010-85.34 32.88 32.88 0 018 .84l12.91-12.91a57 57 0 00-20.91-4A58.81 58.81 0 0037.33 128z"></path><path class="fill-secondary" d="M96 106.68A21.33 21.33 0 10117.33 128 21.39 21.39 0 0096 106.68zm0 26.66a5.33 5.33 0 115.33-5.33 5.28 5.28 0 01-5.33 5.33z"></path><path class="fill-primary" d="M96.1 136a8 8 0 01-5.67-13.65L159.76 53a8 8 0 0111.31 11.31l-69.33 69.33A8 8 0 0196.1 136z"></path><path class="fill-primary" d="M194.77 64H168.1a8 8 0 01-8-8V29.34a8.08 8.08 0 012.33-5.67l21.33-21.33A8 8 0 01197.42 8v18.68h18.68a8 8 0 015.66 13.66l-21.33 21.33a8 8 0 01-5.66 2.33zm-8 53.34a69.34 69.34 0 1069.33 69.34 69.4 69.4 0 00-69.33-69.34zm29.87 56.11L182 210.78a8 8 0 01-11.09.64l-18.67-16a8 8 0 1110.41-12.15l12.84 11 29.44-31.69a8 8 0 0111.74 10.88z"></path></svg>
                        <h3 class="counter" style={{visibility: "visible"}}>50+</h3>
                        <p class="mb-0 counter-subtitle">Total Workshops</p>
                      </div>
                      <div class="col-md-4 mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 245.34" data-inject-url="https://sandbox.elemisthemes.com/assets/img/icons/solid/bar-chart.svg" class="svg-inject icon-svg icon-svg-sm solid-duo text-grape-fuchsia mb-3"><path class="fill-secondary" d="M32 106.67A10.67 10.67 0 0124.91 88l48-42.67a10.62 10.62 0 018.37-2.61l83 10.07 47-44.56A10.66 10.66 0 01226 23.74l-50.67 48a10.73 10.73 0 01-8.61 2.85L83.49 64.5 39.09 104a10.61 10.61 0 01-7.09 2.7z"></path><path class="fill-secondary" d="M226.67 53.34A8 8 0 01221 51l-37.32-37.34A8 8 0 01189.33 0h37.33a8 8 0 018 8v37.33a8 8 0 01-4.95 7.39 7.66 7.66 0 01-3.04.62z"></path><path class="fill-primary" d="M74.67 184v29.33h-64V184A13.33 13.33 0 0124 170.67h37.33A13.34 13.34 0 0174.67 184zM160 120v93.33H96V120a13.33 13.33 0 0113.33-13.33h37.33A13.33 13.33 0 01160 120zm85.33 21.34v72h-64v-72A13.32 13.32 0 01194.66 128H232a13.31 13.31 0 0113.33 13.34z"></path><path class="fill-secondary" d="M248 245.34H8a8 8 0 010-16h240a8 8 0 010 16z"></path></svg>
                        <h3 class="counter" style={{visibility: "visible"}}>19</h3>
                        <p class="mb-0 counter-subtitle">Events</p>
                      </div>
                      <div class="col-md-4 mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" data-inject-url="https://sandbox.elemisthemes.com/assets/img/icons/solid/employees.svg" class="svg-inject icon-svg icon-svg-sm solid-duo text-grape-fuchsia mb-3"><path class="fill-secondary" d="M72.11 86.51l-3.52-21 1.41-1.4-4.36-4.48a24.12 24.12 0 01-5.78-24.43c.11-.32.2-.53.32-.85l-1.4-.21-9-18.88a8 8 0 00-14.49 0l-8.88 19-19.69 3.07a8 8 0 00-6.29 5.44 7.94 7.94 0 001.92 8.11l14.51 14.83-3.42 21A8.07 8.07 0 0021.33 96a8.33 8.33 0 004-1l17.49-9.81 17.6 9.6a8.2 8.2 0 008.53-.43 8 8 0 003.21-7.89zm183.46-44.06a7.85 7.85 0 00-6.4-5.33l-19.73-3-9-18.88a8 8 0 00-14.5 0l-8.86 19-1.17.21c0 .11.11.21.11.32a23.76 23.76 0 01-5.44 24.32L185.81 64l1.71 1.71-3.41 21A8.07 8.07 0 00192 96a8.33 8.33 0 004-1l17.49-9.81 17.6 9.6a8.2 8.2 0 008.53-.43 8.06 8.06 0 003.2-7.89l-3.52-21 14.51-14.92a8.09 8.09 0 001.81-8.13z"></path><path class="fill-primary" d="M100.18 106.67a8 8 0 01-7.91-9.25l4.61-28.8L77 48.37a8 8 0 014.46-13.51l27.09-4.22 12.11-26a8 8 0 017.2-4.64 8 8 0 017.23 4.58l12.29 25.9 27.12 4.05A8 8 0 01179.09 48l-19.78 20.38 4.8 28.77a8 8 0 01-11.74 8.34l-24.19-13.25-24.12 13.42a7.94 7.94 0 01-3.88 1z"></path><circle class="fill-secondary" cx="42.67" cy="160" r="21.33"></circle><path class="fill-secondary" d="M71.15 196.27A44.71 44.71 0 0053.34 232v2.67H8a8.06 8.06 0 01-8-8v-5.33A29.32 29.32 0 0129.33 192H56a29.13 29.13 0 0115.15 4.27z"></path><circle class="fill-secondary" cx="213.33" cy="160" r="21.33"></circle><path class="fill-secondary" d="M256 221.33v5.33a8.07 8.07 0 01-8 8h-45.33V232a44.69 44.69 0 00-17.81-35.73A29.07 29.07 0 01200 192h26.67A29.32 29.32 0 01256 221.33z"></path><circle class="fill-primary" cx="128" cy="154.67" r="32"></circle><path class="fill-primary" d="M157.33 202.67H98.66A29.35 29.35 0 0069.33 232v16a8 8 0 008 8h101.33a8 8 0 008-8v-16a29.35 29.35 0 00-29.33-29.33z"></path></svg>
                        <h3 class="counter" style={{visibility: "visible"}}>2000+</h3>
                        <p class="mb-0 counter-subtitle">Footfall</p>
                      </div>
                    </div>
                    
                  </div>
                </div>
                
              </div>
              
            </div>
            
          </div>
          
        </div>
        <div class="container">
        <div class="grid mb-18">
          <div class="row isotope gy-6 mt-n18 event-distance">
            <div class="item col-md-6 col-xl-4 mb-5" >
              <div class="card shadow-lg card-border-bottom border-soft-primary">
                <div class="card-body custom-body managecontent" >
                  <blockquote class="border-0 mb-0">
                  <div class="blockquote-details">
                      <div class="info ps-0">
                      <h5 class="mb-3" style={{fontWeight:"bold"}}>Build Your Network</h5>
                      </div>
                    </div>
                    <p className="CardContent">Texephyr provides tools and resources for networking, such as webinars and networking events, which can help you expand your reach and build your professional brand. </p>
                    
                  </blockquote>
                </div>
                
              </div>
              
            </div>
            
            <div class="item col-md-6 col-xl-4 mb-5" >
              <div class="card shadow-lg card-border-bottom border-soft-primary">
                <div class="card-body custom-body managecontent">
                  <blockquote class="border-0 mb-0">
                  <div class="blockquote-details">
                      <div class="info ps-0">
                      <h5 class="mb-3" style={{fontWeight:"bold"}}>World Class Workshops</h5>
                      </div>
                    </div>
                  <p className="CardContent">Texephyr brings you world-class workshops that help you develop new interests or polish your existing skills. Join us in exploring the evolving world of technology.</p>
                    
                  </blockquote>
                </div>
                
              </div>
              
            </div>
            
            <div class="item col-md-6 col-xl-4 mb-5" >
              <div class="card shadow-lg card-border-bottom border-soft-primary">
                <div class="card-body custom-body managecontent" >
                  <blockquote class="border-0 mb-0">
                  <div class="blockquote-details">
                      <div class="info ps-0">
                        <h5 class="mb-3" style={{fontWeight:"bold"}}>Expert Endorsed Certificates</h5>
                        
                      </div>
                    </div>
                  <p className="CardContent">Step Up Your Game with certificates provided by Established companies and experts. At Texephyr, each participant is presented with a certificate of excellence for their efforts.</p>
                   
                  </blockquote>
                </div>
                
              </div>
              
            </div>
            
            
          </div>
          
        </div>
      </div>
      </section>
    </>
  );
};

export default EventSlider;
