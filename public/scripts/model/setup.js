let gender = null
let user = null

// Setup Elements
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
  user = new User({name: name.value, gender: gender})
  
  io.socket.emit('registered', user)
}