const _ = require('lodash')
const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const FACEBOOK_APP_ID = '1947383138815462'
const FACEBOOK_APP_SECRET = 'ee53350df9b730ca7f6e40e9cf3d3ead'
const FACEBOOK_CALL_BACK = '/auth/facebook/callback'

passport.serializeUser(function (user, done) {
  done(null, user)
})
passport.deserializeUser(function (user, done) {
  done(null, user)
})
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: FACEBOOK_CALL_BACK
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('#accessToken:', accessToken)
    console.log('#refreshToken:', refreshToken)
    console.log('#profile:', profile)
    profile.accessToken = accessToken
    return cb(null, profile)
  }
))

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(session({
  secret: 'passport-facebook',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  console.log('#req.user:', req.user)
  console.log('#req.url:', req.url)
  next()
})

app.get('/', (req, res) => {
  res.render('index-facebook', {profile: req.user})
})

app.get('/login', (req, res) => {
  res.render('login-facebook')
})

app.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})

app.get('/auth/facebook',
  passport.authenticate('facebook', {
    authType: 'rerequest',
    scope: [
      'email',
      'user_friends'
    ]
  })
)

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

app.listen(8080, console.log.bind(console, 'Server is running.'))
