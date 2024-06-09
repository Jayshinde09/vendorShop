import { useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";
import Product from "./Product";

function AllProducts(){

    const [products, setProducts] = useState([])

    async function allProduct(){
        await axios.get(process.env.REACT_APP_BASE_URL+'/product').then(res=>{
            setProducts(res.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        allProduct()
    }, [])

    return(
        <>
            <div className="page-title">All Products</div>
            <div className="all-product-main-div">
                {
                    products?.data?.map((elm=>(
                        <Product image={elm?.image} title={elm?.title} vendor={elm?.vendor} category={elm?.category} price={elm?.price} slug={elm?.slug}/>
                    )))
                }
            </div>
        </>
    )
}
export default AllProducts;