const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

const Tank = mongoose.model('Tank', new mongoose.Schema({
  name: 'string',
  size: 'string'
}))

// way 1 to save a document
const small = new Tank({size: 'small'})
small.save((err) => {
  if (err) return console.error(err)
})

// way 2 to save a document
Tank.create({size: 'large'}, (err, small) => {
  if (err) return console.error(err)
})

// Removing
Tank.remove({size: 'large'}, (err) => {
  if (err) return console.error(err)
})
