const testimonial = require("../models/testimonial")

async function handleCreateTestimonial(req, res) {
    try {
        const { review, reviewer, reviewer_profession, reviewer_logo } = req.body
        console.log({body : reviewer_logo});
        if(!review || !reviewer || !reviewer_profession || !reviewer_logo) {
           throw Error("Fill all the fields")
        }
        const Testimonial = await testimonial.create({
            review, reviewer, reviewer_profession, reviewer_logo
        })
        return res.status(201).json({
            success : true,
            createdTestimonial : Testimonial
        })
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

async function handleGetAllTestimonials(req, res) {
    try {
        const Testimonials = await testimonial.find({})
        return res.status(200).json({
            success : true,
            Testimonials
        })
        
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

async function handleUpdateTestimonialWithId(req, res) {
    try {
        const testimonialID = req.params.id
        const { review, reviewer, reviewer_profession, reviewer_logo } = req.body
        const updatedTestimonial = { review, reviewer, reviewer_profession, reviewer_logo }
        if (!testimonialID) {
            throw Error("Please provide Testimonial ID")
        }
        if (!updatedTestimonial) {
            throw Error("Please provide updated Testimonial")
        }
        const Testimonial = await testimonial.findByIdAndUpdate(testimonialID, updatedTestimonial)
        return res.status(200).json({
            success : true,
            message : "Testimonial Updated"
        })
        
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

async function handleDeleteTestimonialWithId(req, res) {
    try {
        const testimonialID = req.params.id
        if (!testimonialID) {
            throw Error("Please provide Testimonial ID")
        }
        const Testimonial = await testimonial.findByIdAndDelete(testimonialID)
        return res.status(200).json({
            success : true,
            message : "Testimonial Deleted"
        })
        
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

async function handleGetTestimonialById(req, res) {
    try {
        const testimonialID = req.params.id
        if (!testimonialID) {
            throw Error("Please provide Testimonial ID")
        }
        const Testimonial = await testimonial.findById(testimonialID)
        return res.status(200).json({
            success : true,
            Testimonial
        })
    
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

module.exports = {
    handleCreateTestimonial,
    handleGetAllTestimonials,
    handleUpdateTestimonialWithId,
    handleDeleteTestimonialWithId,
    handleGetTestimonialById
}