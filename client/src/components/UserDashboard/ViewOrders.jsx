import './UserDashboard.css';
import { Context } from '../../utils/Context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import OrderBox from './OrderBox';

function ViewOrders(){
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
                    <div className="admin-panel-heading">View Orders</div>
                    <div className="admin-panel-div-box">
                        {orders?.data?.orders?.map((order)=>(
                            <OrderBox key={order?.orderid} order={order}/>
                        ))}
                    </div>
                </div>
            </div>
            : <div className="unauth-msg-div">Please Login as User</div>
        }
        </>
    )
}
export default ViewOrders;