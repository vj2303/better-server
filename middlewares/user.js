const jwt = require("jsonwebtoken")
const jwt_secret = "^*$#&^*))This&*(&is&*&)(*%secret"

async function handleCheckUserIsLoginOrNot(req, res, next) {
    try {
        const authToken = req.header('authToken');
        if (!authToken) {
            return res.json({ success: false, message: "Authenticate using correct creds" })
        }
        const data = jwt.verify(authToken, jwt_secret)
        req.user = data.user
        next()
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


module.exports = {
    handleCheckUserIsLoginOrNot
}