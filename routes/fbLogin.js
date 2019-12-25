const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fbloginRouter = require('express').Router()
const fbUser = require('../models/user')

fbloginRouter.get('/', (req, res) => res.send('This will be login page'))

fbloginRouter.post('/', async (req, res, next) => {
  try {
    const username = req.body.username
    const name = req.body.name

    const user = new fbUser({
      username,
      name
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})


module.exports = fbloginRouter