const quizRouter = require('express').Router()
const Score = require('../models/score')
const User = require('../models/user')

quizRouter.post('/score', async (req, res, next) => {
  const score = req.body.score
  const userId = req.body.userId

  try {
    const user = await User.findById(userId)
    const newScore = new Score({
      score
    })
    const savedScore = await newScore.save()
    user.scores = user.scores.concat(savedScore._id)
    await user.save()
    res.json(savedScore.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = quizRouter