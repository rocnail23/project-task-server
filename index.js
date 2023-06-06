const express = require("express")
require("dotenv").config()
const cors = require("cors")
const connectDb = require("./config/db")
const app = express()



const PORT = process.env.PORT || 4000
app.use(cors())
connectDb()
app.use(express.json())
app.use("/api/user", require("./routes/user"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/project", require("./routes/project"))
app.use("/api/task", require("./routes/task"))
app.listen(PORT, () => {
    console.log("escuchando en el puerto " + PORT)
})

