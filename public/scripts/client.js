var socket = null

io.socket = io.connect(document.URL, { // Make connection
  reconnect: false,
  autoconnect: false
})

io.socket.on('my event', function (data) {
  console.log('my event received')
})