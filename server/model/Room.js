module.exports = class Room {
  constructor ({ name, users }) {
    this.name = name
    this.users = users
  }

  static getRoomAndUser (socket) {
    for (const room of Room.rooms) {
      for (const user of room.users) {
        if (user.id === socket.id) {
          return { room, user }
        }
      }
    }

    return {}
  }

  static removeUser (socket) {
    const rooms = Room.rooms
    for (let i = 0; i < rooms.length; i++) {
      for (let j = 0; j < rooms[i].users.length; j++) {
        if (rooms[i].users[j].id === socket.id) {
          rooms[i].users.splice(j, 1)

          // If there are no users left in the room, remove it.
          if (rooms[i].users.length === 0) {
            rooms.splice(i, 1)
            break
          }
        }
      }
    }
  }
}

module.exports.rooms = []
