const express = require('express')
const route = express.Router()
const FrontController = require('../Controllers/FrontController')
const checkAuth = require('../middleware/auth')
const CourseController = require('../Controllers/CourseController')
const AdminController = require('../Controllers/admin/AdminController')


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

//profile
route.get('/profile',checkAuth,FrontController.profile)
route.post('/changePassword',checkAuth,FrontController.changePassword)
route.post('/updateProfile',checkAuth,FrontController.updateProfile)


//course
route.post('/course_insert',checkAuth,CourseController.createCourse)
route.get('/courseDisplay',checkAuth,CourseController.courseDisplay)
route.get('/viewCourse/:id',checkAuth,CourseController.viewCourse)
route.get('/deleteCourse/:id',checkAuth,CourseController.deleteCourse)
route.get('/editCourse/:id',checkAuth,CourseController.editCourse)
route.post('/courseUpdate/:id',checkAuth,CourseController.courseUpdate)

//AdminController
route.get('/admin/dashboard',checkAuth,AdminController.dashboard)
route.get('/admin/courseDisplay',checkAuth,AdminController.courseDisplay)
route.post('/admin/update_status/:id',checkAuth,AdminController.update_status)

    
module.exports = route