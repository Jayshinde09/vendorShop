const mongoose = require("mongoose");
require("dotenv").config();

function dbConnect(){
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log("DB Connected Successfully!!"))
    .catch((error)=>{
        console.log(error.message)
        process.exit(1);
    });
}

module.exports = dbConnect;