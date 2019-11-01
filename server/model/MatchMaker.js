module.exports = class MatchMaker {
  constructor ({ user, users }) {
    this.user = user
    this.users = users
  }

  findMatch () {
    const males = this.users.filter(user => user.gender === 'male')
    const females = this.users.filter(user => user.gender === 'female')

    if (this.user.gender === 'male') {
      return females[Math.floor(Math.random() * females.length)]
    }

    if (this.user.gender === 'female') {
      return males[Math.floor(Math.random() * males.length)]
    }
  }
}
