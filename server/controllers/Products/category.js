const categorySchema = require('../../models/Product/category')
const mongoose = require('mongoose')
const async = require('async');


const addCategory = async (req, res) => {
    const{business_id, categorys} = req.body
    var dictCategory = []
    function createdDict(){
        for (let category in categorys) {
            dictCategory.push({business_id : business_id, category : categorys[category]})
        }
        return dictCategory
    }
    try{
        var createdDicts = createdDict()
        const addedCategory = await categorySchema.insertMany(createdDicts)
        res.status(200).json(addedCategory)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const getCategory = async (req, res) => {
    try{
        const foundCategory = await categorySchema.find({}, "category")
        res.status(200).json(foundCategory)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {addCategory, getCategory}