const _ = require('lodash')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const mockUsers = [
  { username: 'user', password: 'user1234' },
  { username: 'admin', password: 'admin1234' },
  { username: 'guest', password: 'guest1234' }
]

passport.initialize()
// passport.session()
// passport.serializeUser(function (user, done) {
//   done(null, user.username)
// })
// passport.deserializeUser(function (username, done) {
//   try {
//     let user = _.find(mockUsers, {username})
//     return(null, user)
//   } catch (err) {
//     return done(err)
//   }
// })
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(`username: ${username}, password: ${password}`)
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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'passport-practice',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'))
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFalsh: 'Successfully loged in.',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/', (req, res) => {
  res.send('<h1>Home</h1>')
})

app.listen(3000, console.log.bind(console, 'Server is running.'))
