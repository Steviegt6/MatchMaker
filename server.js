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

const users = {
  'wiGcv8qw': { name: 'Christina', gender: 'female'},
  'fgbj93De': { name: 'Alexa', gender: 'female'},
  'wpd38vwE': { name: 'Mark', gender: 'male'}
}

io.on('connection', (socket) => {
  //socket.join('my room')
  //io.to('my room').emit('my event');
  //console.log(io.sockets.adapter.rooms)

  socket.on('registered', (data) => {
    console.log(`${data.name} joined`)
    
    let user = new User({name: data.name, gender: data.gender})
    
    users[socket.id] = user
    
    const mm = new MatchMaker(user, users)
    mm.findMatch()
  })

  socket.on('disconnect', () => {
    delete users[socket.id]
  })
})
