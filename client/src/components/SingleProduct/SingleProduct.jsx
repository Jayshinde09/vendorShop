import { useParams } from "react-router-dom";
import "./SingleProduct.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../utils/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function SingleProduct(){

    const navigate = useNavigate();

    const {cart, setCart, loginInfo} = useContext(Context);

    const [qty, setQty] = useState(1);
    const {slug} = useParams();
    const [product, setProduct] = useState([]);
    const [status, setStatus] = useState(false);
    const [area, setArea] = useState(0);
    const [cost, setCost] = useState(0);

    async function fetchDataAPI(){
        await axios.get(process.env.REACT_APP_BASE_URL+`/product/${slug}`).then(res=>{
            setProduct(res.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        fetchDataAPI();
    }, [slug])

    function addToCartFunc(){
        if(loginInfo.status){
            const existingCart = cart.find(elm=>
                elm._id===product.data[0]._id
            )
            if(!existingCart){
                const orderid = Date.now()+slug;
                setCart([...cart, {...product.data[0], qty, orderid, status, user: loginInfo.email, read: false, labour: false}]);
                navigate('/cart')
            }
            else{
                const remCart = cart.filter(elm=>
                    elm._id!==product.data[0]._id
                )
                setCart([...remCart, {...existingCart, qty: existingCart.qty + 1}]);
                navigate('/cart')
            }
        }
        else{
            navigate('/login');
        }
    }

    function calculateCost(){
        setCost(product?.data[0].price * area);
    }

    return(
        <div className="single-product-main-div">
            {product?.data?.map((elm)=>(    
                <div key={elm?.id} className="single-product-box">
                    <div className="single-product-left-div">
                        <img className="single-product-img" src={elm?.image[0]} alt="product-img" />
                    </div>
                    <div className="single-product-right-div">
                        <div className="single-product-title">{elm?.title}</div>
                        <div className="single-product-details">Vendor: {elm?.vendor}</div>
                        <div className="single-product-details">Category: {elm?.category}</div>
                        <div className="single-product-details">Price: <span className="single-product-price">₹{elm?.price}/-</span></div>
                        <div className="single-product-qty-div">
                            <button className="qty-btn" onClick={()=>{
                                if(qty>1){
                                    setQty(qty-1)
                                }
                            }}>-</button>

                            <span className="qty-text">{qty}</span>
                            
                            <button className="qty-btn" onClick={()=>{
                                if(qty>0){
                                    setQty(qty+1)
                                }
                            }}>+</button>

                            <button onClick={addToCartFunc} className="add-to-cart-btn">Add to Cart</button>
                        </div>
                        <div className="single-product-desc-h1">Product Description:</div>
                        <div className="single-product-desc-text">
                            {elm?.description}
                        </div>
                        <div className="single-product-desc-h1">Calculate Cost:</div>
                        <div className="single-product-desc-text">
                            Enter Area (in sq.meter): <input type="number" className="login-input-field" value={area} onChange={(e)=>setArea(e.target.value)}/>
                            <button onClick={calculateCost} className="calculate-btn">Calculate</button>
                            <div className="cost-text-div">Cost: ₹{cost}/-</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SingleProduct;