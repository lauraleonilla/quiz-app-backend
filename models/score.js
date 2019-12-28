const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema({
  score: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

scoreSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Score = mongoose.model('Score', scoreSchema)

module.exports = Score