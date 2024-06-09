import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

function OrderCard({ order, getUsersFunc }) {

    const [labours, setLabours] = useState([]);
    const labourSelectField = useRef();
    const [loginStatus, setLoginStatus] = useState();

    async function acceptOrders(orderid) {
        await axios.post(process.env.REACT_APP_BASE_URL + '/auth/acceptorder', { orderid }).then(res => {
            getUsersFunc();
        }).catch(error => { console.log(error) });

    }

    async function getLaboursFunc() {
        await axios.get(process.env.REACT_APP_BASE_URL + '/labour/labours').then(res => {
            setLabours(res.data);
        })
    }

    async function assignLabourFunc() {
        await axios.post(process.env.REACT_APP_BASE_URL + '/auth/assignlabour', { email: labourSelectField.current.value, order })
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
            <div className="user-mobile-title">Status: {order?.status ? "Accepted" : "Pending"}</div>
            {
                order?.labour ?
                    <div>
                        {!order?.status ? <button onClick={() => acceptOrders(order?.orderid)} className="order-accept-btn">Accept Order</button> : ""}
                    </div>
                    :
                    <>
                        <select ref={labourSelectField} className="dropdown-list">
                            {labours?.data?.map((elm) => (
                                <option key={elm.email} value={elm.email}>{elm.name}, ({elm.email})</option>
                            ))}
                        </select>
                        <div>
                            <button onClick={assignLabourFunc} className="order-accept-btn">Assign Labour</button>
                        </div>
                    </>
            }
            <div className="login-status-div">{loginStatus}</div>
        </div>
    )
}

export default OrderCard;