import axios from 'axios';
import React, { useState , useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { FRONTENDURL, USERAPIURL } from '../Constants';
import './cart.css'
import CartCard from './CartCard';
import Navbar from './Navbar'
import Footer from './Footer';

function Cart() {

  const [userDetail, setUserDetail] = useState('')
  const [reference, setReference] = useState('')

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      axios.get(USERAPIURL + 'getUser',
        { headers: { "Authorization": `${localStorage.getItem('userToken')}` } })
        .then((response) => {
          setUserDetail(response.data.currentUser);
         })
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.removeItem('userToken')
          }
          else
            toast.error(err.response.data.error);
        })
    }
  }, [])

  const proceed = () =>
  {
    const details = JSON.parse(localStorage.getItem('cart'))
    const total = Number(localStorage.getItem('total'))
      
    const data = {
      purpose: 'Registration Payment',
      amount: total,
      buyer_name: userDetail.name,
      email: userDetail.email,
      phone: userDetail.phone,
      user_id: userDetail._id,
      redirect_url: USERAPIURL + `callback?user_id=${userDetail._id}&amount=${total}&details=${JSON.stringify(details)}&ref=${reference}`,
      wehbook_url: '/wehbook/',
    };

    axios.post( USERAPIURL+'pay', data )
			.then( res => {
				window.location.href = res.data;
        localStorage.removeItem('cart');
			})
			.catch( ( error ) => console.log( error.response.data ) );
  }

  if(localStorage.getItem('cart'))
  {
    const cartItems = JSON.parse(localStorage.getItem('cart'))
    const total = JSON.parse(localStorage.getItem('total'))
    const cardsList = cartItems.map((element) => (
      <CartCard key={element.event} event = {element.event}/>
    ));


    return (
      <>
        <Navbar />
      <div className='cartPage'>
        <section className="section-card">
        <div className="container-cart">
          <h1 className="cart-heading">Cart</h1>
          <div className="referral">
          Reference ID (Optional) :
          <input onChange={(event) => setReference(event.target.value)} placeholder='Referral ID (Optional)' className="refEntry" />
          </div>
        </div>

        <div className="container-body">
          <div className=" headingsContainer border-top border-bottom">
            <div className="event-detail-box">
              <h2 className="event-detail-heading">Event Details</h2>
            </div>
            <div className="price-box">
              <h2 className="price-heading">Price</h2>
            </div>
          </div>
          {cardsList}
        </div>

        <div className="container-body margin-top-md">
          <div className="grid grid--cart-col grid-v-center amountNCheckout ">
            <p className="cart-total">Total Amount : {total}</p>
            <button onClick={proceed} type="button" className="cart-btn">Checkout</button>
          </div>
        </div>
      </section>
      </div>
      <Footer />
      </>

    )
  }
  else
  {
    return (
      <>
        <Navbar />
      <div className='cartPage'>
        <div className="emptyContainer">
          <h1 className="cart-heading">Cart is Empty &nbsp; : (</h1>
          <div className="emptySubtext">
          Please add Events you're interested in to the Cart
          </div>
        </div>
      </div>
      <Footer />
      </>
    )
  }
}

export default Cart;
//
