const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fbUserRouter = require('express').Router()
const fbUser = require('../models/fbUser')

fbUserRouter.get('/', (req, res) => res.send('This will be login page'))

fbUserRouter.post('/', async (req, res, next) => {
  try {
    const fbId = req.body.fbId
    const name = req.body.name

    const user = new fbUser({
      fbId,
      name
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})


module.exports = fbUserRouter