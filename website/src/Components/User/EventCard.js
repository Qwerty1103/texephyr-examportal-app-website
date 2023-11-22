import React, { useState } from 'react'

import Rodal from 'rodal';

import 'rodal/lib/rodal.css';

import EventDesc from './EventDesc'

function EventCard(props) { //Make Boxes Scrollable for Large Content

    const [visible, setVisible] = useState(false)

    const show = () => {
        setVisible(true);
    }

    const hide = () => {
        setVisible(false);
    }

    const name = props.event.name;
    const desc = props.event.desc;
    const date = props.event.date;
    let calDate = new Date(date);
    let day = calDate.toLocaleString('en-us', { weekday: 'long' });
    return (
        <>
            <div className='event'>
                <div className='left'>
                    <h1 className='eventsH1 eventNonMobile'>{calDate.getDate()}</h1>
                    <h1 className='eventsH1 eventMobile'>{calDate.getDate()}</h1>
                    <div className="day">
                        {day.substring(0,3)}
                    </div>
                </div>
                <div className='right'>
                    <h2 className='eventName'>{name}</h2>
                    <div className="eventCardDesc">
                        {desc}
                    </div>
                    <button onClick={show} type='button' className='t1 smolBtn responsiveBtn'>Know More</button>
                    <Rodal customStyles={{
                        borderRadius: '20px', background: 'radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 90.2%)'
                        , width: '90vw', height: '90vh'
                    }} visible={visible} onClose={hide}>
                        <EventDesc event={props.event} />
                    </Rodal>
                </div>
            </div>
            <hr className='eventHr' />
        </>
    )
}
//
export default EventCard