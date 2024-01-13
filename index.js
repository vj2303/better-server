const express = require("express")
const cors = require("cors")

// Routes
const userRoute = require("./routes/user")
const testimonialRoute = require("./routes/testimonial")
const blogRoute = require("./routes/blog")

// Functions
const { connectToMongo } = require("./connections")

const PORT = 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cors())
connectToMongo("mongodb://127.0.0.1:27017/better-giving")
.then(console.log("Mongo connected"))
.catch(err => console.log(err.message))
app.use('/uploads',express.static('uploads'))

app.use("/api/user", userRoute)
app.use("/api/testimonials", testimonialRoute)
app.use("/api/blogs", blogRoute)

app.listen(PORT, () => console.log(`App is started at PORT:${PORT}`))