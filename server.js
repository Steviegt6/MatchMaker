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
const MatchMaker = require('./model/MatchMaker.js')
const Room = require('./model/Room.js')

/* const users = [
  { id: 'wiGcv8qw', name: 'Christina', gender: 'female' },
  { id: 'fgbj93De', name: 'Alexa', gender: 'female' },
  { id: 'wpd38vwE', name: 'Mark', gender: 'male' }
] */

const users = []
const rooms = []

io.on('connection', (socket) => {
  socket.on('registered', (data) => {
    const user = new User({ id: socket.id, name: data.name, gender: data.gender })
    console.log(user)

    users.push(user)

    const mm = new MatchMaker(user, users)
    const match = mm.findMatch()

    if (match !== undefined) {
      // We found a match!
      console.log(match)
      
      const room = new Room({name: 'room1', sockets: [socket.id, match.id]})
      
      rooms.push(room)

      io.to(socket.id).emit('joinroom', room.name)
      io.to(match.id).emit('joinroom', room.name)
    }

    console.log(`${data.name} joined (${Object.keys(users).length} users)`)
  })

  socket.on('join', (data) => {
    socket.join(data)
  })
  
  socket.on('message', (data) => {
    console.log(data)
    io.to(data.room).emit('message', data.message)
  })

  socket.on('disconnect', () => {
    delete users[socket.id]
    console.log(`A user disconnected. (${Object.keys(users).length} users)`)
  })
})
