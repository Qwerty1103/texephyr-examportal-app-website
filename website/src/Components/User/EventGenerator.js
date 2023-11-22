import React from 'react'
import EventCard from './EventCard'

function EventGenerator(props) {
    const {events} = props;

    const eventList = events.map((event) => (
        <EventCard key={event._id} event={event}/>
      ));

    return (
        <>
            {eventList}
        </>
    )
  
}

export default EventGenerator
//