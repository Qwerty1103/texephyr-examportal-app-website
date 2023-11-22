import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { ADMINAPIURL } from '../Constants'
import EventCard from './EventCard'

function Events() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        axios.get(ADMINAPIURL + `fetchEvents`).then((response) => setEvents(response.data.events)).catch((err) => { console.log(err.response.data.error) })
    }, [])

    return(
        <div class="row row-cols-1 row-cols-md-3 g-2">
            {
                events.map((element) => (
                    <EventCard element = {element} key = {element.name}/>
                ))
            }   
        </div>
    )
}

export default Events
