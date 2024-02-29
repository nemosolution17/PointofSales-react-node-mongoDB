const boughtProductSchema = require('../../models/Product/boughtProduct')
const productSchema = require('../../models/Product/products')
const mongoose = require('mongoose')
const async = require('async');


const addBoughtProduct = async (req, res) => {
    console.log(req.body)
    const{product_name, product_id, oldPrice, oldQuantity, supplier, category, size, price, quantity, description} = req.body
    var newQuantity = Number(quantity) + Number(oldQuantity);
    var newPrice = ((Number(oldPrice) * Number(oldQuantity)) + (Number(price) * Number(quantity))) / (Number(oldQuantity) + Number(quantity))
    console.log(newQuantity,  newPrice)
    try{
        productSchema.findOneAndUpdate({"_id":product_id}, {"$set": {"price":newPrice, "quantity":newQuantity}}, {new:true}).exec(function(err, updatedProduct){
            if(err) {
                console.log(err);
                
            } else {
                     console.log(updatedProduct);
            }
         });
        const addedBoughtProduct = await boughtProductSchema.create({product_id, supplier, category, size, price, quantity, description})
        res.status(200).json(addedBoughtProduct)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {addBoughtProduct}