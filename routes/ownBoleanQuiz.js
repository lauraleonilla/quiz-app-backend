const ownBooleanQuiz = require('express').Router()
const Quiz = require('../models/booleanQuiz')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

ownBooleanQuiz.post('/', async (req, res, next) => {
  const questions = req.body.questions
  const quizTitle = req.body.quizTitle
  const token = req.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    console.log('Here we are!', questions, user)
    const newQuiz = new Quiz({
      quizTitle: quizTitle,
      questions: questions,
      user: user._id
    })
    const savedQuiz = await newQuiz.save()
    user.booleanQuizzes = user.booleanQuizzes.concat(savedQuiz._id)
    await user.save()
    res.json(savedQuiz.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = ownBooleanQuiz
