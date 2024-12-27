const jwt = require('jsonwebtoken')
const UserModel = require('../Models/user')

const checkAuth  = async (req,res,next)=>{
    // console.log("authcheck")
    const {token} = req.cookies
    //console.log(token)
    if(!token){
        req.flash('error', 'unauthorized user please login')
        res.redirect('/')
    }else{
        const verifyToken = jwt.verify(token,'jgbd43hnda9a')
        //console.log(verifyToken)
        const data = await UserModel.findOne({_id:verifyToken.ID})
        // console.log(data)
        req.udata = data
        next()

    }
}
module.exports = checkAuth