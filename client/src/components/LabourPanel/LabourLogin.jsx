import { Link } from "react-router-dom";
import "../Login/Login.css";
import { useState } from "react";
import axios from "axios";
import { Context } from "../../utils/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function LabourLogin(){

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState(undefined);

    const {loginInfo, setLoginInfo} = useContext(Context);

    async function loginFunc(){
        if(email!=="" && password!==""){
            await axios.post(process.env.REACT_APP_BASE_URL+'/labour/login', {email, password, role:'Labour'}).then(res=>{
                setLoginStatus(res?.data?.message);
                setLoginInfo({status: true, email: email, name: res?.data?.name, role: "Labour"});
                navigate('/')
                
            }).catch(error=>{
                setLoginStatus(error?.response?.data?.message);
            })
        }
        else{
            setLoginStatus("Please Fill All the Details")
        }
    }

    return(
        <div>
            <div className="login-main-div">
                <div className="login-box">
                    <div className="login-heading">Labour Login</div>
                    <div className="login-form-div">
                        <div className="form-label">Email:</div>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email-field" className="login-input-field"/>
                        <div className="form-label">Password:</div>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password-field" className="login-input-field"/>
                        <div className="login-status-div">{loginStatus}</div>
                        <br/>
                        <div className="submit-btn-div">
                            <button onClick={loginFunc} className="submit-btn">Login</button>
                        </div>
                        <Link to='/labour/register' className="create-account-link">Don't have Account? Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LabourLogin;