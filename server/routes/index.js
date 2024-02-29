
const express = require('express')
const router = express.Router()
const passport = require('passport');
const {addBoughtProduct} = require('../controllers/Products/boughtProduct')
const {dashboardData} = require('../controllers/Dashboard/dashboard')
const salesFunc = require('../controllers/Sales/addSales')
const categoryFunc = require('../controllers/Products/category')
const productFunc = require('../controllers/Products/addNewProduct')
const {signUpBusiness} = require('../controllers/Authentications/signupController')
const {mainLogin} = require('../controllers/Authentications/mainLogin')
const {mainLogout} = require('../controllers/Authentications/mainLogout')




// Main Business Signup
router.post('/signup_business', signUpBusiness)

// Main Business Login
router.post('/main_login', mainLogin)

// Main Business logout
router.get('/logout', mainLogout)

// add Category
router.post("/add_category", categoryFunc.addCategory)

// add new product
router.post("/add_product", productFunc.addNewProduct)

// get category
router.get('/get_category', categoryFunc.getCategory)

// get products
router.get('/get_product', productFunc.getProduct)

// add new bought products
router.post('/add_bought_product', addBoughtProduct)

// add new sales
router.post('/add_sales', salesFunc.addSales)

// add new sales
router.get('/get_sales', salesFunc.getSales)

// dashboard data
router.get('/dashboard_data', dashboardData)

// add new bought products
router.post('/update_product', productFunc.updateProduct)

router.get("/api", (req, res, next) => {
    res.json({"users": ["userOne", "userTwo", "userThree", "userFour"]})
})

module.exports = router