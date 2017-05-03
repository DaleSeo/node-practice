const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

app.get('/getCookie', (req, res) => {
  console.log(req.cookies)
  res.send(JSON.stringify(req.cookies))
})

app.get('/setCookie', (req, res) => {
  res.cookie('user', {
    email: 'dale.seo@gmail.com',
    name: 'Dale Seo',
    authorized: true
  })
  
  res.redirect('/getCookie')
})

app.listen(3000, _ => console.log('Server listening at port 3000'))