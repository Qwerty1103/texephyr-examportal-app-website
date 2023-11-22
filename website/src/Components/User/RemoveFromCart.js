import React from 'react'
import { FRONTENDURL } from '../Constants';
import './remove.css'

function RemoveFromCart(props) {
/* test */
    const onClickHandler = async () => {
        const cartItems = await JSON.parse(localStorage.getItem('cart'))
        let total = Number(localStorage.getItem('total'))
        for(let i = 0; i<cartItems.length; i++)
        {
            if(cartItems[i].event === props.event._id)
                cartItems.splice(i, 1);
        }
        total = total - Number(props.event.fees);
        if(cartItems.length == 0)
        {
            localStorage.removeItem('cart')   
            localStorage.removeItem('total')   
            window.location.replace(FRONTENDURL + 'cart')
        }
        else
        {
            localStorage.setItem('cart', JSON.stringify(cartItems))
            localStorage.setItem('total', total)
            window.location.replace(FRONTENDURL + 'cart')
        }
    }

    return (
        <div>
            <div className="removeBtnContainer">
                <button onClick={onClickHandler} type="button" className="removeBtn">Remove</button>
            </div>
        </div>
    )
}
export default RemoveFromCart
