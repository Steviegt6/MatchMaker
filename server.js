const express = require('express')
const socket = require('socket.io')

const app = express()
const port = process.env.PORT || 7777

app.use(express.static('public'))

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

const io = socket(server)

io.on('connection', (socket) => {
  console.log(`${socket.id} joined`)
  socket.join('my room')
  io.to('my room').emit('my event');

  socket.on('message', (data) => {
    console.log(data)
  })

  socket.on('disconnect', () => {
    console.log(`${socket.id} left`)
  })
})
