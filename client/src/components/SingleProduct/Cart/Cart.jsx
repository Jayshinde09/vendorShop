import "../SingleProduct.css";
import { Context } from "../../../utils/Context";
import { useContext, useEffect, useState} from "react";
import CartCard from "./CartCard";
import axios from "axios";

function Cart(){

    const {loginInfo, cart} = useContext(Context);
    const [loginStatus, setLoginStatus] = useState(undefined);
    const [total, setTotal] = useState(0);

    async function placeOrderFunc(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/order', {cart, email: loginInfo.email}).then(res=>{
            setLoginStatus("Order Placed Successfully");
        }).catch(error=>{
            setLoginStatus(error?.response?.data?.message);
        })
    }

    function calculatePrice(){
        let totalPrice = 0;
        cart.map((elm=>{
            totalPrice = totalPrice + (elm.price * elm.qty);
        }))
        setTotal(totalPrice);
    }

    useEffect(()=>{
        calculatePrice();
    }, [cart])

    return(
        <>
            <div className="page-title">Your Cart</div>
            <div className="single-product-main-div">
                {cart?.map((elm)=>(
                    <>
                        <CartCard id={elm?._id} key={elm?._id} title={elm?.title} image={elm?.image[0]} price={elm?.price} qty={elm?.qty}/>
                    </>
                ))}
                <div className="total-price-text">Total Price: ₹{total}/-</div>
            </div>
            <br />
            <div className="login-status-div">{loginStatus}</div>
            <div className="place-order-btn-div">
                <button onClick={placeOrderFunc} className="place-order-btn">Place Order</button>
            </div>
        </>
    )
}

export default Cart;