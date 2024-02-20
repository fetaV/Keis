const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const routerRegister = require("./routes/userRegister")
const routerLogin = require("./routes/userLogin")
const db_url =
  "mongodb+srv://vatef06:AZY4MOSAC2QcV9wM@cluster0.gpx2wri.mongodb.net/"
const port = 4001

const app = express()
app.use(express.json())
app.use(cors())
app.use("/login", routerLogin)
app.use("/register", routerRegister)

mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(port, () => {
  console.log(port, "server is running")
})
