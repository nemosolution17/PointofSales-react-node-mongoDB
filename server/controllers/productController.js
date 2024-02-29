const layanDB = require('../models/layanDB')
const mongoose = require('mongoose')

// add product
const addProduct = async (req, res, next) => {
    const {prodName} = req.body

    try{
        const prodModel = await layanDB.create({prodName})
        res.status(200).json(prodModel)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}


// get product
const getProduct = async (req, res, next) => {
    const{id} = req.params
    try{
        const products = await layanDB.find({}).sort({createdAt: -1})
        res.status(200).json(products)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// get particular products
const queryProducts = async (req, res, next) => {
    const{id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "product not found"})
    }
    try{
        const products = await layanDB.findById(id)
        if (!products) {
            return res.status(400).json({error: "product not found"})
        }
        else{
            res.status(200).json(products)
        }
        
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// delete product (inactive)
const deleteProduct = async (req, res, next) => {
    const{id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "product not found"})
    }

    const products = await layanDB.findOneAndUpdate({_id:id},{
        active: false
    })

    if (!products) {
        return res.status(400).json({error: "product not found"})
    }
    
    res.status(200).json(products) 
}

module.exports = {
    addProduct,
    getProduct,
    queryProducts,
    deleteProduct
}
