const chatRouter = require('express.io')()
const ChatMessage = require('../models/chatMessage')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

chatRouter.http().io()

chatRouter.get('/', function(req, res) {
  req.io.route('hello')
})

chatRouter.io.route('hello', function(req) {
  req.io.route('hello-again')
})

chatRouter.io.route('hello-again', function(req) {
  req.io.respond({ hello: 'from io route' })
})

chatRouter.post('/', async (req, res, next) => {
  const message = req.body.message
  const token = req.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const newMessage = new ChatMessage({
      message: message,
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
