const maleButton = document.getElementById('male')
const femaleButton = document.getElementById('female')
const name = document.getElementById('name')
const startChattingButton = document.getElementById('done')
const message = document.getElementById('message')
const sendButton = document.getElementById('send')

startChattingButton.onclick = function () {
  user = new User({ name: name.value, gender: gender })

  io.socket.emit('registered', user)
  
  const setup = document.getElementById('setup')
  const chat = document.getElementById('chat')
  
  setup.style.display = 'none'
  chat.style.display = 'block'
}

sendButton.onclick = function () {
  io.socket.emit('message', message.value)
}

function updateGender () {
  const genderSelect = document.getElementById('gender')
  gender = genderSelect.options[genderSelect.selectedIndex].value
}

function addChatMessage(message) {
  const ul = document.getElementById('messages')
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(message))
  ul.appendChild(li)
}