const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const userName = req.body.userName
    const name = req.body.name
    const passWord = req.body.passWord

    if (!passWord || passWord.length < 3) {
      return res.status(400).json({
        error: 'Give a password with at least three characters'
      })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(passWord, saltRounds)

    const user = new User({
      username: userName,
      name: name,
      passwordHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter