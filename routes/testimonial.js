const express = require("express")
const { handleCreateTestimonial, handleGetAllTestimonials, handleUpdateTestimonialWithId, handleDeleteTestimonialWithId, handleGetTestimonialById } = require("../controllers/testimonial")
const { reviewerLogoUpload } = require("../middlewares/upload")
const router = express.Router()

router.post("/", reviewerLogoUpload.single("reviewer_logo"), handleCreateTestimonial)
router.get("/", handleGetAllTestimonials)
router.patch("/:id", reviewerLogoUpload.single("reviewer_logo"), handleUpdateTestimonialWithId)
router.delete("/:id", handleDeleteTestimonialWithId)
router.get("/:id", handleGetTestimonialById)

module.exports = router