const express=require('express');
const dotenv=require('dotenv')
const db=require('./config/db');
const userRoutes=require('./Router/userRoute')
const productRoutes = require('./Router/ProductRoutes');
dotenv.config();
const app=express();
app.use(express.json());


const cors = require("cors");
app.use(cors());



const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use("/api/cart", require("./Router/cartRoutes"));
app.use('/api/order',require('./Router/orderRoute'));



app.get('/',(req,res)=>{
    console.log('app is ruuning on port 3000');
    res.status(201).json({message:'your app is ruuning '})

    
})
app.listen(3000,()=> console.log('app is ruuning on port 3000'))
    
