const mongoose = require("mongoose")

const daySchema = new mongoose.Schema({
  sabah: { type: Boolean, default: false },
  ogle: { type: Boolean, default: false },
  ikindi: { type: Boolean, default: false },
  aksam: { type: Boolean, default: false },
  yatsi: { type: Boolean, default: false },
})

const monthSchema = new mongoose.Schema({
  days: { type: Map, of: daySchema },
})

const dataSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  months: {
    January: monthSchema,
    February: monthSchema,
    March: monthSchema,
    April: monthSchema,
    May: monthSchema,
    June: monthSchema,
    July: monthSchema,
    August: monthSchema,
    September: monthSchema,
    October: monthSchema,
    November: monthSchema,
    December: monthSchema,
  },
})

module.exports = mongoose.model("Data", dataSchema)
