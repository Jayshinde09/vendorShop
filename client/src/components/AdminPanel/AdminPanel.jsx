import { Link } from "react-router-dom";
import "./AdminPanel.css";
import { Context } from "../../utils/Context";
import { useContext } from "react";

function AdminPanel(){

    const {loginInfo} = useContext(Context);

    return(
        <>
        {
        (loginInfo.status===true)&&(loginInfo.role)==="Admin"?
            <div className="admin-panel-main-div">
                <div className="admin-panel-box">
                    <div className="admin-panel-heading">Admin Panel</div>
                    <div className="admin-panel-options-div">
                        <Link to='/adminpanel/users' className="admin-panel-options">Manage Users</Link>
                        <Link to='/adminpanel/managelabours' className="admin-panel-options">Manage Labours</Link>
                        <Link to='/adminpanel/manageorders' className="admin-panel-options">Manage Orders</Link>
                        <Link to='/adminpanel/addproducts' className="admin-panel-options">Add Products</Link>
                    </div>
                </div>
            </div>
            : <div className="unauth-msg-div">Please Login as Admin</div>
        }
        </>
    )
}

export default AdminPanel;