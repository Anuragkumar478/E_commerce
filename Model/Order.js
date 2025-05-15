const mongoose=require('mongoose')

const OrderSchema=new mongoose.Schema({
    user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
    },
    items:[
        {
            products:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            },
        },
    ],
    totalAmount:{
        type:Number,
        required:true
    },
    shippingAddress:{
        fullName:String,
        address:String,
       city:String,
        state:String,
      postalCode:String,
      country:String,
      phone:String
    },
    status:{
        type:String,
        enum:["pending" ,"cancelled","shipped","delivered" ,"processing",],
        default:"pennding"
    },
    paymentStatus:{
        type:String,
        enum:["paid","unpaid"],
        default:"unpaid"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('orderModel',OrderSchema)