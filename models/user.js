const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: function() {
      return !this.fbId
    },
    minlength: 2,
    unique: true
  },
  fbId: {
    type: Number,
    minlength: 2,
    unique: true,
    required: function() {
      return !this.username
    }
  },
  name: String,
  passwordHash: String,
  scores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Score'
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatMessage'
    }
  ],
  booleanQuizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BooleanQuiz'
    }
  ],
  multiQuizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MultiChoiceQuiz'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
