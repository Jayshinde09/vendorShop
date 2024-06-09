import '../AdminPanel/AdminPanel.css';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LabourRegister(){

    const [loginStatus, setLoginStatus] = useState(undefined);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    async function addLabourFunc(){
        if(password!==confirmPassword){
            setLoginStatus("Password and Confirm Password must be Same");
        }
        else if(name!=="" && email!=="" && mobile!=="" && vehicleNo!=="" && password!=="" && confirmPassword!==""){
            await axios.post(process.env.REACT_APP_BASE_URL+'/labour/create', {name, email, mobile, password, vehicleNo, confirmPassword}).then(res=>{
                setLoginStatus("Labour Added Successfully");
            }).catch(error=>{
                setLoginStatus(error?.response?.data?.message);
            })
        }
        else{
            setLoginStatus("Please Fill All the Details");
        }
        
    }

    return(
        <>
        <div className="admin-panel-main-div">
            <div className="admin-panel-box">
                <div className="admin-panel-heading">Register Labour</div>
                <div className="admin-panel-div-box">
                    <div className="login-form-div">
                        <div className="form-label">Labour Name:</div>
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" id="title-field" className="login-input-field"/>
                        <div className="form-label">Vehicle Number:</div>
                        <input value={vehicleNo} onChange={(e)=>{setVehicleNo(e.target.value)}} type="text" id="title-field" className="login-input-field"/>
                        <div className="form-label">Email:</div>
                        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" id="category-field" className="login-input-field"/>
                        <div className="form-label">Mobile:</div>
                        <input value={mobile} onChange={(e)=>{setMobile(e.target.value)}} type="number" id="category-field" className="login-input-field"/>
                        <div className="form-label">Password:</div>
                        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" id="category-field" className="login-input-field"/>
                        <div className="form-label">Confirm Password:</div>
                        <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" id="category-field" className="login-input-field"/>
                        <div className="login-status-div">{loginStatus}</div>
                        <br/>
                        <div className="submit-btn-div">
                            <button onClick={addLabourFunc} className="submit-btn">Register</button>
                        </div>
                        <Link to='/labour/login' className="create-account-link">Already have Account? Login</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default LabourRegister;