import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./events.css"
const Events = () => {
  return (
    <>
    <section className='events-section'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 mb-5'>
            <h1 className='joining-heading'>
              TEXEPHYR FEST <br/> EVENTS
            </h1>
          </div>
          <div className='col-lg-12'>
          <div className="row justify-content-center evContainer" style={{ "gap": "24px" }}>
              <div className="col-3">
                <Card className='eventCard'>
                  <Card.Body style={{ textAlign: "center", "padding": "3rem 2rem 2rem 2rem" }} >
                    <Card.Title className='eventcardheading mb-0 mt-2'>POWERPUFF CODERS</Card.Title>
                    <Card.Title className='eventcardtagline'>CSE</Card.Title>
                    <Card.Text className='eventcardcontent container__content-events'>
                      TEXEPHYR always believes in promoting technical culture. Today, women make up only 20% of
                      engineering graduates, and an even smaller number of the engineering workforce is made up of
                      women.
                    </Card.Text>
                  </Card.Body>

                  <span className="circle circle1"></span>
                </Card>
              </div>
              <div className="col-3">
                <Card className='eventCard'>
                  <Card.Body style={{ textAlign: "center", "padding": "3rem 2rem 2rem 2rem" }} >
                    <Card.Title className='eventcardheading mb-0 mt-2'>Cad Clash</Card.Title>
                    <Card.Title className='eventcardtagline'>MECH</Card.Title>
                    <Card.Text className='eventcardcontent container__content-events'>
                      Hand drafting?! Nah! If Sketching on screens is your type, then pick up this event. One can work with
                      either AUTOCAD or any open-source software. The event will be conducted in 2 rounds.
                    </Card.Text>
                  </Card.Body>

                  <span className="circle circle2"></span>
                </Card>
              </div>
              <div className="col-3">
                <Card className='eventCard'>
                  <Card.Body style={{ textAlign: "center", "padding": "3rem 2rem 2rem 2rem" }} >
                    <Card.Title className='eventcardheading mb-0 mt-2 '>Repair & Win</Card.Title>
                    <Card.Title className='eventcardtagline'>EE</Card.Title>
                    <Card.Text className='eventcardcontent container__content-events'>
                      This is going to be a core Electrical Competition.
                      This will be a circuit-based event which tests your circuit analysis skills.
                      Repair & Win, As the name suggests there will be a circuit you have to analyse, repair a faulty circuit and
                      you win.
                    </Card.Text>
                  </Card.Body>

                  <span className="circle circle3"></span>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-lg-12 d-flex justify-content-center padding-top-sm">
            <Link to="/events" className="t1 km2"> View All </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Events

//