const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boughtProductSchema = new Schema({
  
        product_id:{
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
        supplier: {
            type: String,
          
        },
        description: {
            type: String,   
        },
    
}, {timestamps: true})

module.exports = mongoose.model('boughtProductSchema', boughtProductSchema)