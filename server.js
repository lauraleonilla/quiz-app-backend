const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config')

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/quiz', (req, res) => res.send('LOLOLOL'))

app.listen(`${config.PORT}`, () => console.log(`Example app listening on port ${config.PORT}!`))