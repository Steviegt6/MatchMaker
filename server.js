const express = require('express')
const socket = require('socket.io')

const app = express()
const port = process.env.PORT || 7777

app.use(express.static('public'))

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

const io = socket(server)

const User = require('./model/User.js')

const users = {}

io.on('connection', (socket) => {
  //socket.join('my room')
  //io.to('my room').emit('my event');
  //console.log(io.sockets.adapter.rooms)

  socket.on('registered', (data) => {
    console.log(`${data.name} joined`)
    users[socket.id] = new User({name: data.name, gender: data.gender})
  })

  socket.on('disconnect', () => {
    console.log(`${users[socket.id].name} left`)
    delete users[socket.id]
  })
})
