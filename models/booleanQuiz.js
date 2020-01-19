const mongoose = require('mongoose')

const booleanSchma = mongoose.Schema({
  quizContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  ],
  name: String,
  passwordHash: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

booleanSchma.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const BooleanQuiz = mongoose.model('BooleanQuiz', booleanSchma)

module.exports = BooleanQuiz
