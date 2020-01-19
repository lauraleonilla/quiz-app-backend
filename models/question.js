const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    minlength: 5
  }
})

questionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
