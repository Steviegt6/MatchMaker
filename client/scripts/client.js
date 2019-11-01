var socket = null

let gender = 'male'
let user = null

io.socket = io.connect('http://localhost:7777/', { // Make connection
  reconnect: false,
  autoconnect: false
})

const pathname = window.location.pathname

const maleButton = document.getElementById('male')
const femaleButton = document.getElementById('female')

function updateGender () {
  const genderSelect = document.getElementById('gender')
  gender = genderSelect.options[genderSelect.selectedIndex].value
}

const name = document.getElementById('name')
const startChattingButton = document.getElementById('done')

startChattingButton.onclick = function () {
  user = new User({ name: name.value, gender: gender })

  io.socket.emit('registered', user)
}

io.socket.on('joinroom', function (data) {
  console.log('Joining ' + data)
  io.socket.emit('join', data)
})

const message = document.getElementById('message')
const sendButton = document.getElementById('send')

sendButton.onclick = function () {
  io.socket.emit('message', message.value)
}

io.socket.on('message', function (data) {
  const ul = document.getElementById('messages')
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(data))
  ul.appendChild(li)
})
