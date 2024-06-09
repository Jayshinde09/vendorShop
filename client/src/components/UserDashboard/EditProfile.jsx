import "../Login/Login.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../utils/Context";

function EditProfile(){

    const {loginInfo} = useContext(Context);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    const [loginStatus, setLoginStatus] = useState(undefined);

    async function UserDetails(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/oneuser', {email: loginInfo?.email}).then(res=>{
            setName(res?.data?.data[0]?.name);
            setEmail(res?.data?.data[0]?.email);
            setMobile(res?.data?.data[0]?.mobile);
            setAddress1(res?.data?.data[0]?.address1);
            setAddress2(res?.data?.data[0]?.address2);
            setCity(res?.data?.data[0]?.city);
            setState(res?.data?.data[0]?.state);
            setPincode(res?.data?.data[0]?.pincode);
        })
    }

    async function updateInfoFunc(){
        if(name!=="" && email!=="" && mobile!=="" && address1!=="" && address2!=="" && city!==""  && state!==""  && pincode!==""){
            await axios.post(process.env.REACT_APP_BASE_URL+'/auth/updateinfo', {name,email, mobile, address1, address2, city, state, pincode, role: "User"}).then(res=>{
                setLoginStatus(res?.data?.message);
            }).catch(error=>{
                setLoginStatus(error?.response?.data?.message);
            })
        }
        else{
            setLoginStatus("Please Fill All the Details");
        }
    }

    useEffect(()=>{
        UserDetails();
    }, [])

    return(
        <div>
            <div className="login-main-div">
                <div className="login-box">
                    <div className="login-heading">Edit Profile</div>
                    <div className="login-form-div">
                        <div className="form-label">Name:</div>
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" id="name-field" className="login-input-field"/>
                        <div className="form-label">Email:</div>
                        <input value={email} type="email" id="email-field" className="login-input-field"/>
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
                            <button onClick={updateInfoFunc} className="submit-btn">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;