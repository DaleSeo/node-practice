const _ = require('lodash')
const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy

const mockUsers = [
  { username: 'user', password: 'user1234' },
  { username: 'admin', password: 'admin1234' },
  { username: 'guest', password: 'guest1234' }
]

passport.use(new BasicStrategy(
  function(username, password, done) {
    // console.log(`username: ${username}, password: ${password}`)
    try {
      let user = _.find(mockUsers, {username})
      console.log('user:', user)
      if (!user) {
        return done(null, false, { message: 'incorrect username.' })
      }
      if (user.password !== password) {
        return done(null, false, { message: 'incorrect password.' })
      }
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }
))

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())

app.use(
  passport.authenticate('basic', { session: false }),
  (req, res, next) => {
    console.log('#req.user:', req.user)
    if (req.user) {
      return next()
    } else {
      return res.sendStatus(401)
    }
})

// curl "http://localhost:3000" -u admin:admin1234
app.get('/', (req, res) => {
  res.json(req.user)
})

app.listen(3000, console.log.bind(console, 'Server is running.'))
