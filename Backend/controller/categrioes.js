//const product=require('../Model/Product');
const product = require('../Model/Product');

const getCategories=async(req,res)=>{
    try{
        const categories=await product.distinct('category');
        res.json(categories);
    }catch(err){
        console.error("❌ Server error details:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports={getCategories};
//module.exports=getCategories;