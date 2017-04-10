const UserService = require('./UserService')
const db = require('./database')
const expect = require('chai').expect

describe('UserService', function () {
  let userService
  let testKey
  let testUser = {
    name: {
      first: 'Ada',
      last: 'Lovelace'
    }
  }

  before(function (done) {
    this.timeout(5000)
    userService = new UserService(db)
    done()
  })

  it('#find', function (done) {
    userService.find({}, users => {
      expect(Object.keys(users)).to.have.lengthOf(3)
      console.log(users)
      done()
    })
  })

  it('#create', function (done) {
    userService.create(testUser, key => {
      expect(key).to.not.be.null
      console.log(key)
      testKey = key
      done()
    })

  })

  it('#findOne', function (done) {
    userService.findOne(testKey, user => {
      expect(user).to.be.eql(testUser)
      console.log(user)
      done()
    })
  })

  it('#modify', function (done) {
    let modUser = {
      name: {
        first: 'Dale',
        last: 'Seo'
      }
    }
    userService.modify(testKey, modUser, _ => {
      done()
    })
  })

  it('#remove', function (done) {
    userService.remove(testKey, _ => {
      done()
    })
  })

  after(function (done) {
    db.goOffline()
    done()
  })

})
