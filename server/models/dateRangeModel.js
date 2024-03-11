// dateRangeModel.js
const mongoose = require("mongoose")

const dateRangeSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
})

const DateRangeModel = mongoose.model("DateRange", dateRangeSchema)

module.exports = DateRangeModel
