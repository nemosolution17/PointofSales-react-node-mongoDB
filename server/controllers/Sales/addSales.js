const salesSchema = require('../../models/Sales/sales')
const productSchema = require('../../models/Product/products')
const mongoose = require('mongoose')
const async = require('async');


const addSales = async (req, res) => {
    const{product_name, product_id, cost_price, customer_name, customer_phone_number, customer_email, oldQuantity,  category, size, price, quantity, description} = req.body
    var newQuantity = Number(oldQuantity) - Number(quantity);
    try{
        const updatedProducts = await productSchema.findOneAndUpdate({_id:product_id},{
            quantity: newQuantity
        })
        if (!updatedProducts){
            res.status(500).json({error:"can't update product schema"})
            return;
        }
        const addedSales = await salesSchema.create({product_name, category, size, cost_price, price, quantity, 
            customer_name, customer_phone_number, customer_email, description
        })
        res.status(200).json(addedSales)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const getSales = async (req, res) => {
    try{
        const foundSales = await salesSchema.find({})
        res.status(200).json(foundSales)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}


module.exports = {addSales, getSales}