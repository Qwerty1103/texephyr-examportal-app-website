import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { USERAPIURL } from '../Constants';
import approved from "../images/approved.png"
import './texID_form.css';

const Form4 = (props) => {
  const [id, setid] = useState({ idArray: ["", "", ""] })
  const [checkmarks, setCheckMarks] = useState(["hide", "hide", "hide"])
  const [disableBtn, setDisableBtn] = useState(true);
  const [count, setCount] = useState({ countArray: [1, 1, 1] })
  const [preDone, setpreDone] = useState('show')
  const [done, setDone] = useState('hide')

  let formData = new FormData()

  useEffect(() => {
    let compareArray = JSON.stringify(count.countArray)
    // if (id.idArray.includes('')) {
    //   setpreDone('show')
    //   setDone('hide')
    //   setDisableBtn(true)
    // }
    if (compareArray.includes(0)) {
      // setpreDone('hide')
      // setDone('show')
      setDisableBtn(true)
    }
    else {
      setDisableBtn(false)
      setpreDone('show')
      setDone('hide')
      // setDisableBtn(true)
    }
  }, [count, id.idArray])

  const checkEmpty = (index) => 
  {
      let countArray = count.countArray
      if(id.idArray[index] === "")
      {
        countArray[index] = 1;
        setCount({ countArray });
      }
      else
      {
        countArray[index] = 0;
        setCount({ countArray });
      }
  }

  async function checkID(userid, index) {

    return new Promise((resolve, reject) => {
      let countArray = count.countArray

      if (userid === "") {
        return resolve(true);
      }
      else if (userid !== "" && userid === props.userid) {
        countArray[index] = 0;
        setCount({ countArray });
        return reject("ID of Logged In User shouldn't be Entered!");
      }
      else if ((!id.idArray.includes('')) && new Set(id.idArray).size !== id.idArray.length) {
        countArray[index] = 0;
        setCount({ countArray });
        setDisableBtn(true)
        return reject("Please check for Duplicate IDs");
      }
      else {
        axios(
          {
            method: "POST",
            url: USERAPIURL + "checkID",
            data: { userid: userid, eventid: props.eventid }
          }
        ).then(async (response) => {
          if (response.status === 200) {
            let newArr = [...countArray.slice(0, index), 1, ...countArray.slice(index + 1)];
            setCount({ countArray: newArr });
            let newcheckmarks = checkmarks;
            newcheckmarks[index] = "show"
            setCheckMarks(newcheckmarks)
            return resolve(true);
          }
          else {
            count[index] = 0;
            let newcheckmarks = checkmarks;
            newcheckmarks[index] = "hide"
            setCheckMarks(newcheckmarks)
            return reject("Internal Server Error");
          }
        }).catch((err) => {
          if (!err.response) {
            return reject(err);
          }
          else if (err.response.status === 400) {
            countArray[index] = 0;
            setCount({ countArray });
            let newcheckmarks = checkmarks;
            newcheckmarks[index] = "hide"
            setCheckMarks(newcheckmarks)
            return reject(`ID: ${userid} has already Registered For This Event`);
          }
          else if (err.response.status === 401) {
            countArray[index] = 0;
            setCount({ countArray });
            let newcheckmarks = checkmarks;
            newcheckmarks[index] = "hide"
            setCheckMarks(newcheckmarks)
            return reject(`ID: ${userid} is Wrong`);
          }
        })
      }
    }
    )

  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const idArray = id.idArray;
    idArray.unshift(props.userid)
    if (localStorage.getItem('cart')) {
      const cartItems = await JSON.parse(localStorage.getItem('cart'))
      const total = Number(localStorage.getItem('total'))
      localStorage.setItem('total', total + Number(props.eventPrice))
      const newCartItem = {
        event: props.eventid,
        users: idArray
      }
      cartItems.push(newCartItem)
      localStorage.setItem('cart', JSON.stringify(cartItems))
      setid({ idArray: ["", "", ""] })
      setCount({ countArray: [0, 0, 0] })
    }
    else {
      const cartItems = [];
      const total = Number(props.eventPrice);
      localStorage.setItem('total', total)
      const cartItem = {
        event: props.eventid,
        users: idArray
      }
      const done = cartItems.push(cartItem)
      if (done) {
        localStorage.setItem('cart', JSON.stringify(cartItems))
      }
      setid({ idArray: ["", "", ""] })
      setCount({ countArray: [0, 0, 0] })
    }
    props.initial();
    props.close();
    toast.success("Added to Cart")
  };

  return (
    <div className="IDForm__container">
      <h1>Fill Team Member Details</h1>
      <form id="ID-form" onSubmit={(event) => { event.preventDefault(); }}>
        <div className="IDForm__container-start">
          <div className="inputgrp">
            <div className="inputGrpLeft">

              <input
                id="ID_input"
                className="ID_text"
                type="text"
                placeholder="TEX ID of Member 2"
                onChange={(event) => {
                  let idArray = id.idArray
                  idArray[0] = event.target.value
                  setid({ idArray })
                  checkEmpty(0)
                  let newcheckmarks = checkmarks;
                  newcheckmarks[0] = "hide"
                  setCheckMarks(newcheckmarks)
                }}
                value={id.idArray[0]}
              />
              <img src={approved} className={`approvedImage ${checkmarks[0]}`} alt="" />
            </div>
            <button className="checkBtn" onClick={() => {
              checkID(id.idArray[0], 0).then((response) => {
                "OK"
              }
              ).catch((err) => {
                toast.error(err)
              });
            }}>Check</button>
          </div>
          <div className="inputgrp">
            <div className="inputGrpLeft">

              <input
                id="ID_input"
                className="ID_text"
                type="text"
                placeholder="TEX ID of Member 3"
                onChange={(event) => {
                  let idArray = id.idArray
                  idArray[1] = event.target.value
                  setid({ idArray })
                  checkEmpty(1)
                  let newcheckmarks = checkmarks;
                  newcheckmarks[1] = "hide"
                  setCheckMarks(newcheckmarks)
                }}
                value={id.idArray[1]}
              />
              <img src={approved} className={`approvedImage ${checkmarks[1]}`} alt="" />
            </div>
            <button className="checkBtn" onClick={() => {
              checkID(id.idArray[1], 1).then((response) => {
                "OK"
              }
              ).catch((err) => {
                toast.error(err)
              });
            }}>Check</button>
          </div>

          <div className="inputgrp">
            <div className="inputGrpLeft">

              <input
                id="ID_input"
                className="ID_text"
                type="text"
                placeholder="TEX ID of Member 4"
                onChange={(event) => {
                  let idArray = id.idArray
                  idArray[2] = event.target.value
                  setid({ idArray })
                  checkEmpty(2)
                  let newcheckmarks = checkmarks;
                  newcheckmarks[2] = "hide"
                  setCheckMarks(newcheckmarks)
                }}

                value={id.idArray[2]}
              />
              <img src={approved} className={`approvedImage ${checkmarks[2]}`} alt="" />
            </div>
            <button className="checkBtn" onClick={() => {
              checkID(id.idArray[2], 2).then((response) => {
                "OK"
              }
              ).catch((err) => {
                toast.error(err)
              });
            }}>Check</button>
          </div>


        </div>

        <div className="IDForm__container-end">
          <h1 className={`formMessage ${preDone} preDone`}>Please Check All IDs</h1>
          <h1 className={`formMessage ${done} done`}>Click Submit to Add Team</h1>
          <button className='IDFormSubmit' disabled={disableBtn} onClick={submitHandler} type="submit">SUBMIT</button>
          {/* <button className='IDFormSubmit' onClick={submitHandler} type="submit">SUBMIT</button> */}
        </div>
      </form>
    </div>
  );
};

export default Form4;