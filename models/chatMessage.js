const mongoose = require('mongoose')

const chatMessageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  time: { type: Number },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
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
