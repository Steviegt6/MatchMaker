module.exports = class Room {
  constructor ({ name, users }) {
    this.name = name
    this.users = users
  }

  static getSocketRoomAndUser (socket) {
    for (const room of Room.rooms) {
      for (const user of room.users) {
        if (user.id === socket.id) {
          return [room, user]
        }
      }
    }
  }
}

module.exports.rooms = []
