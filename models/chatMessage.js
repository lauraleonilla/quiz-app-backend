const mongoose = require('mongoose')

const chatMessageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  time: { type: Date, default: Date.now }
})

chatMessageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema)

module.exports = ChatMessage
