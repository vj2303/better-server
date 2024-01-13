const express = require("express")
const { handleCreateUser, handleLoginUser, handleGetUserById, handleMakeAdmin } = require("../controllers/user")
const { handleCheckUserIsLoginOrNot } = require("../middlewares/user")
const router = express.Router()

router.post("/", handleCreateUser)
router.post("/login", handleLoginUser)
router.get("/getUser", handleCheckUserIsLoginOrNot, handleGetUserById)
router.patch("/makeAdmin", handleCheckUserIsLoginOrNot, handleMakeAdmin)

module.exports = router