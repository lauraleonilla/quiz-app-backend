const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config')

app.use(bodyParser.json())
app.use(
  morgan(':method :url :status :response-time ms - :res[content-length] :body')
)
morgan.token('body', (req, res) => JSON.stringify(req.body))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/quiz', (req, res) => res.send('LOLOLOL'))

app.listen(`${config.PORT}`, () => console.log(`Example app listening on port ${config.PORT}!`))