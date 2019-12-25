const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config')

const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const fbLoginRouter = require('./routes/fbLogin')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message)
  })

app.use(bodyParser.json())
app.use(
  morgan(':method :url :status :response-time ms - :res[content-length] :body')
)
morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/fblogin', fbLoginRouter)

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/quiz', (req, res) => res.send('LOLOLOL'))

app.listen(`${config.PORT}`, () => console.log(`Example app listening on port ${config.PORT}!`))