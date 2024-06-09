import './AdminPanel.css';
import { Context } from '../../utils/Context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function AddProducts(){

    const {loginInfo} = useContext(Context);

    const [loginStatus, setLoginStatus] = useState(undefined);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [vendor, setVendor] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(undefined);

    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }
    
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);
    
        await axios.post(process.env.REACT_APP_BASE_URL+'/file/upload', formData)
        .then(response => {
            setImage(response.data.imagePath);
        })
        .catch(error => {
            setLoginStatus(error?.response?.data?.message);
        });
    }
    
    async function addProductFunc(){
        if(image){
            await axios.post(process.env.REACT_APP_BASE_URL+'/product', {title, category, image, price, vendor, description}).then(res=>{
                setLoginStatus("Product Added Successfully");
                setTitle("");
                setCategory("");
                setPrice("");
                setVendor("");
                setDescription("");
                setImage(undefined);
                setSelectedFile(null);
            }).catch(error=>{
                setLoginStatus(error?.response?.data?.message);
            })
        }
    }

    useEffect(()=>{
        addProductFunc();
    }, [image])

    return(
        <>
        {
        (loginInfo.status===true)&&(loginInfo.role)==="Admin"?
            <div className="admin-panel-main-div">
                <div className="admin-panel-box">
                    <div className="admin-panel-heading">Add Product</div>
                    <div className="admin-panel-div-box">
                        <div className="login-form-div">
                            <div className="form-label">Product Name:</div>
                            <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" id="title-field" className="login-input-field"/>
                            <div className="form-label">Category:</div>
                            <input value={category} onChange={(e)=>{setCategory(e.target.value)}} type="text" id="category-field" className="login-input-field"/>
                            <div className="form-label">Price:</div>
                            <input value={price} onChange={(e)=>{setPrice(e.target.value)}} type="number" id="price-field" className="login-input-field"/>
                            <div className="form-label">Vendor:</div>
                            <input value={vendor} onChange={(e)=>{setVendor(e.target.value)}} type="text" id="vendor-field" className="login-input-field"/>
                            <div className="form-label">Description:</div>
                            <input value={description} onChange={(e)=>{setDescription(e.target.value)}} type="text" id="desc-field" className="login-input-field"/>
                            <div className="form-label">Choose File:</div>
                            <input type="file" onChange={handleFileChange} accept="image/*" className="login-input-field"/>
                            <div className="login-status-div">{loginStatus}</div>
                            <br/>
                            <div className="submit-btn-div">
                                <button onClick={handleUpload} className="submit-btn">Add Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : <div className="unauth-msg-div">Please Login as Admin</div>
        }
        </>
    )
}
export default AddProducts;