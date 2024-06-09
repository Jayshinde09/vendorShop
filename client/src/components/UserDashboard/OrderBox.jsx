import './UserDashboard.css';
import { Context } from '../../utils/Context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function OrderBox({order}) {

    const [labour, setLabour] = useState([]);
    async function getLabourFunc(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/findlabour', {email: order?.labour}).then(res=>{
            setLabour(res.data.data[0]);
        })
    }

    useEffect(()=>{
        getLabourFunc();
    }, [])
    
    return (
        <div key={order?.orderid} className="option-main-outer-box">
            <div className="user-name-title">{order?.title}</div>
            <div className="user-email-title">OrderID: {order?.orderid}</div>
            <div className="user-mobile-title">Vendor: {order?.vendor}</div>
            <div className="user-mobile-title">Qty: {order?.qty}</div>
            <div className="user-mobile-title">Price: {order?.price}</div>
            <div className="user-mobile-title-status">Status: {order?.status ? "Accepted" : "Pending"}</div>
            {
                order?.labour ? 
                <>
                    <div className="user-mobile-title">Labour Name: {labour.name}</div>
                    <div className="user-mobile-title">Labour Email: {labour.email}</div>
                    <div className="user-mobile-title">Labour Mobile: {labour.mobile}</div>
                    <div className="user-mobile-title">Labour Vehicle No: {labour.vehicleNo}</div>
                </>
                : 
                <div className="user-mobile-title-status">Labour: Not Assigned</div>
            }

        </div>
    )
}
export default OrderBox;