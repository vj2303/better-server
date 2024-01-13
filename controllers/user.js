const user = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwt_secret = "^*$#&^*))This&*(&is&*&)(*%secret"

async function handleCreateUser(req, res) {
    try {
        const { email, password } = req.body
        console.log(req.body);
        if (!email || !password) {
            return res.json({ success: false, message: "Please Enter all info" })
        }
        const alreadyUserWithEmail = await user.findOne({ email })


        if (alreadyUserWithEmail) {
            return res.json({ success: false, message: "This email is already in use" })
        }
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt)

        const createdUser = await user.create({
            email, password: hashedPassword
        })

        const data = {
            user: {
                id: createdUser._id,
                email: createdUser.email,
                role: createdUser.role,
            }
        }
        const authToken = jwt.sign(data, jwt_secret)
        createdUser.password = undefined
        res.status(201).json({ success: true, createdUser, authToken })


    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


async function handleLoginUser(req, res) {
    try {
        const { email, password } = req.body
        console.log(req.body);
        if (!email || !password) {
            return res.json({ success: false, message: "Please Enter all info" })
        }
        const foundUser = await user.findOne({ email })
        if (!foundUser) {
            return res.json({ success: false, message: "Login with correct creds" })
        }

        const comPassword = await bcrypt.compare(password, foundUser.password)
        if (!comPassword) {
            return res.status(400).json({ success: false, message: "Login with correct creds" })
        }
        const data = {
            user: {
                id: foundUser._id,
                email: foundUser.email,
                role: foundUser.role,
            }

        }
        const authToken = jwt.sign(data, jwt_secret)
        foundUser.password = undefined
        res.status(200).json({ success: true, foundUser, authToken })


    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

async function handleGetUserById(req, res) {
    try {
        if (req.user) {
            const User = req.user
            res.status(200).json({success : true, User})   
        }else{
            res.json({ success : false, message : "Login with correct creds"})
        }
        
    }catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}

async function handleMakeAdmin(req, res) {
    try {
        if (req.user.role !== "SUPERADMIN") {
            console.log(req.user.role);
            return res.status(401).json({message : "You are not allowed to change role"})
        }
        const { email } = req.body
        if (req.user.email === email) {
            return res.status(401).json({message : "You are not allowed to change Your own role"})
            
        }
        const foundUser = await user.findOne({email})
        console.log(foundUser);
        if (!foundUser) {
            return res.status(401).message("User with this email do not exists")
            
        }

        const updatedUser = await user.updateOne({email}, {$set : {role : "ADMIN"}})
        return res.status(200).json({
            success : true,
            message : "Role has been changed to ADMIN"
        })
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}

    module.exports = {
        handleCreateUser,
        handleLoginUser,
        handleGetUserById,
        handleMakeAdmin
    }