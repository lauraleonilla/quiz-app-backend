const mongoose = require('mongoose')

const multiChoiceSchma = mongoose.Schema({
  quizTitle: {
    type: String,
    required: true,
    minlength: 3
  },
  questions: [
    {
      type: {
        type: String,
        required: true,
        default: 'multiple'
      },
      question: {
        type: String,
        required: true,
        minlength: 2
      },
      correct_answer: {
        type: Object,
        required: true,
        minlength: 1
      },
      incorrect_answers: [
        {
          answer: {
            type: String,
            required: true,
            minlength: 1
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
