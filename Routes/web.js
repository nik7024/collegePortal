const express = require('express')
const route = express.Router()
const FrontController = require('../Controllers/FrontController')

// route
route.get('/home',FrontController.home)
route.get('/about',FrontController.about)
route.get('/contact',FrontController.contact)
route.get('/',FrontController.login)
route.get('/register',FrontController.register)
//insert data
route.post('/userinsert', FrontController.userinsert)
    
module.exports = route