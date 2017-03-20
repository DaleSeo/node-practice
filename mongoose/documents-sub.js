const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

const childSchema = new mongoose.Schema({name: String})

childSchema.pre('save', function (next) {
  if ('invalid' == this.name) return next(new Error('#sadpanda'))
  next()
})

const parentSchema = new mongoose.Schema({children: [childSchema]})

const Parent = mongoose.model('Parent', parentSchema)
const parent = new Parent({children: [{name: 'Matt'}, {name: 'Sarah'}]})
parent.children[0].name = 'Matthew'
parent.children.push({name: 'Liesl'})
parent.save((err) => {
  if (err) return console.error(err)
})

const invalidParent = new Parent({ children: [{ name: 'invalid' }] })
invalidParent.save(function (err) {
  console.log(err.message) // #sadpanda
})
