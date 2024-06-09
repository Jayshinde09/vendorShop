import "./Header.css";
import {Link} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../utils/Context";
import Logo from '../../assets/logo.png';
import axios from "axios";
import { IoIosNotifications } from "react-icons/io";

function Header(){

    const {loginInfo} = useContext(Context);

    function logoutFunc(){
        window.location.reload();
    }

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

    useEffect(() => {
        counterFunc();
    }, [orders])

    useEffect(() => {
        getUsersFunc();
    }, [])
    

    return(
        <div className="header-main-div">
            <div className="top-nav">
                <span className="top-nav-text"><Link className="top-nav-text" to={'/userdashboard'}> Hello, {loginInfo.status? loginInfo.name : "Guest"}</Link>  {loginInfo.status? <Link to='/userdashboard/notifications'><span className="notify-icon-div"> <IoIosNotifications className="notify-icon"/> ({count?count:0})</span></Link> : ""}</span>
                <div className="top-nav-links-div">
                    <ul>
                        {
                            !loginInfo?.status ? 
                                <>
                                    <li><Link to={'/login'} className="top-nav-links">User Login</Link></li>
                                    <li><Link to={'/admin'} className="top-nav-links">Admin Login</Link></li>
                                    <li><Link to={'/labour/login'} className="top-nav-links">Labour Login</Link></li>
                                </>
                            : ((loginInfo?.role === "User") ?  
                                <>
                                    <li><Link to={'/userdashboard'} className="top-nav-links">User Dashboard</Link></li>
                                    <li><Link to={'/cart'} className="top-nav-links">View Cart</Link></li>
                                    <li><Link onClick={logoutFunc} className="top-nav-links">Logout</Link></li>
                                </>
                                : (loginInfo?.role === "Admin") ?
                                <>
                                    <li><Link to={'/adminpanel'} className="top-nav-links">Admin Panel</Link></li>
                                    <li><Link onClick={logoutFunc} className="top-nav-links">Logout</Link></li>
                                </> : 
                                <>
                                    <li><Link to={'/labour/panel'} className="top-nav-links">Labour Panel</Link></li>
                                    <li><Link onClick={logoutFunc} className="top-nav-links">Logout</Link></li>
                                </> )
                        }
                    </ul>
                </div>
            </div>
            <div className="main-nav">
                <Link to='/'>
                    <img src={Logo} alt="" className="nav-logo-img"/>
                    <span className="main-nav-heading">Hindustan - Ceramic</span>
                </Link>
                <ul>
                    <li><Link to={'/'} className="main-nav-links">Home</Link></li>
                    <li><Link to={'/products'} className="main-nav-links">Products</Link></li>
                    <li><Link to={'/about'} className="main-nav-links">About Us</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;