const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/quiz', (req, res) => res.send('LOLOLOL'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))