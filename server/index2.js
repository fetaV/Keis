const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const PORT = 4001

mongoose.connect(
  "mongodb+srv://vatef06:AZY4MOSAC2QcV9wM@cluster0.gpx2wri.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

const ibadetSchema = new mongoose.Schema({
  tarih: Date,
  sabah: Boolean,
  ogle: Boolean,
  ikindi: Boolean,
  aksam: Boolean,
  yatsi: Boolean,
})

const Ibadet = mongoose.model("Ibadet", ibadetSchema)

app.use(bodyParser.json())
app.use(cors())

app.post("/ibadet-kaydet", async (req, res) => {
  try {
    const { tarih, ibadetler } = req.body

    // Belgeyi bul
    let existingIbadet = await Ibadet.findOne({ tarih })

    if (!existingIbadet) {
      // Eğer belge bulunamazsa, yeni bir belge oluştur
      await Ibadet.create({
        tarih,
        ...ibadetler,
      })
    } else {
      // Eğer belge bulunursa, güncelle
      await Ibadet.findOneAndUpdate(
        { tarih },
        { $set: ibadetler },
        { upsert: true }
      )
    }

    res.status(201).send("İbadet bilgisi başarıyla kaydedildi.")
  } catch (error) {
    res.status(500).send("İbadet bilgisi kaydedilirken bir hata oluştu.")
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
