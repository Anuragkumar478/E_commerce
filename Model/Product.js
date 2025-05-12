const mongoose =require('mongoose')
const ProducModel=new mongoose.Schema({
   name: { type: String, required: true },
    address: {
    street: String,
    city: String,
    pincode: String,
    state: String
  },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    isAdmin:{type:Boolean , default:false},

} ,{timestamps:true});

module.exports = mongoose.model('Product', ProducModel);