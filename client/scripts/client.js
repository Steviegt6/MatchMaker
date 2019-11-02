var socket = null

let gender = 'male'
let user = null

io.socket = io.connect('http://localhost:7777/', { // Make connection
  reconnect: false,
  autoconnect: false
})

io.socket.on('joinroom', function (data) {
  splash.style.display = 'none'
  chat.style.display = 'block'
  message.focus()

  io.socket.emit('join', data)
})

io.socket.on('message', function (data) {
  addChatMessage(`${data.username}: ${data.message}`)
})

io.socket.on('left', function (data) {
  addChatMessage(`${data} left.`)
})
