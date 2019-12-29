const quizRouter = require('express').Router()
const Score = require('../models/score')
const User = require('../models/user')

quizRouter.post('/score', async (req, res, next) => {
  const quiz = req.body.quiz
  const score = req.body.score
  const user = req.body.userId
  const existingScore = await Score.find({ quiz: quiz, user: user })

  if (existingScore && existingScore.length) {
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
  } else {
    try {
      const findUser = await User.findById(user)
      const newScore = new Score({
        quiz,
        score,
        user
      })
      const savedScore = await newScore.save()
      findUser.scores = findUser.scores.concat(savedScore._id)
      await findUser.save()
      res.json(savedScore.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

module.exports = quizRouter
