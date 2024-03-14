// server/index.js
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 4001

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://vatef06:AZY4MOSAC2QcV9wM@cluster0.gpx2wri.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

// Routes
app.use("/api", require("./routes/data"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
