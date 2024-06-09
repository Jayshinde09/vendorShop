import { useEffect, useState} from "react";
import Product from "../Product/Product";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Home(){

    const [product, setProduct] = useState([]);

    const fetchDataAPI = async () => {
        await axios.get(process.env.REACT_APP_BASE_URL+'/product').then(res=>{
            setProduct(res.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => {
        fetchDataAPI();
    }, [])

    return(
        <div className="home-page-main-div">
            <div className="banner-main-div">
                HINDUSTAN CERAMIC
            </div>
            <div className="section">
                <div className="section-heading">Who we are?</div>
                <div className="section-text">
                Welcome to Hindustan Ceramic Tile Store, your one-stop destination for high-quality ceramic tiles and exquisite tile solutions. We take pride in offering a wide range of stylish and durable tiles to enhance the aesthetic appeal of your living spaces. With our extensive collection and exceptional customer service, we strive to make your tile selection process seamless and enjoyable.
                </div>
            </div>
            <div className="section">
                <div className="section-heading">Products</div>
                <div className="products-section-div">
                    {product?.data?.map((elm=>(
                        <Product key={elm?._id} title={elm?.title} image={elm?.image[0]} slug={elm?.slug} vendor={elm?.vendor} category={elm?.category} price={elm?.price}/>
                    )))}
                </div>
                <div className="section-btn-div">
                    <Link to={'/products'}>Explore More Products</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;