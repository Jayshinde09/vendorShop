import './UserDashboard.css';
import { Context } from '../../utils/Context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserDashboard(){
    const {loginInfo} = useContext(Context);

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

    useEffect(()=>{
        counterFunc();
    }, [orders])

    useEffect(() => {
        getUsersFunc();
    }, [])

    return(
        <>
        {
        (loginInfo.status===true)&&(loginInfo.role)==="User"?
            <div className="admin-panel-main-div">
                <div className="admin-panel-box">
                    <div className="admin-panel-heading">User Dashboard</div>
                    <div className="admin-panel-options-div">
                        <Link to='/userdashboard/profile' className="admin-panel-options">Profile Details</Link>
                        <Link to='/userdashboard/edit' className="admin-panel-options">Edit Profile</Link>
                        <Link to='/userdashboard/manageorders' className="admin-panel-options">View Orders</Link>
                        <Link to='/userdashboard/notifications' className="admin-panel-options">Notification ({count?count:0})</Link>
                    </div>
                </div>
            </div>
            : <div className="unauth-msg-div">Please Login as User</div>
        }
        </>
    )
}
export default UserDashboard;