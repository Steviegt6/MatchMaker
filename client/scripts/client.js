var socket = null

const gender = 'male'
const user = null

io.socket = io.connect('http://localhost:7777/', { // Make connection
  reconnect: false,
  autoconnect: false
})

io.socket.on('joinroom', function (data) {
  const splash = document.getElementById('splash')
  const chat = document.getElementById('chat')

  splash.style.display = 'none'
  chat.style.display = 'block'

  io.socket.emit('join', data)
})

io.socket.on('message', function (data) {
  addChatMessage(`${data.username}: ${data.message}`)
})

io.socket.on('left', function (data) {
  addChatMessage(`${data} left.`)
})
