class UserService {

  constructor (db) {
    this.userRef = db.ref('users')
  }

  find (query, callback) {
    this.userRef.once('value', snapshot => {
      callback(snapshot.val())
    })
  }

  create (user, callback) {
    let newUser = this.userRef.push()
    newUser.set(user).then(_ => {
      callback(newUser.key)
    })
  }

  findOne (key, callback) {
    this.userRef.child(key).once('value', snapshot => {
      callback(snapshot.val())
    })
  }

  modify (key, user, callback) {
    this.userRef.child(key).set(user).then(_ => {
      callback()
    })
  }

  remove (key, callback) {
    this.userRef.child(key).remove().then(_ => {
      callback()
    })
  }

}

module.exports = UserService
