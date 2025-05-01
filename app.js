const express = require('express')

const connectDb = require("./database/connectDb")
const route = require("./routes/web")
const fileUpload = require("express-fileupload")
const cookiesParser = require("cookie-parser")
// console.log(express)
const app = express()
const port = 3000

//image upload
app.use(fileUpload({ useTempFiles: true }))
// view ejs set
app.set("view engine", "ejs")
//css image link public 
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))

app.use(cookiesParser())

//connect flash and session 
const session = require("express-session")
const flash = require("connect-flash")

//messages
app.use(session({
  secret: "secret",
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}))

//flash messages 
app.use(flash());




//route 
app.use('/', route)


//connecting to db
connectDb()


// console.log(app.get===express.Router().get) 








//server create
app.listen(port, () => {
  console.log(`server start localhost:port ${port}`)
})