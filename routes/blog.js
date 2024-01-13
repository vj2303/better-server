const express = require("express")
const { handleCreateBlog, handleGetAllBlogs, handleUpdateBlogWithId, handleDeleteBlogWithId, handleGetBlogById } = require("../controllers/blog")
const { blogThumbnailUpload } = require("../middlewares/upload")
const router = express.Router()

router.post("/", blogThumbnailUpload.single("thumbnail"), handleCreateBlog)
router.get("/", handleGetAllBlogs)
router.patch("/:id",blogThumbnailUpload.single("thumbnail"), handleUpdateBlogWithId)
router.delete("/:id", handleDeleteBlogWithId)
router.get("/:id", handleGetBlogById)

module.exports = router