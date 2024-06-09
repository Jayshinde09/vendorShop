const Product = require("../models/Product");

exports.create = async (req, res) => {
    try{
        const {title, category, price, description, image, vendor} = req.body;
        
        if(!title || !category || !price || !description || !image || !vendor){
            return res.status(401).json({
                success: false,
                message: "Please Fill All the Details"
            })
        }
        
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        
        const existingProduct = await Product.findOne({slug});
        if(existingProduct){
            return res.status(401).json({
                success: false,
                message: "Product Already Exists"
            }) 
        }

        const productResponse = await Product.create({title, slug, category, price, description, image, vendor});
        return res.status(200).json({
            success: true,
            message: "Product Created Successfully"
        }) 
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.getproducts = async (req, res) => {
    try{
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            message: "Product Fetched Successfully",
            data: products
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.getproduct = async (req, res) => {
    try{
        const slug = req.params.slug;
        const products = await Product.find({slug});
        return res.status(200).json({
            success: true,
            message: "Product Fetched Successfully",
            data: products
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}