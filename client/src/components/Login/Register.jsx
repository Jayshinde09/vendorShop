import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import axios from "axios";

function Register(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    const [loginStatus, setLoginStatus] = useState(undefined);

    async function registerFunc(){
        if(name!=="" && email!=="" && password!=="" && confirmPassword!==""  && mobile!=="" && address1!=="" && address2!=="" && city!==""  && state!==""  && pincode!=="" && password===confirmPassword){
            await axios.post(process.env.REACT_APP_BASE_URL+'/auth/register', {name, email, password, confirmPassword, mobile, address1, address2, city, state, pincode, role: "User"}).then(res=>{
                setLoginStatus(res?.data?.message);
        }).catch(error=>{
            setLoginStatus(error?.response?.data?.message);
        })
        }
        else{
            if(password!==confirmPassword){
                setLoginStatus("Password Must be Same");
            }
            else{
                setLoginStatus("Please Fill All the Details");
            }
        }
    }

    return(
        <div>
            <div className="login-main-div">
                <div className="login-box">
                    <div className="login-heading">Register New User</div>
                    <div className="login-form-div">
                        <div className="form-label">Name:</div>
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" id="name-field" className="login-input-field"/>
                        <div className="form-label">Email:</div>
                        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email-field" className="login-input-field"/>
                        <div className="form-label">Password:</div>
                        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" id="pass-field" className="login-input-field"/>
                        <div className="form-label">Confirm Password:</div>
                        <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" id="confirm-pass-field" className="login-input-field"/>
                        <div className="form-label">Mobile Number: </div>
                        <input value={mobile} onChange={(e)=>{setMobile(e.target.value)}} type="number" id="mobile-field" className="login-input-field"/>
                        <div className="form-label">Address Line 1:</div>
                        <input value={address1} onChange={(e)=>{setAddress1(e.target.value)}} type="text" id="address1-field" className="login-input-field"/>
                        <div className="form-label">Address Line 2:</div>
                        <input value={address2} onChange={(e)=>{setAddress2(e.target.value)}} type="text" id="address2-field" className="login-input-field"/>
                        <div className="form-label">City:</div>
                        <input value={city} onChange={(e)=>{setCity(e.target.value)}} type="text" id="city-field" className="login-input-field"/>
                        <div className="form-label">State:</div>
                        <input value={state} onChange={(e)=>{setState(e.target.value)}} type="text" id="state-field" className="login-input-field"/>
                        <div className="form-label">Pincode:</div>
                        <input value={pincode} onChange={(e)=>{setPincode(e.target.value)}} type="number" id="pincode-field" className="login-input-field"/>
                        <div className="login-status-div">{loginStatus}</div>
                        <br/>
                        <div className="submit-btn-div">
                            <button onClick={registerFunc} className="submit-btn">Register</button>
                        </div>
                        <Link to='/login' className="create-account-link">Already have Account? Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;