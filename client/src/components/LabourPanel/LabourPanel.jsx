import { Link } from "react-router-dom";
import "../AdminPanel/AdminPanel.css";
import { Context } from "../../utils/Context";
import { useContext } from "react";

function LabourPanel(){

    const {loginInfo} = useContext(Context);

    return(
        <>
        {
        (loginInfo.status===true)&&(loginInfo.role)==="Labour"?
            <div className="admin-panel-main-div">
                <div className="admin-panel-box">
                    <div className="admin-panel-heading">Labour Panel</div>
                    <div className="admin-panel-options-div">
                        <Link to='/labour/orders' className="admin-panel-options">Manage Orders</Link>
                        <Link to='/labour/edit' className="admin-panel-options">Edit Profile</Link>
                    </div>
                </div>
            </div>
            : <div className="unauth-msg-div">Please Login as Labour</div>
        }
        </>
    )
}

export default LabourPanel;