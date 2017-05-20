const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: {unique: true}
  },
  password: {
    type: String,
    required: true
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: {
    type: Number
  }
})

userSchema.virtual('isLocked')
  .get(function () {
    return this.lockUntil && this.lockUntil > Date.now()
  })

userSchema.pre('save', function (next) {
  let user = this
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_ROUNDS)
    .then(salt => {
      console.log('salt:', salt)
      bcrypt.hash(user.password, salt)
        .then(hash => {
          user.password = hash
          next()
        })
    })
})

userSchema.methods.verifyPassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password)
    .then(isMatch => cb(null, isMatch))
    .catch(err => cb(err))
}

userSchema.methods.incLoginAttempts = function (cb) {
  // if we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
      return this.update({
          $set: { loginAttempts: 1 },
          $unset: { lockUntil: 1 }
      }, cb)
  }
  // otherwise we're incrementing
  let updates = { $inc: { loginAttempts: 1 } }
  // lock the account if we've reached max attempts and it's not locked already
  if (!this.isLocked && this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS) {
      updates.$set = { lockUntil: Date.now() + LOCK_TIME };
  }
  return this.update(updates, cb);
}

const reasons = userSchema.statics.failedLogin = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2
}

userSchema.statics.getAuthenticated = function(username, password, cb) {
  this.findOne({ username: username })
    .then(user => {
      // make sure the user exists
      if (!user) {
        return cb(null, null, reasons.NOT_FOUND)
      }

      // check if the account is currently locked
      if (user.isLocked) {
        // just increment login attempts if account is already locked
        return user.incLoginAttempts(function(err) {
          return cb(null, null, reasons.MAX_ATTEMPTS)
        })
      }

      // test for a matching password
      user.verifyPassword(password, function(err, isMatch) {
          // check if the password was a match
          if (isMatch) {
            // if there's no lock or failed attempts, just return the user
            if (!user.loginAttempts && !user.lockUntil) {
              return cb(null, user)
            }
            // reset attempts and lock info
            var updates = {
                $set: { loginAttempts: 0 },
                $unset: { lockUntil: 1 }
            }
            return user.update(updates, function(err) {
                return cb(null, user)
            })
          } else {
            // password is incorrect, so increment login attempts before responding
            user.incLoginAttempts(function(err) {
              return cb(null, null, reasons.PASSWORD_INCORRECT)
            })
          }
      })
    })
    .catch(err => cb(err))
}

module.exports = mongoose.model('user', userSchema);
