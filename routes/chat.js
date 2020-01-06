const chatRouter = require('express').Router()
const ChatMessage = require('../models/chatMessage')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

chatRouter.get('/', async (req, res, next) => {
  try {
    const messages = await ChatMessage.find({}).populate('user')
    res.json(messages.map(message => message.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

chatRouter.post('/', async (req, res, next) => {
  const message = req.body.message
  const time = req.body.time
  const token = req.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const newMessage = new ChatMessage({
      message: message,
      time: time,
      user: user._id
    })
    const savedMessage = await newMessage.save()
    user.messages = user.messages.concat(savedMessage._id)
    await user.save()
    res.json(savedMessage.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = chatRouter
