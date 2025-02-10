const express = require('express')
const route = express.Router()
const FrontController = require('../Controllers/FrontController')
const checkAuth = require('../middleware/auth')
const CourseController = require('../Controllers/CourseController')
const isLogin=require('../middleware/isLogin')
const adminRole=require('../middleware/adminRole')
const AdminController = require('../Controllers/admin/AdminController')
const ContactController = require('../Controllers/ContactController')
const authRole = require('../middleware/adminRole')




// route
route.get('/home',checkAuth,FrontController.home)
route.get('/about',checkAuth,FrontController.about)
route.get('/contact',checkAuth,FrontController.contact)
route.get('/',isLogin,FrontController.login)
route.get('/register',FrontController.register)

//contact
route.post('/contact_insert',checkAuth,ContactController.contact_insert)
route.get('/contactDisplay',checkAuth,ContactController.contactDisplay)
route.get('/deleteContact/:id',checkAuth,ContactController.delete_contact)


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


//adminController
route.get('/admin/dashboard',checkAuth,adminRole('admin'), AdminController.dashboard)
route.get('/admin/courseDisplay',checkAuth,adminRole('admin'),AdminController.courseDisplay)
route.get('/admin/contactDisplay',checkAuth,adminRole('admin'),AdminController.contactDisplay)
route.post('/admin/update_status/:id',checkAuth,adminRole('admin'),AdminController.update_status)
route.get('/admin/courseView/:id',checkAuth,adminRole('admin'),AdminController.viewCourse)
route.get('/admin/courseEdit/:id',checkAuth,adminRole('admin'),AdminController.editCourse)
route.post('/admin/update_status/:id',checkAuth,adminRole('admin'),AdminController.update_status)
route.post('/admin/update_Course/:id',checkAuth,adminRole('admin'),AdminController.update_course)
route.get('/admin/courseDelete/:id',checkAuth,adminRole('admin'),AdminController.courseDelete)
route.get('/admin/deleteMessage/:id',checkAuth,authRole('admin'),AdminController.delete_message)
route.get('/admin/update_pass',checkAuth,adminRole('admin'),AdminController.update_pass)
route.get('/admin/profile_update',checkAuth,adminRole('admin'),AdminController.profile_update)
route.post('/admin/changePassword',checkAuth,adminRole('admin'),AdminController.changePassword)
route.post('/admin/updateProfile',checkAuth,adminRole('admin'),AdminController.updateProfile)

// forgot password
route.post('/forgot_Password',FrontController.forgetPasswordVerify)
route.get('/reset_password',FrontController.reset_Password)
route.post('/reset_Password1',FrontController.reset_Password1)

//verifyMail
route.get('/register/verify',FrontController.verifyMail)


    
module.exports = route