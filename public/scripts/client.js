var socket = null
let gender = null
let user = null

io.socket = io.connect(document.URL, { // Make connection
  reconnect: false,
  autoconnect: false
})

const maleButton = document.getElementById('male')
const femaleButton = document.getElementById('female')
const name = document.getElementById('name')
const startChattingButton = document.getElementById('done')

const message = document.getElementById('message')
const sendButton = document.getElementById('send')

maleButton.onclick = function () {
  gender = 'male'
}

femaleButton.onclick = function () {
  gender = 'female'
}

startChattingButton.onclick = function () {
  user = new User({name: name.value, gender: gender})
  
  io.socket.emit('registered', user)
}

sendButton.onclick = function () {
  io.socket.emit('message', message.value)
}

io.socket.on('my event', function (data) {
  console.log('my event received')
})