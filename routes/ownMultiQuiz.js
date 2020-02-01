const ownMultiQuiz = require('express').Router()
const Quiz = require('../models/multipleChoiceQuiz')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

ownMultiQuiz.post('/', async (req, res, next) => {
  const questions = req.body.questions
  const quizTitle = req.body.quizTitle
  const token = req.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const newQuiz = new Quiz({
      quizTitle: quizTitle,
      questions: questions,
      user: user._id
    })
    try {
      const savedQuiz = await newQuiz.save()
      user.booleanQuizzes = user.booleanQuizzes.concat(savedQuiz._id)
      await user.save()
      res.json(savedQuiz.toJSON())
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = ownMultiQuiz
