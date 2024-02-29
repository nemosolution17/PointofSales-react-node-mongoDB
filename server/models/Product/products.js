const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  
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
        quantity: {
            type: Number,
          
        },
        description: {
            type: String,   
        },
    
}, {timestamps: true})

module.exports = mongoose.model('productSchema', productSchema)