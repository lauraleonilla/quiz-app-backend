const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  const userName = req.body.userName
  const name = req.body.name
  const passWord = req.body.passWord

  try {
    if (!passWord || passWord.length < 3) {
      return res.status(400).json({
        error: 'Give a password with at least three characters'
      })
    }

    let passwordHash = null
    if (passWord) {
      const saltRounds = 10
      passwordHash = await bcrypt.hash(passWord, saltRounds)
    }

    const user = new User({
      username: userName,
      name: name,
      passwordHash
    })

    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    res.status(500).json({ messsage: 'Error with creating a user' })
  }
})

module.exports = usersRouter
