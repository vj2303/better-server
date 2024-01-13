const multer = require("multer")

const blogThumbnailStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/`)
    },
    filename: function (req, file, cb) {
      const file_name = Date.now() + '-' + file.originalname
      req.body.thumbnail = file_name
      cb(null, file_name)
    }
  })
  

const reviewerLogoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/`)
    },
    filename: function (req, file, cb) {
      const file_name = Date.now() + '-' + file.originalname
      req.body.reviewer_logo = file_name
      cb(null, file_name)
    }
  })
  
  const blogThumbnailUpload = multer({ storage: blogThumbnailStorage })
  const reviewerLogoUpload = multer({ storage: reviewerLogoStorage })



  module.exports = {
    blogThumbnailUpload,
    reviewerLogoUpload
  }