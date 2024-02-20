const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

router.post("/", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) {
      return res.status(400).send("Bu e-posta adresi zaten kullanılıyor.")
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    }

    const createdUser = await User.create(newUser)
    res.json(createdUser)
  } catch (error) {
    res
      .status(400)
      .send("Kullanıcı oluşturulurken bir hata oluştu: " + error.message)
  }
})

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id
    const updatedUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }

    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    })

    if (!user) {
      return res.status(404).send("Kullanıcı bulunamadı")
    }

    res.json(user)
  } catch (error) {
    res
      .status(500)
      .send("Kullanıcı güncellenirken bir hata oluştu: " + error.message)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findByIdAndDelete(userId)

    if (!user) {
      return res.status(404).send("Kullanıcı bulunamadı")
    }

    res.json(user)
  } catch (error) {
    res
      .status(500)
      .send("Kullanıcı silinirken bir hata oluştu: " + error.message)
  }
})

module.exports = router
