const express = require('express')
const route = express.Router()
const FrontController = require('../Controllers/FrontController')
const checkAuth = require('../middleware/auth')

// route
route.get('/home',checkAuth,FrontController.home)
route.get('/about',checkAuth,FrontController.about)
route.get('/contact',checkAuth,FrontController.contact)
route.get('/',FrontController.login)
route.get('/register',FrontController.register)
//insert data
route.post('/userinsert', FrontController.userinsert)
route.post('/verifyLogin', FrontController.verifyLogin)
route.get('/logout',FrontController.logout)
    
module.exports = route