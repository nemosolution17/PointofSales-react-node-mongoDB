const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  
        business_id:{
            type: String,
           
        },
        category: {
            type: String,
          
        },
        is_active: {
            type: Boolean, 
            default: true
          
        },
    
}, {timestamps: true})

module.exports = mongoose.model('categorySchema', categorySchema)