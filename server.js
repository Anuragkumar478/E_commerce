const express=require('express');
const dotenv=require('dotenv')
const db=require('./config/db');
const userRoutes=require('./Router/userRoute')
dotenv.config();
const app=express();
app.use(express.json());



app.use("/api/user", userRoutes);


app.get('/',(req,res)=>{
    console.log('app is ruuning on port 3000');
    res.status(201).json({message:'your app is ruuning '})

    
})
app.listen(3000,()=> console.log('app is ruuning on port 3000'))
    
