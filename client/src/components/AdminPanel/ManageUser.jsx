import './AdminPanel.css';
import { Context } from '../../utils/Context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function Manageuser(){
    
    const {loginInfo} = useContext(Context);
    const [users, setUsers] = useState([]);

    async function getUsersFunc(){
        await axios.get(process.env.REACT_APP_BASE_URL+'/auth/users').then(res=>{
            setUsers(res.data);
        })
    }

    useEffect(()=>{
        getUsersFunc();
    }, [])

    return(
        <>
        {
        (loginInfo.status===true)&&(loginInfo.role)==="Admin"?
            <div className="admin-panel-main-div">
                <div className="admin-panel-box">
                    <div className="admin-panel-heading">All Users</div>
                    <div className="admin-panel-div-box">
                        {users?.data?.map((elm=>(
                            <div key={elm?.email} className="option-main-outer-box">
                                <div className="user-name-title">{elm?.name}</div>
                                <div className="user-email-title">{elm?.email}</div>
                                <div className="user-mobile-title">{elm?.mobile}</div>
                            </div>
                        )))}
                    </div>
                </div>
            </div>
            : <div className="unauth-msg-div">Please Login as Admin</div>
        }
        </>
    )
}
export default Manageuser;