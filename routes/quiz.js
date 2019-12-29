const quizRouter = require('express').Router()
const Score = require('../models/score')
const User = require('../models/user')

quizRouter.post('/score', async (req, res, next) => {
  const quiz = req.body.quiz
  const score = req.body.score
  const userId = req.body.userId

  try {
    const user = await User.findById(userId)
    const newScore = new Score({
      quiz,
      score,
      user
    })
    const savedScore = await newScore.save()
    user.scores = user.scores.concat(savedScore._id)
    await user.save()
    res.json(savedScore.toJSON())
  } catch (exception) {
    next(exception)
  }
})

quizRouter.put('/score', async (req, res, next) => {
  const quiz = req.body.quiz
  const user = req.body.userId
  const score = req.body.score
  const filter = { user, quiz }
  try {
    const updatedScore = await Score.findOneAndUpdate(
      filter,
      { score: score },
      {
        new: true
      }
    )
    res.json(updatedScore.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = quizRouter
