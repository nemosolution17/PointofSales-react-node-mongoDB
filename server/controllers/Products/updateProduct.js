const productSchema = require('../../models/Product/products')
const mongoose = require('mongoose')
const async = require('async');

const updateProduct = async (req, res) => {
    console.log(req.body)
    const{ product_id, category, size, price, quantity, description} = req.body

    try{
        productSchema.findOneAndUpdate({"_id":product_id}, {"$set": {"price":price, "quantity":quantity, "description":description}}, 
                                        {new:true}).exec(function(err, updatedProduct){
            if(err) {
                console.log(err);
                
            } else {
                res.status(200).json(updatedProduct);
            }
         });
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {updateProduct}