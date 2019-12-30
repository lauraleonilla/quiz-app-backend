const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config')
const middleware = require('./utils/middleware')

const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const quizRouter = require('./routes/quiz')

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

app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/quiz', quizRouter)

app.use(middleware.unknownEndpoint)

app.listen(`${config.PORT}`, () =>
  console.log(`Example app listening on port ${config.PORT}!`)
)
