const mongoose = require('mongoose')
const Schema = mongoose.Schema

const salesSchema = new Schema({
  
        product_name:{
            type: String,
           
        },
        category: {
            type: String,
          
        },
        size: {
            type: String, 
          
        },
        price:{
            type: Number,
           
        },
        cost_price: {
            type: Number,
        },
        quantity: {
            type: Number,
          
        },
        customer_name: {
            type: String,
          
        },
        customer_email: {
            type: String,
          
        },
        customer_phone_number: {
            type: String,
          
        },
        description: {
            type: String,   
        },
    
}, {timestamps: true})

module.exports = mongoose.model('salesSchema', salesSchema)