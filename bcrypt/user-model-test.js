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

User.remove({username: 'user123'}) // remove existing user
  .then(res => testUser.save())
  .then(user => User.findOne({username: 'user123'})) // fetch user and test password verification
  .then(user => {
    console.log('user:', user)
    // test a matching password
    user.verifyPassword('pass456', (err, isMatch) => {
      assert.ifError(err)
      console.log('pass456:', isMatch)
      assert.ok(isMatch)
    })
    // test a failing password
    user.verifyPassword('123456', (err, isMatch) => {
      assert.ifError(err)
      console.log('123456:', isMatch)
      assert.ok(!isMatch)
    })
  })
  .catch(err => console.error('Error!', err))
