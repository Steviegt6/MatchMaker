const maleButton = document.getElementById('male')
const femaleButton = document.getElementById('female')
const name = document.getElementById('name')
const startChattingButton = document.getElementById('done')
const message = document.getElementById('message')
const sendButton = document.getElementById('send')
const textarea = document.getElementById('messages')
const setup = document.getElementById('setup')
const status = document.getElementById('status')
const statusMessage = document.getElementById('status_message')
const splash = document.getElementById('splash')
const chat = document.getElementById('chat')

startChattingButton.onclick = function () {
  if (name.value.length < 2 || name.value.length > 15) {
    return
  }

  user = new User({ name: name.value, gender: gender })

  io.socket.emit('registered', user)

  setup.style.display = 'none'
  status.style.display = 'block'
  statusMessage.textContent = 'Searching for Partner..'
}

sendButton.onclick = function () {
  updateChat()
}

function updateChat () {
  io.socket.emit('message', message.value)
  message.value = '' // Reset the input field on send.
}

document.addEventListener('keydown', keyPressed)

function keyPressed (e) {
  if (e.key === 'Enter') {
    updateChat()
  }
}

function updateGender () {
  const genderSelect = document.getElementById('gender')
  gender = genderSelect.options[genderSelect.selectedIndex].value
}

function addChatMessage (message) {
  textarea.value += '\n' + message // Add a message on a new line to the text area.
  textarea.scrollTop = textarea.scrollHeight // Autoscroll with messages.
}
