const express=require("express");
const usersRouter=express.Router();
const { generateFromEmail } = require("unique-username-generator");
const jwt = require('jsonwebtoken');
const {RegisterModel}=require("../Models/Register.models")
/* Get all user account from DB */


// usersRouter.get("/",async (req,res)=>{
//     try{
//         let data=await RegisterModel.find({});
//         res.send({
//             data
//         })
//     }catch(err){
//         console.log(err);
//         res.send({"message":"Something went wrong"})
//     }
// })




/* Login or registration for user routes */


usersRouter.post("/",async (req,res)=>{
    try{
        const {email}=req.body;
        let data=await RegisterModel.find({email});
        if(data.length>0){
            let token = jwt.sign({ email: data[0].email,id:data[0]._id }, 'aditya');
            let userData=data[0];
            res.send({"message":"Login Successful",token,userData})
        }else{
            const username = generateFromEmail(
                email,5
              );
            let users=new RegisterModel({email,username});
            await users.save();
            let token = jwt.sign({ email,id:users._id }, 'aditya');
            let registerUser=await RegisterModel.find({email});
            let userData=registerUser[0];
            res.send({"message":"Registration Successful",token,userData})
        }
    }catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"})
    }
})

usersRouter.patch("/:id",async (req,res)=>{
    const {id}=req.params;
    try{
        let user=await RegisterModel.find({_id:id});
        if(user.length>0){
            let data=await RegisterModel.findByIdAndUpdate({_id:user[0]._id},req.body);
            let userData=await RegisterModel.find({_id:id});
            res.send({"message":"username is updated",userData})
        }else{
            res.send({"message":"User not found"})
        }
    }catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"})
    }
})

module.exports={
    usersRouter
}