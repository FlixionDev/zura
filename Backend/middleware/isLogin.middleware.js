/* This middleware will check user is logged in or not */
const jwt = require('jsonwebtoken');
require("dotenv").config()
const isLoginCheck=(req,res,next)=>{
 let token=req.headers.authorization;
 if(token){
    jwt.verify(token, process.env.jwtKey, function(err, decoded) {
        if(err){
            res.send({"message":"Something went wrong. Please login again"})
        }else{
            let {email,id}=decoded;
            req.body.userId=id;
            next();
        }
      });
 }else{
    res.send({"message":"Please login"})
 }
}
module.exports={
    isLoginCheck
}