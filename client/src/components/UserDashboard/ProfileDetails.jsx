import './UserDashboard.css';
import { Context } from '../../utils/Context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function ProfileDetails(){
    const {loginInfo} = useContext(Context);
    const [orders, setOrders] = useState([]);

    async function getUsersFunc(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/vieworders', {email: loginInfo?.email}).then(res=>{
            setOrders(res.data);
        })
    }

    useEffect(()=>{
        getUsersFunc();
    }, [])

    return(
        <>
        {
        (loginInfo.status===true)&&(loginInfo.role)==="User"?
            <div className="admin-panel-main-div">
                <div className="admin-panel-box">
                    <div className="admin-panel-heading">Profile Details</div>
                    <div className="admin-panel-div-box">
                        <div key={orders?.data?.email} className="option-main-outer-box">
                            <div className="user-name-title">Name: {orders?.data?.name}</div>
                            <div className="user-email-title">Email: {orders?.data?.email}</div>
                            <div className="user-mobile-title">Mobile: {orders?.data?.mobile}</div>
                            <div className="user-mobile-title">Address 1: {orders?.data?.address1}</div>
                            <div className="user-mobile-title">Address 2: {orders?.data?.address2}</div>
                            <div className="user-mobile-title">City: {orders?.data?.city}</div>
                            <div className="user-mobile-title">State: {orders?.data?.state}</div>
                            <div className="user-mobile-title">Pincode: {orders?.data?.pincode}</div>
                        </div>
                    </div>
                </div>
            </div>
            : <div className="unauth-msg-div">Please Login as User</div>
        }
        </>
    )
}
export default ProfileDetails;