const express = require('express')
// console.log(express)
const app = express()
const port = 3000
const web = require('./Routes/web')
const connectDb = require('./Database/connectDb')
const fileupload = require("express-fileupload")
const cloudinary = require("cloudinary")
const cookieParser = require('cookie-parser')

//image 
app.use(fileupload({useTempFiles :true}))
// token get cookie
app.use(cookieParser())

//view ejs set 
app.set('view engine', 'ejs')
//css image js link public
app.use(express.static('public'))
//connect database
connectDb()
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}))
//connect flash and express-session
const session = require('express-session')
const flash = require('connect-flash')
//message
app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave: false,
    saveUninitialized:false,
}));
//flash message
app.use(flash());

//setup
cloudinary.config({
    cloud_name: 'dxhebpcsz',
    api_key: '431875666151272',
    api_secret: 'sGQkiWBwDlyB1Xj-1apRL96r9q4'
});






//route load
app.use('/',web)

// server create
app.listen(port, ()=>{
    console.log(`server start localhost:${port}`)
})
