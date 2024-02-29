const mongoose = require('mongoose')
const Schema = mongoose.Schema

const layanDBSchema = new Schema({
    user:{
        business_name: String,
        email: String,
        password: String,
        address: String,
        city: String,
        State: String,
        Country: String,
        phone_number: String,
        userRole: Number
    },

    subUser: {
        username: String,
        client_id: Number,
        password: String,
        Name: String,
        phone_number: String,
        email: String,
        address: String,
        city: String,
        State: String,
        Country: String,
        userRole: Number
    },

    userRoles: {
        client_id: Number,
        previledges:[
            {
                resource:{
                    addProduct: Boolean,
                    deleteProduct: Boolean,
                    updateProduct: Boolean,
                    addSales: Boolean,
                    deleteSales: Boolean,
                    updateSales: Boolean,
                    addReturns: Boolean,
                    deleteReturn: Boolean,
                    updateReturn: Boolean,
                    addSubUsers: Boolean,
                    changePassword: Boolean,
                    updateCustomers:Boolean
                }
            }
        ]

    },

    products: {
        prodName: String,
        client_id: Number,
        prodBarcode: String,
        price: Number,
        quantity: Number,
        comment: String,
        active: Boolean,
        descriptions: [{
            type: String,
            color: String,
            size: String
        }]
    }, 
    sales: {
        prodID: Number,
        quantity: Number,
        salesPrice: Number,
        active: Boolean,
        custID: Number,
        userID: Number,
        cliendID: Number, 
        comment: String
    },

    customer: {
        custName: String,
        phoneNumber: String,
        email: String,
        address: String,
        city: String,
        state: String,
        country: String
    },

    return: {
        prodID: Number,
        salesID: Number,
        userID: Number,
        active: Boolean,
        action: String,

    }
    
}, {timestamps: true})

module.exports = mongoose.model('lanyanDB', layanDBSchema)