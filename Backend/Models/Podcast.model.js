const mongoose = require("mongoose");
const podcastSchema = mongoose.Schema({
    title: {type:String,required:true},
    description: {type:String,required:true},
    project_id:{type:String,required:true},
    userId:{type:String,required:true}
}, {
    versionKey: false
})

const PodcastModel = mongoose.model("podcast", podcastSchema);

module.exports = {
    PodcastModel
}