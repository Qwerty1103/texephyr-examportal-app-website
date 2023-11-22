import React, { useEffect , useState } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from "react-bootstrap";
import Navbar from './Navbar';
import { USERAPIURL } from "../Constants";

function Demo() {
  const [userDetail, setUserDetail] = useState('')

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
            alert(err.response.data.error);
        })
    }
  }, [])

  console.log(userDetail)

  const payNow = () => {

    const data = {
      purpose: 'Registration payment',
      amount: '100',
      buyer_name: userDetail.name,
      email: userDetail.email,
      phone: userDetail.phone,
      user_id: userDetail._id,
      redirect_url: `http://localhost:5000/api/webuser/callback?user_id=${userDetail._id}`,
      wehbook_url: '/wehbook/',
    };
    console.log(data);

    axios.post( USERAPIURL+'pay', data )
			.then( res => {
				console.log( 'resp', res.data );
				window.location.href = res.data;
			})
			.catch( ( error ) => console.log( error.response.data ) );

  };

  return(
    <>
    <Navbar />
    <div className='eventsDesc'>
      <Button className="paybtn" onClick={payNow}>Buy Now</Button>
    </div>
    </>
  )
}

export default Demo