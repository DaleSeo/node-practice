const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()

app.use(session({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

app.get('/flash', (req, res) => {
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!')
  res.redirect('/')
})

app.get('/', (req, res) => {
  // Get an array of flash messages by passing the key to req.flash()
  res.send(req.flash('info'))
})

app.listen(3000, console.log.bind(console, 'Server is running.'))
