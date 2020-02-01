const mongoose = require('mongoose')

const multiChoiceSchma = mongoose.Schema({
  quizTitle: {
    type: String,
    required: true,
    minlength: 5
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
        minlength: 5
      },
      answers: [
        {
          answer: {
            type: String,
            required: true,
            minlength: 5,
            correct: Boolean
          }
        }
      ]
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

multiChoiceSchma.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const BooleanQuiz = mongoose.model('MultiChoiceQuiz', multiChoiceSchma)

module.exports = BooleanQuiz
