import "../Login/Login.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../utils/Context";

function EditLabourProfile(){

    const {loginInfo} = useContext(Context);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");

    const [loginStatus, setLoginStatus] = useState(undefined);

    async function UserDetails(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/labour/onelabour', {email: loginInfo?.email}).then(res=>{
            setName(res?.data?.data[0]?.name);
            setEmail(res?.data?.data[0]?.email);
            setMobile(res?.data?.data[0]?.mobile);
            setVehicleNo(res?.data?.data[0]?.vehicleNo);
        })
    }

    async function updateInfoFunc(){
        if(name!=="" && email!=="" && mobile!=="" && vehicleNo!==""){
            await axios.post(process.env.REACT_APP_BASE_URL+'/labour/updateinfo', {name,email, mobile, vehicleNo, role: "Labour"}).then(res=>{
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
                        <div className="form-label">Vehicle Number:</div>
                        <input value={vehicleNo} onChange={(e)=>{setVehicleNo(e.target.value)}} type="text" id="address1-field" className="login-input-field"/>
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

export default EditLabourProfile;