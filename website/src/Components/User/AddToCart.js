import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { USERAPIURL } from '../Constants';
import { useNavigate } from 'react-router-dom'
import './addToCart.css'
import Form4 from './Form4';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Form3 from './Form3';
import Form2 from './Form2';
import Form5 from './Form5';
import { toast } from 'react-hot-toast';

function AddToCart(props) {
    const navigate = useNavigate()

    const [disabled, setDisabled] = useState(false)
    const [btntext, setBtntext] = useState("Add To Cart")
    const [show, setShow] = useState("show")
    const [userid, setUserid] = useState("")

    const [visible, setVisible] = useState(false)

    const showForm = () => {
        setVisible(true);
    }

    const hideForm = () => {
        setVisible(false);
    }


    const onClickHandler = () => {
        if (!localStorage.getItem('userToken')) {
            navigate("/login", { state: { path: window.location.href } })
        }
        else {
            axios.get(USERAPIURL + 'getUser',
                { headers: { "Authorization": `${localStorage.getItem('userToken')}` } })
                .then((response) => {
                    const users = [response.data.currentUser._id]
                    setUserid(response.data.currentUser._id)
                    axios(
                        {
                            method: "POST",
                            url: USERAPIURL + "checkID",
                            data: { userid: response.data.currentUser._id, eventid: props.event._id }
                        }
                    ).then(async (response) => {
                        if (response.status === 400) {
                            toast.error("You Have Already Registered For This Event")
                        }
                        else {
                            if (props.event.entries === 1) {
                                const cartItems = await JSON.parse(localStorage.getItem('cart'))
                                if (cartItems) {
                                    const newCartItem = {
                                        event: props.event._id,
                                        users: users
                                    }
                                    const total = Number(localStorage.getItem('total'))
                                    localStorage.setItem('total', total + Number(props.event.fees))
                                    const done = cartItems.push(newCartItem)
                                    if (done) {
                                        localStorage.setItem('cart', JSON.stringify(cartItems))
                                        initial()
                                    }
                                    toast.success("Added to Cart")
                                }
                                else {
                                    const cartItems = [];
                                    const total = Number(props.event.fees);
                                    localStorage.setItem('total', total)
                                    const newCartItem = {
                                        event: props.event._id,
                                        users: users
                                    }
                                    const done = cartItems.push(newCartItem)
                                    if (done) {
                                        localStorage.setItem('cart', JSON.stringify(cartItems))
                                    }
                                    initial()
                                    toast.success("Added to Cart")
                                }
                            }
                            else {
                                showForm();
                                initial();
                            }
                        }
                    }).catch((err) => {
                        toast.error(err.response.data.message)
                    })
                }).catch((err) => {
                    if (err.response.status === 403) {
                        localStorage.removeItem('userToken')
                        navigate("/login", { state: { path: window.location.href } })
                    }
                    else
                        toast.error(err.response.data.error);
                })
        }
    }

    async function initial() {
        const cartItems = await JSON.parse(localStorage.getItem('cart'))
        
        if(props.event.status === false)
        {
            setDisabled(true)
            setBtntext("Not Available")
        }
        else if (cartItems) {
            cartItems.forEach(element => {
                if (element.event === props.event._id) {
                    setDisabled(true)
                    setBtntext("Added to Cart")
                }
            });
        }
        else {
            setDisabled(false)
            setBtntext("Add To Cart")
        }
    }

    useEffect(() => {
        initial()
    }, [])

    if (props.event.entries === 4) {
        return (
            <div >
                <div className="container addBtncontainerMobile my-3">
                    <div className="formPopup">
                        <Rodal customStyles={{
                            borderRadius: '20px', background: 'transparent'
                            , width: '40vw', height: '70vh'
                        }} visible={visible} onClose={hideForm}>
                            <Form4 initial={initial} close={hideForm} userid={userid} eventid={props.event._id} eventPrice={props.event.fees} />
                        </Rodal>
                    </div>
                    <button onClick={onClickHandler} disabled={disabled} type="button" className={`addCart-btn responsiveBtn ${show}`}>{btntext}</button>
                </div>
            </div>
        )
    }
    else if (props.event.entries === 3) {
        return (
            <div >
                <div className="container addBtncontainerMobile my-3">
                    <div className="formPopup">
                        <Rodal customStyles={{
                            borderRadius: '20px', background: 'transparent'
                            , width: '40vw', height: '70vh'
                        }} visible={visible} onClose={hideForm}>
                            <Form3 initial={initial} close={hideForm} userid={userid} eventid={props.event._id} eventPrice={props.event.fees} />
                        </Rodal>
                    </div>
                    <button onClick={onClickHandler} disabled={disabled} type="button" className={`addCart-btn responsiveBtn ${show}`}>{btntext}</button>
                </div>
            </div>
        )
    }
    else if (props.event.entries === 2) {
        return (
            <div >
                <div className="container addBtncontainerMobile my-3">
                    <div className="formPopup">
                        <Rodal customStyles={{
                            borderRadius: '20px', background: 'transparent'
                            , width: '40vw', height: '70vh'
                        }} visible={visible} onClose={hideForm}>
                            <Form2 initial={initial} close={hideForm} userid={userid} eventid={props.event._id} eventPrice={props.event.fees} />
                        </Rodal>
                    </div>
                    <button onClick={onClickHandler} disabled={disabled} type="button" className={`addCart-btn responsiveBtn ${show}`}>{btntext}</button>
                </div>
            </div>
        )
    }
    else if (props.event.entries === 5) {
        return (
            <div >
                <div className="container addBtncontainerMobile my-3">
                    <div className="formPopup">
                        <Rodal customStyles={{
                            borderRadius: '20px', background: 'transparent'
                            , width: '40vw', height: '70vh'
                        }} visible={visible} onClose={hideForm}>
                            <Form5 initial={initial} close={hideForm} userid={userid} eventid={props.event._id} eventPrice={props.event.fees} />
                        </Rodal>
                    </div>
                    <button onClick={onClickHandler} disabled={disabled} type="button" className={`addCart-btn responsiveBtn ${show}`}>{btntext}</button>
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div >
                <div className="container addBtncontainerMobile my-3">
                    <button onClick={onClickHandler} disabled={disabled} type="button" className={`addCart-btn responsiveBtn ${show}`}>{btntext}</button>
                </div>
            </div>
        )
    }
} 

export default AddToCart;