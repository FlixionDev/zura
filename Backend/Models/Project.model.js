const mongoose=require("mongoose");
const projectSechema=mongoose.Schema({
    projectName:{type:String,required:true},
    userId:{type:String,required:true}
},{
    versionKey:false
})

const ProjectModel=mongoose.model("project",projectSechema);

module.exports={
    ProjectModel
}