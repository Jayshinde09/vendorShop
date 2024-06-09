const express = require('express');
const path = require('path');

require('dotenv').config();
const cors = require("cors");
const dbConnect = require("./config/database");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
dbConnect();

const authRoutes = require("./routes/Auth");
const productRoutes = require("./routes/Products");
const fileRoutes = require('./controllers/FileUpload');
const labourRoutes = require('./routes/Labour');

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/", productRoutes);
app.use("/api/v1/file", fileRoutes);
app.use("/api/v1/labour", labourRoutes);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, ()=>{
    console.log(`Server Started at PORT: ${PORT}`);
})