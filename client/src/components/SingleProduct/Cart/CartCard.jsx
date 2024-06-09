import '../SingleProduct.css';
import { useState } from 'react';
import { Context } from '../../../utils/Context';
import { useContext } from 'react';

function CartCard({id, image, title, price, qty}){
    const {cart, setCart} = useContext(Context);

    function removeCartItemFunc(){
        const newCart = cart.filter(elm=>elm._id!==id);
        setCart(newCart);
    }

    return(
        <div className="cart-product-box">
            <div className="single-product-left-div">
                <img className="cart-product-img" src={image} alt="product-img" />
            </div>
            <div className="single-product-right-div">
                <div className="single-product-title">{title}</div>
                <div className="single-product-details">Price: <span className="single-product-price">₹{price}/-</span></div>
                <div className="single-product-qty-div">
                    <span className="cart-qty-text">Quantity: {qty}</span>
                    <button onClick={removeCartItemFunc} className="remove-from-cart-btn">Remove</button>
                </div>
            </div>
        </div>
    )
}

export default CartCard;