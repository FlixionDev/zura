const mongoose=require("mongoose");
const registerSchema=mongoose.Schema({
    email:{type:String,required:true},
    username:{type:String,required:true}
},{
    versionKey:false
})

const RegisterModel=mongoose.model("user",registerSchema);

module.exports={
    RegisterModel
}