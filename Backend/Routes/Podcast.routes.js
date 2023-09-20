const express = require("express");
const podcastRouter = express.Router();
const { PodcastModel } = require("../Models/Podcast.model");
const { ProjectModel } = require("../Models/Project.model");

/* This routes will give all podcast of particular project */

podcastRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let data = await ProjectModel.find({ _id: id });
        if (data[0].userId === req.body.userId) {
            let all_podcast = await PodcastModel.find({ project_id: id });
            if (all_podcast.length > 0) {
                res.send(all_podcast)
            } else {
                res.send({ "message": "No podcast found" })
            }
        } else {
            res.send({ "message": "You are not authorized" });
        }
    } catch (err) {
        console.log(err);
        res.send({ "message": "Something went wrong" })
    }
})


/* This routes will add podcast to your project */

podcastRouter.post("/add/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let data = await ProjectModel.find({ _id: id });
        if (data[0].userId === req.body.userId) {
            let podcastData = new PodcastModel({ ...req.body, project_id: id });
            await podcastData.save();
            res.send({ "message": "Podcast added successfully" })
        } else {
            res.send({ "message": "You are not authorized" });
        }
    } catch (err) {
        console.log(err);
        res.send({ "message": "Something went wrong" })
    }
})


/* This routes will update your podcast of your project */

podcastRouter.patch("/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let podcastDoc = await PodcastModel.findById({ _id: id });
        if (podcastDoc) {
            if (podcastDoc.userId === req.body.userId) {
                let updationPodcast = await PodcastModel.findByIdAndUpdate({ _id: id }, req.body);
                if (updationPodcast) {
                    res.send({ "message": "Successfully updated your podcast" })
                } else {
                    res.send({ "message": "Podcast not found" })
                }
            } else {
                res.send({ "message": "You are not authorized" });
            }
        } else {
            res.send({ "message": "Podcast not found" })
        }
    } catch (err) {
        console.log(err);
        res.send({ "message": "Something went wrong" })
    }
})


/* This routes will delete your podcast of your project */

podcastRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let podcastDoc = await PodcastModel.findById({ _id: id });
        if (podcastDoc) {
            if (podcastDoc.userId === req.body.userId) {
                let deletingDoc = await PodcastModel.findByIdAndRemove({ _id: id });
                if (deletingDoc) {
                    res.send({ "message": "Podcast deleted successfully" })
                } else {
                    res.send({ "message": "Podcast not found" })
                }

            } else {
                res.send({ "message": "You are not authorized" });
            }
        } else {
            res.send({ "message": "Podcast not found" })
        }

    } catch (err) {
        console.log(err);
        res.send({ "message": "Something went wrong" })
    }
})
module.exports = { podcastRouter }