const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

const personSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String
  }
})

personSchema.virtual('fullName')
  .get(function() {
    return this.name.first + ' ' + this.name.last
  })
  .set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '))
    this.name.last = v.substr(v.indexOf(' ') + 1)
  })

const Person = mongoose.model('Person', personSchema)

const axl = new Person({
  name: {first: 'Axl', last: 'Rose'}
})

console.log(axl.toJSON())
console.log(axl.fullName)

axl.fullName = 'Dale Seo'
console.log(axl.name.first + ' ' + axl.name.last)
