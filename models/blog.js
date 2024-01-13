const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title : String,
    description : String,
    tags : [String],
    thumbnail : String
}, {timestamps : true})

const blog = mongoose.model("blog", blogSchema)

module.exports = blog