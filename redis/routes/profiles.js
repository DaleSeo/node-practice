const express = require('express')
const router = express.Router()

const redis = require('redis')
const client = redis.createClient(6379, '127.0.0.1')

router.use((req, res, next) => {
  req.cache = client
  next()
})

router.post('/', (req, res) => {
  const accepts = req.accepts('application/json')
  console.log('accepts:', accepts)

  const key = req.body.name
  const value = JSON.stringify(req.body)

  req.cache.set(key, value, (err, data) => {
    if (err) {
      console.error(err)
      res.send('error:', err)
      return
    }
    req.cache.expire(key, 10)
    console.log(value)
    res.json(value)
  })
})

router.get('/:name', (req, res) => {
  const key = req.params.name

  req.cache.get(key, (err, data) => {
    if (err) {
      console.error(err)
      res.send('error:', err)
      return
    }
    const value = JSON.parse(data)
    res.json(value)
  })
})

module.exports = router
