import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import '../AdminPanel/AdminPanel.css';
import { Context } from '../../utils/Context';

function OrderCard({ order, getUsersFunc }) {

    const [labours, setLabours] = useState([]);
    const [loginStatus, setLoginStatus] = useState();
    const { loginInfo } = useContext(Context);

    async function getLaboursFunc() {
        await axios.get(process.env.REACT_APP_BASE_URL + '/labour/labours').then(res => {
            setLabours(res.data);
        })
    }

    async function acceptOrderFunc() {
        await axios.post(process.env.REACT_APP_BASE_URL + '/auth/acceptlabourorder', { orderid: order?.orderid, email: loginInfo?.email })
            .then(res => {
                setLoginStatus(res?.data?.message);
            })
            .catch(error => {
                console.log(error);
                setLoginStatus(error?.response?.data?.message);
            });
    }

    useEffect(() => {
        getLaboursFunc();
    }, [])

    return (
        <div key={order?.orderid} className="option-main-outer-box">
            <div className="user-name-title">{order?.title}</div>
            <div className="user-email-title">OrderID: {order?.orderid}</div>
            <div className="user-email-title">User: {order?.user}</div>
            <div className="user-mobile-title">Vendor: {order?.vendor}</div>
            <div className="user-mobile-title">Qty: {order?.qty}</div>
            <div className="user-mobile-title">Price: {order?.price}</div>
            {
                (order?.labour === false) ?
                    <div>
                        <button onClick={acceptOrderFunc} className="order-accept-btn">Accept Order</button>
                        {/* <button className="order-accept-btn">Reject Order</button> */}
                    </div>
                    :
                    <></>

            }
            <div className="login-status-div">{loginStatus}</div>
        </div>
    )
}

export default OrderCard;