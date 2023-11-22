import React from 'react';
import AddToCart from './AddToCart';
import "./eventDesc.css";
function EventDesc(props) { 
  return (
    <>
    <div className='eventsDesc'>
      <div className='eventDescContent'>
        <div className='eventDetailsContainer'>
          <div className="eventDetails">
            Event Details
          </div>
          <div dangerouslySetInnerHTML={{ __html: props.event.details }} className="eventDetailsContent"></div>
          
          </div>
        <div className='rectangle-136'></div>
        <div className='rectangle-137'>
          <div className='eventDescName'>{props.event.name}</div>
          <div className='eventDesc'>{props.event.desc}</div>
        </div>
        <AddToCart event = {props.event}/>
      </div>
      <div className='eventDescContentMobile'>
        <div className="descUp">

        <div className='eventDetailsContainer'>
          <div className="eventDetails">
            Event Details
          </div>
          <div dangerouslySetInnerHTML={{ __html: props.event.details }} className="eventDetailsContent"></div>
          
          </div>
        <div className='rectangle-136'></div>
        <div className='rectangle-137'>
          <div className='eventDescName'>{props.event.name}</div>
          <div className='eventDesc'>{props.event.desc}</div>
        </div>
        </div>
        <AddToCart event = {props.event}/>
      </div>
    </div>
    </>
  )
}

export default EventDesc;
//