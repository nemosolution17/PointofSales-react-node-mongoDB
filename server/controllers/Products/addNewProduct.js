const productSchema = require('../../models/Product/products')
const mongoose = require('mongoose')
const async = require('async');


const addNewProduct = async (req, res) => {
    console.log(req.body)
    const{product_name, category, size, price, quantity, description} = req.body
    try{
        const sortedName = product_name.split(' ').sort().join(' ');
        const findName = await productSchema.find({}, "product_name")
        for (let pname in findName){
            var sortedPName = findName[pname]["product_name"].split(' ').sort().join(' ')
            if (sortedName == sortedPName){
                res.status(400).json({error:"duplicate"})
                return;
            }
        }
        const addedProduct = await productSchema.create({product_name, category, size, price, quantity, description})
        res.status(200).json(addedProduct)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const getProduct = async (req, res) => {
    try{
        const foundProducts = await productSchema.find({})
        res.status(200).json(foundProducts)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

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


module.exports = {addNewProduct, getProduct, updateProduct}