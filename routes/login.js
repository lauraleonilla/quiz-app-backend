const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const userName = req.body.userName
  const passWord = req.body.passWord
  const fbId = req.body.fbId
  const name = req.body.name

  if (req.body.fbId) {
    const fbuser = await User.findOne({ fbId: fbId }).populate('scores')
    if (!fbuser) {
      const user = new User({
        name: name,
        fbId: fbId
      })
      const savedUser = await user.save()
      res.json(savedUser)
    }
    const userForToken = {
      name: fbuser.name,
      id: fbuser._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({
      token,
      name: fbuser.name,
      id: fbuser.id,
      scores: fbuser.scores
    })
  } else {
    const user = await User.findOne({ username: userName }).populate('scores')
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(passWord, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'Invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({
      token,
      username: user.username,
      name: user.name,
      id: user.id,
      scores: user.scores
    })
  }
})

module.exports = loginRouter
