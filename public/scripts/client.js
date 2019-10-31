var socket

io.socket = io.connect(document.URL, { // Make connection
  reconnect: false,
  autoconnect: false
})

const sendButton = document.getElementById('send')

sendButton.onclick = function () {
  const message = document.getElementById('message').value
  io.socket.emit('message', message)
}

io.socket.on('my event', function (data) {
  console.log('my event received')
})