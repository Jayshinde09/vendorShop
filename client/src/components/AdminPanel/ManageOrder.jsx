import "./AdminPanel.css";
import { Context } from '../../utils/Context';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import OrderCard from "./OrderCard";

function ManageOrder() {

    const { loginInfo } = useContext(Context);
    const [orders, setOrders] = useState([]);

    async function getUsersFunc() {
        await axios.get(process.env.REACT_APP_BASE_URL + '/auth/allorders').then(res => {
            setOrders(res.data);
        })
    }

    useEffect(() => {
        getUsersFunc();
    }, [])

    return (
        <>
            {
                (loginInfo.status === true) && (loginInfo.role) === "Admin" ?
                    <div className="admin-panel-main-div">
                        <div className="admin-panel-box">
                            <div className="admin-panel-heading">Manage Orders</div>
                            <div className="admin-panel-div-box">
                                {orders?.data?.orders?.map((order) => (
                                    <OrderCard key={order?.orderid} order={order} getUsersFunc={getUsersFunc}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    : <div className="unauth-msg-div">Please Login as Admin</div>
            }
        </>
    )
}
export default ManageOrder;