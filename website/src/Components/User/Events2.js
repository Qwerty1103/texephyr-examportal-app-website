import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import "./events2.css"
import Navbar from './Navbar'
import axios from 'axios'
import { USERAPIURL } from '../Constants'
import EventGenerator from './EventGenerator'
import Footer from './Footer'
import Ballpit from './Ballpit'
function Events2() {
    const[events, setEvents] = useState([]);
    const BallpitBox = <Ballpit />
    useEffect(() => 
    {
        fetchEvents("CSE")
    },[])


    function fetchEvents(dept) 
    {
        axios(
            {
              method: "POSt",
              url: USERAPIURL + "getEvents",
              data: { "dept": dept }
            }
          )
            .then((response) => {
              setEvents(response.data.events)
            }
            )
            .catch((err) => { console.log(err) })
    }

    return (
        <>
        <Navbar />
        <section className='joining-section'>
            <div className='container pt-3'>
                <div className='row'>
                    <div className='col-md-7'>
                        <h1 className='eventHead'>
                            TEXEPHYR 2023 <br /> Events
                        </h1>
                        <h6 className='eventDates'>
                            25 April - 26 April
                        </h6>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-7'>
                        <div className='depts'>
                            <Button onClick={() => fetchEvents("CSE")} className='dept'>CSE</Button>
                            <Button onClick={() => fetchEvents("MECH")} className='dept'>MECH</Button>
                            <Button onClick={() => fetchEvents("EE")} className='dept'>EE</Button>
                        </div>
                        <div className='scrolling scrolling-events'>
                            <EventGenerator events = {events} />
                        </div>
                    </div>
                    <div className='ballpit-hiding col-lg-5'>
                        <Ballpit />
                    </div>
                </div>
            </div>
        </section>
        <Footer />
        </>
    )
}

export default Events2

/* test */