const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userBusinessSchema = new Schema({
  
        businessName:{
            type: String,
           
        },
        email: {
            type: String,
          
        },
        password: {
            type: String,
          
        },
        address: {
            type: String,
         
        },
        city: {
            type: String,
            
        },
        state: {
            type: String,
       
        },
        country: {
            type: String,
         
        },
        phoneNumber: {
            type: String,
          
        },
        userRole: {
            type: String,
   
        },
    
    
}, {timestamps: true})

module.exports = mongoose.model('userBusinessSchema', userBusinessSchema)