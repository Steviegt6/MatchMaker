// Chat Elements
const message = document.getElementById('message')
const sendButton = document.getElementById('send')

sendButton.onclick = function () {
  io.socket.emit('message', message.value)
}