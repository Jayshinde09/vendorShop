import "./Product.css";
import {Link} from "react-router-dom";

function Product({image, title, vendor, category, price, slug}){
    return(
        <Link to={`/product/${slug}`}>
            <div className="product-card-div">
                <img className="product-img" src={image} alt="product-img"/>
                <div className="product-title">{title}</div>
                <div className="product-details">Vendor: {vendor}</div>
                <div className="product-details">Category: {category}</div>
                <div className="product-details">Price: <span className="product-price">₹{price}/-</span></div>
            </div>
        </Link>
    )
}

export default Product;