const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const fbUserSchema = mongoose.Schema({
  fbId: {
    type: Number,
    minlength: 2,
    unique: true
  },
  name: String
})

fbUserSchema.plugin(uniqueValidator)

fbUserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const fbUser = mongoose.model('fbUser', fbUserSchema)

module.exports = fbUser