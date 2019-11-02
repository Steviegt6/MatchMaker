const express = require('express')
const socket = require('socket.io')

const app = express()
const port = process.env.PORT || 7777

app.use(express.static('client'))

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

const io = socket(server)

const Utils = require('./model/Utils.js')
const User = require('./model/User.js')
const MatchMaker = require('./model/MatchMaker.js')
const Room = require('./model/Room.js')

io.on('connection', (socket) => {
  socket.on('registered', (data) => {
    if (data.name === undefined || data.gender === undefined) { return }

    if (data.name.length < 2 || data.name.length > 15) { return }

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
    if (data === undefined) return
    if (data.length < 1) return

    const { room, user } = Room.getRoomAndUser(socket)

    // We cannot trust that the client will always give the correct data.
    if (room !== undefined && user !== undefined) {
      io.to(room.name).emit('message', { username: user.name, message: data })
    }
  })

  socket.on('disconnect', () => {
    const { room, user } = Room.getRoomAndUser(socket)

    // Will always be undefined when a user is not in a room.
    if (room !== undefined && user !== undefined) {
      Room.removeUser(socket)
      io.to(room.name).emit('left', user.name)
    }

    User.disconnect(socket)
  })
})
