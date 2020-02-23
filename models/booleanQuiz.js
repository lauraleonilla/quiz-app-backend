const mongoose = require('mongoose')

const booleanSchma = mongoose.Schema({
  quizTitle: {
    type: String,
    required: true,
    minlength: 5
  },
  questions: [
    {
      type: {
        type: String,
        required: true,
        default: 'boolean'
      },
      question: {
        type: String,
        required: true,
        minlength: 5
      },
      correctAnswer: {
        type: Boolean,
        required: true
      }
    }
  ],
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
  }
})

const BooleanQuiz = mongoose.model('BooleanQuiz', booleanSchma)

module.exports = BooleanQuiz
