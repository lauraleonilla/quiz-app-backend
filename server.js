const app = require('./app')
const config = require('./config')
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)

app.set('socketio', io)

server.listen(`${config.PORT}`, () =>
  console.log(`Example app listening on port ${config.PORT}!`)
)

io.on('connection', socket => {
  console.log('a user connected')

  socket.on('chat', data => {
    console.log(data)
    io.emit('chat', data)
  })
  socket.on('typing', () => {
    console.log('User typing')
    socket.broadcast.emit('typing')
  })
})
