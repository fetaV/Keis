// dateRangeRouter.js
const express = require("express")
const router = express.Router()
const DateRangeModel = require("../models/dateRangeModel")

router.post("/", async (req, res) => {
  try {
    const { startDate, endDate } = req.body

    // Yeni bir DateRange oluştur
    const newDateRange = new DateRangeModel({
      startDate,
      endDate,
    })

    // Yeni DateRange'i kaydet
    const savedDateRange = await newDateRange.save()

    res.status(201).json(savedDateRange)
  } catch (error) {
    res
      .status(400)
      .send("Tarih aralığı oluşturulurken bir hata oluştu: " + error.message)
  }
})

module.exports = router
