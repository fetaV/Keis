const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRegisterRouter = require("./routes/userRegister")
const userLoginRouter = require("./routes/userLogin")
const dateRangeRouter = require("./routes/dateRangeRouter") // Yeni route'u import et
const db_url =
  "mongodb+srv://vatef06:AZY4MOSAC2QcV9wM@cluster0.gpx2wri.mongodb.net/"
const port = 4001

const app = express()
app.use(express.json())
app.use(cors())
app.use("/login", userLoginRouter)
app.use("/register", userRegisterRouter)
app.use("/dateRange", dateRangeRouter) // Yeni route'u kullan

mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(port, () => {
  console.log(port, "server is running")
})
