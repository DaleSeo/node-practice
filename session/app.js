const express = require('express')
const expressSession = require('express-session')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}))

app.get('/', (req, res) => {
  if (req.session.user) {
    res.send(`<h1>Hello! ${req.session.user.id}</h1><a href="/logout">Log out</a>`)
  } else {
    res.redirect('/login')
  }
})

app.all('/login', (req, res, next) => {
  if (req.session.user) {
    console.log('Already logged in')
    res.redirect('/')
  } else {
    next()
  }
})

app.get('/login', (req, res) => {
  res.send('<form method="POST"><input name="id"/><input name="pw"/><input type="submit"/></form>')
})

app.post('/login', (req, res) => {
  req.session.user = {
    id: req.body.id,
    pw: req.body.pw,
    authorized: true
  }

  res.redirect('/')
})

app.all('/logout', (req, res) => {
  if (!req.session.user) {
    console.log('Already logged out')
    return res.redirect('/')
  }

  req.session.destroy(err => {
    if (err) return console.error(err)
    res.redirect('/')
  })
})

app.listen(3000, () => console.log('Server is listening'))
