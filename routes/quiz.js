const quizRouter = require('express').Router()
const Score = require('../models/score')
const MultiQuiz = require('../models/multipleChoiceQuiz')
const BooleanQuiz = require('../models/booleanQuiz')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

quizRouter.get('/', async (req, res, next) => {
  try {
    const multiQuizTopics = await MultiQuiz.find({}, { quizTitle: 1 })
    const multiRes = multiQuizTopics.map(topic => topic.toJSON())
    const booleanQuizTopics = await BooleanQuiz.find({}, { quizTitle: 1 })
    const booleanRes = booleanQuizTopics.map(topic => topic.toJSON())
    const response = { multipleChoie: multiRes, boolean: booleanRes }
    res.send(response)
  } catch (exception) {
    next(exception)
  }
})

quizRouter.post('/score', async (req, res, next) => {
  const quiz = req.body.quiz
  const score = req.body.score
  const user = req.body.userId
  const token = req.token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }

    const existingScore = await Score.find({ quiz: quiz, user: user })

    if (existingScore && existingScore.length) {
      const filter = { user, quiz }
      const updatedScore = await Score.findOneAndUpdate(
        filter,
        { score: score },
        { new: true }
      )
      res.json({ message: 'Score updated', newScore: updatedScore })
    } else {
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
    }
  } catch (error) {
    next(error)
  }
})

module.exports = quizRouter
