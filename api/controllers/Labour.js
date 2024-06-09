const Labour = require('../models/Labour');
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
    try{
        const {name, email, mobile, vehicleNo, password, confirmPassword} = req.body;

        if(!email || !name || !mobile || !vehicleNo || !password || !confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Please Fill All the Details"
            })
        }

        if(password!==confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password and Confirm Password Must Be Same"
            })
        }

        const existingLabour = await Labour.findOne({email});
        if(existingLabour){
            return res.status(401).json({
                success: false,
                message: "Labour Already Exists"
            })
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        const response = Labour.create({name, email, mobile, vehicleNo, password: hashedPassword, role:"Labour"});
        return res.status(200).json({
            success: true,
            message: "Labour Added Successfully"
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

exports.login = async (req, res) => {
    try{
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(401).json({
                success: false,
                message: "Please Fill All the Details"
            })
        }

        const userDetails = await Labour.findOne({email, role});
        if(!userDetails){
            return res.status(401).json({
                success: false,
                message: "User is not Registered"
            })
        }

        if(await bcrypt.compare(password, userDetails.password)){
            return res.status(200).json({
                success: true,
                message: "Login Successful",
                name: userDetails.name
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.labours = async (req, res) => {
    try{
        const usersRes = await Labour.find({role: "Labour"}).select({name: 1, email: 1, mobile: 1, _id: 0, vehicleNo: 1});
        return res.status(200).json({
            success: true,
            message: "Labour Details Fetched Successfully",
            data: usersRes
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error with orders",
            error: error.message
        })
    }
}

exports.oneLabour = async (req, res) => {
    try{
        const {email} = req.body;
        const usersRes = await Labour.find({role: "Labour", email}).select({name: 1, email: 1, mobile: 1, vehicleNo: 1, _id: 0});
        return res.status(200).json({
            success: true,
            message: "Users Details Fetched Successfully",
            data: usersRes
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error with orders",
            error: error.message
        })
    }
}

exports.updateInfo = async (req, res) => {
    try{
        const {name, mobile, vehicleNo, email, role} = req.body;
        
        if(!email || !role){
            return res.status(401).json({
                success: false,
                message: "Authorized Access"
            })
        }
        const response = await Labour.findOneAndUpdate({email, role}, {
            name, mobile, vehicleNo
        })
        return res.status(200).json({
            success: true,
            message: "Labour Details Updated Successfully"
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