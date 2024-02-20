const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).send("Kullanıcı adı veya Şifre yanlış")
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(401).send("Kullanıcı adı veya Şifre yanlış")
    }

    res.send("Kullanıcı Onaylandı, Giriş Yapıldı")
  } catch (error) {
    res.status(500).send("Giriş sırasında bir hata oluştu: " + error.message)
  }
})

module.exports = router
