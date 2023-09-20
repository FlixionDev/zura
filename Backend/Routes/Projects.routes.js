const express = require("express");
const projectRouter = express.Router();
const { ProjectModel } = require("../Models/Project.model")
const ShortUniqueId = require('short-unique-id');

/* Getting all the project of logged in users */


projectRouter.get("/", async (req, res) => {
    const { userId } = req.body;
    try{
        let allProject = await ProjectModel.find({ userId });
        if (allProject.length > 0) {
            res.send({ allProject })
        } else {
            res.send({ "message": "No project found" })
        }
    }catch(err){
        console.log(err);
        res.status(500).send({ "message": "Something went wrong" })
    }
})


/* Create a new Project routes */

projectRouter.post("/", async (req, res) => {
    try {
        let projectData = new ProjectModel(req.body);
        await projectData.save();
        res.send({ "message": "Project successfully created" });
    } catch (err) {
        console.log(err);
        res.send({ "message": "Something went wrong" })
    }
})


/* Deleting a existing Project routes */

projectRouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        let data=await ProjectModel.findById({_id:id});
        if(data.userId===req.body.userId){
            let deletingDoc = await ProjectModel.findByIdAndRemove({_id:id});
            res.send({ "message": "Project deleted successfully" });
        }else{
            res.send({"message":"You are not authorized"});
        }
    } catch (err) {
        console.log(err);
        res.send({ "message": "Something went wrong" })
    }
})


module.exports = {
    projectRouter
}