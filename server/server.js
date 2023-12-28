require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const mongoose = require('mongoose')
const connectDB = require("./config/dbConn")
const PORT = process.env.PORT || 4546
const app = express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/users", require("./routes/UsersRoute"))
app.use("/api/todos",require("./routes/TodosRoute"))
app.use("/api/photos",require("./routes/PhotosRoute"))
app.use("/api/posts",require("./routes/PostsRoute"))

app.get("/", (req, res) => {
    res.send("this is the home page")
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})


