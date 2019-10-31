module.exports = class MatchMaker {
  constructor (user, users) {
    this.user = user
    this.users = users
  }
  
  findMatch() {
    let males = []
    let females = []
    
    for (const [key, value] of Object.entries(this.users)) {
      if (value.gender === 'male') {
        males.push(key)
      }
      
      if (value.gender === 'female') {
        females.push(key)
      }
    }
    
    if (this.user.gender === 'male') {
      let female = females[Math.floor(Math.random()*females.length)]
      console.log(this.users[female].name)
    }
    
    if (this.user.gender === 'female') {
      let male = males[Math.floor(Math.random()*males.length)]
      console.log(this.users[male].name)
    }
  }
}