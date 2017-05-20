const assert = require('assert')
const mongoose = require('mongoose')
const User = require('./user-model')

const MONGODB_URI = 'mongodb://user:pass@ds147821.mlab.com:47821/dale-test'

mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI, function(err) {
  assert.ifError(err)
  console.log('Successfully connected to MongoDB')
})

const testUser = new User({
  username: 'user123',
  password: 'pass456'
})

console.log('testUser:', testUser)

User.remove({username: 'user123'}) // remove existing user
  .then(res => testUser.save())
  .then(user => {
    // test a matching password
    User.getAuthenticated('user123', 'pass456', function(err, user, reason) {
      // login was successful if we have a user
      if (user) {
        // handle login success
        console.log('login success')
      }
      assert.equal(reason, undefined)
    })

    // test a failing password
    User.getAuthenticated('user123', '123456', function(err, user, reason) {

      // otherwise we can determine why we failed
      var reasons = User.failedLogin
      console.log('reason:', reason)
      assert.equal(reason, 1)
    })
  })
  .catch(err => console.error('Error!', err))
