const maleButton = document.getElementById('male')
const femaleButton = document.getElementById('female')
const name = document.getElementById('name')
const startChattingButton = document.getElementById('done')
const message = document.getElementById('message')
const sendButton = document.getElementById('send')
const textarea = document.getElementById('messages')
const setup = document.getElementById('setup')
const status = document.getElementById('status')
const status_message = document.getElementById('status_message')

startChattingButton.onclick = function () {
  user = new User({ name: name.value, gender: gender })

  io.socket.emit('registered', user)

  setup.style.display = 'none'
  status.style.display = 'block'
  status_message.textContent = 'Searching for Partner..'
}

sendButton.onclick = function () {
  io.socket.emit('message', message.value)
  message.value = '' // Reset the input field on send.
}

function updateGender () {
  const genderSelect = document.getElementById('gender')
  gender = genderSelect.options[genderSelect.selectedIndex].value
}

function addChatMessage (message) {
  textarea.value += '\n' + message // Add a message on a new line to the text area.
  textarea.scrollTop = textarea.scrollHeight // Autoscroll with messages.
}
