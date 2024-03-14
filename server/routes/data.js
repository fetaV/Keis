// server/routes/data.js
const express = require("express")
const router = express.Router()
const Data = require("../models/Data")

// Add data
router.post("/addData/:year", async (req, res) => {
  try {
    const { year } = req.params
    const existingData = await Data.findOne({ year: year })

    let newData = req.body
    if (existingData) {
      newData = {
        ...existingData.toObject(),
        months: {
          ...existingData.months,
          ...req.body.months,
        },
      }
    }

    await Data.findOneAndUpdate({ year: year }, newData, { upsert: true })
    res.json({ message: "Data added successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
