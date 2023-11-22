import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { USERAPIURL } from '../Constants'
import RemoveFromCart from './RemoveFromCart'

function CartCard(props) {

  const [event, setEvent] = useState({})

  useEffect(() => {
    axios(
      {
        method: "POSt",
        url: USERAPIURL + "getEventById",
        data: { "id": props.event }
      }
    )
      .then((response) => {
        setEvent(response.data.event[0  ])
      }
      )
      .catch((err) => { console.log(err) })
  }, [])

  return (
    <div>
      <div className="cartCardContainer">
        <div className="inside">
          <div className="event-detail-body">
            <h3>{event.name}</h3>
            <p className='cartCardEventDesc'>
              {event.desc}
            </p>
          </div>
          <div className="price-body notInPhone">
            <h3>{event.fees} Rs</h3>
          </div>
        </div>
        <div className="phoneView">
          <div className="price-body inPhone">
              <h3>{event.fees} Rs</h3>
          </div>
          <RemoveFromCart event = {event}/>
        </div>
        <div className="notInPhone">
          <RemoveFromCart event = {event}/>
        </div>
      </div>
    </div>
  )
}

export default CartCard

//