const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const checkAuth = async(req,res,next)=>{
    // console.log('authcheck')
    const { token } = req.cookies
    // console.log(token)
    if (!token) {
        res.flash('error', 'unauthorised user please login')
        res.redirect('/')
    } else {
        const verifyToken = jwt.verify(token, 'jgbd43hnda9a')
        // console.log(verifyLogin)
        const data = await UserModel.findOne({ _id: verifyToken.ID })
        // console.log(data)
        req.udata = data
        next()
    }
}

module.exports = checkAuth