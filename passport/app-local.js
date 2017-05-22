const _ = require('lodash')
const path = require('path')
const express = require('express')
const logger = require('morgan')
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

passport.serializeUser(function (user, done) {
  done(null, user.username)
})
passport.deserializeUser(function (username, done) {
  try {
    let user = _.find(mockUsers, {username})
    return done(null, user)
  } catch (err) {
    return done(err)
  }
})
passport.use(new LocalStrategy(
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'passport-practice',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  console.log('#req.session:', req.session)
  console.log('#req.user:', req.user)
  if (req.url === '/login' || (req.session && req.user)) {
    return next()
  } else {
    return res.redirect('/login')
  }
})

app.get('/login', (req, res) => {
  res.render('login', {error: req.flash('error')})
})

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    successFlash: 'Successfully loged in.',
    failureRedirect: '/login',
    failureFlash: true
  })
)

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.get('/', (req, res) => {
  res.render('index', {success: req.flash('success')})
})

app.listen(3000, console.log.bind(console, 'Server is running.'))
