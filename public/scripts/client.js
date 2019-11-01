var socket = null

let gender = null
let user = null
let room = null

io.socket = io.connect('http://localhost:7777/', { // Make connection
  reconnect: false,
  autoconnect: false
})

const pathname = window.location.pathname

if (pathname === '/index.html' || pathname === '/') {
  const maleButton = document.getElementById('male')
  const femaleButton = document.getElementById('female')
  const name = document.getElementById('name')
  const startChattingButton = document.getElementById('done')

  maleButton.onclick = function () {
    gender = 'male'
  }

  femaleButton.onclick = function () {
    gender = 'female'
  }

  startChattingButton.onclick = function () {
    user = new User({ name: name.value, gender: gender })

    io.socket.emit('registered', user)
  }
  
  io.socket.on('joinroom', function (data) {
    // Data being the room.
    console.log('Joining ' + data)
    io.socket.emit('join', data)
    
    room = data
    sessionStorage.setItem('room', data)

    window.location.href = 'chat.html'
  })
}

if (pathname === '/chat.html') {
  const message = document.getElementById('message')
  const sendButton = document.getElementById('send')

  sendButton.onclick = function () {
    io.socket.emit('message', {room: sessionStorage.getItem('room'), message: message.value})
  }
  
  io.socket.on('message', function (data) {
    console.log(data)
  })
}
