import './UserDashboard.css';
import { Context } from '../../utils/Context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function Notification() {
    const { loginInfo } = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [count, setCount] = useState(0);

    function counterFunc(){
        let newOrders = orders?.data?.orders?.filter((order) => {
            return order?.status === true && order?.read === false
        })
        setCount(newOrders?.length);
    }

    async function getUsersFunc() {
        await axios.post(process.env.REACT_APP_BASE_URL + '/auth/vieworders', { email: loginInfo?.email }).then(res => {
            setOrders(res.data);
        })
    }

    async function readNotification(orderid){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/notification', {orderid}).then(res=>{
            getUsersFunc();
        }).catch(error=>{console.log(error)});

    }

    useEffect(()=>{
        counterFunc();
    }, [orders])

    useEffect(() => {
        getUsersFunc();
    }, [])

    return (
        <>
            {
                (loginInfo.status === true) && (loginInfo.role) === "User" ?
                    <div className="admin-panel-main-div">
                        <div className="admin-panel-box">
                            <div className="admin-panel-heading">Notification ({count?count:0})</div>
                            <div className="admin-panel-div-box">
                                {orders?.data?.orders?.map((order) => (
                                    <>
                                        {(order?.status && order?.read === false) ?
                                            <div key={order?.orderid} className="option-main-outer-box">
                                                <div className="user-name-title">{order?.title}</div>
                                                <div className="user-email-title">OrderID: {order?.orderid}</div>
                                                <div className="user-mobile-title">Vendor: {order?.vendor}</div>
                                                <div className="user-mobile-title">Qty: {order?.qty}</div>
                                                <div className="user-mobile-title">Price: {order?.price}</div>
                                                <div className="user-mobile-title-status">Status: {order?.status ? "Accepted" : "Pending"}</div>
                                                <div>
                                                    {!order?.read ? <button onClick={()=>readNotification(order?.orderid)} className="order-accept-btn">Mark as Read</button> : ""}
                                                </div>
                                            </div>
                                            : <></>}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                    : <div className="unauth-msg-div">Please Login as User</div>
            }
        </>
    )
}
export default Notification;