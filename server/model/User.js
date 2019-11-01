module.exports = class User {
  constructor ({ id, name, gender }) {
    this.id = id
    this.name = name
    this.gender = gender
  }

  static disconnect (socket) {
    for (let i = 0; i < User.users.length; i++) {
      if (User.users[i].id === socket.id) {
        console.log(`${User.users[i].name} disconnected.`)
        User.users.splice(i, 1)
        break
      }
    }
  }
}

module.exports.users = []
