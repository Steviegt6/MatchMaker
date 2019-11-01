const express = require('express')
const socket = require('socket.io')

const app = express()
const port = process.env.PORT || 7777

app.use(express.static('client'))

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

const io = socket(server)

const User = require('./model/User.js')
const MatchMaker = require('./model/MatchMaker.js')
const Room = require('./model/Room.js')

io.on('connection', (socket) => {
  socket.on('registered', (data) => {
    const user = new User({ id: socket.id, name: data.name, gender: data.gender })

    User.users.push(user)

    const mm = new MatchMaker({ user: user, users: User.users })
    const match = mm.findMatch()

    if (match !== undefined) {
      // We found a match!

      const room = new Room({ name: 'room1', users: [user, match] })
      Room.rooms.push(room)

      io.to(socket.id).emit('joinroom', room.name)
      io.to(match.id).emit('joinroom', room.name)
    }

    console.log(`${data.name} joined (${Object.keys(User.users).length} users)`)
  })

  socket.on('join', (data) => {
    socket.join(data)
  })

  socket.on('message', (data) => {
    const [room, user] = Room.getSocketRoomAndUser(socket)

    io.to(room.name).emit('message', `${user.name}: ${data}`)
  })

  socket.on('disconnect', () => {
    User.disconnect(socket)
  })
})