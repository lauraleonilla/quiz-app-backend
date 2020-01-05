const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const config = require('./config')
const middleware = require('./utils/middleware')

const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const quizRouter = require('./routes/quiz')
const chatRouter = require('./routes/chat')

const app = express()

mongoose.set('useCreateIndex', true)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB', error.message)
  })

app.use(bodyParser.json())
app.use(
  morgan(':method :url :status :response-time ms - :res[content-length] :body')
)
morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(middleware.tokenExtractor)

app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/quiz', quizRouter)
app.use('/api/chat', chatRouter)

app.use(middleware.unknownEndpoint)

module.exports = app
