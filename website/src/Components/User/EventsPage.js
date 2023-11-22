import React from 'react'
import AddToCart from './AddToCart'
import Navbar from './Navbar'
/* test */
function EventsPage() {
  return (
    <div>
      <Navbar />
      <AddToCart eventid = "123456" mitPrice = "100" nonMitPrice = "150"/>
    </div>
  )
}

export default EventsPage
