const mongoose = require("mongoose")

const testimonialSchema = mongoose.Schema({
    review : String,
    reviewer : String,
    reviewer_logo : String,
    reviewer_profession : String
}, {timestamps : true})

const testimonial = mongoose.model("testimonial", testimonialSchema)

module.exports = testimonial