const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://user:pass@ds017514.mlab.com:17514/daleseo')

const personSchema = new Schema({
  _id: Number,
  name: String,
  age: Number,
  stories: [{
    type: Schema.Types.ObjectId,
    ref: 'Story'
  }]
})

const storySchema = new Schema({
  _creator: {
    type: Number, ref: 'Person'
  },
  title: String,
  fans: [{
    type: Number, ref: 'Person'
  }]
})

const Story = mongoose.model('Story', storySchema)
const Person = mongoose.model('Person', personSchema)

const aaron = new Person({_id: 0, name: 'Aaron', age: 100})
const story1 = new Story({
  title: 'Once upon a timex.',
  _creator: aaron._id
})
aaron.stories.push(story1);

aaron.save((err) => {
  if (err) return console.error(err)

  story1.save((err) => {
    if (err) return console.error(err)

    console.log('Saved')

    Story
      .findOne({title: 'Once upon a timex.'})
      .populate('_creator')
      .exec((err, story) => {
        if (err) return console.error(err)
        console.log("Story>> " + story)
      })

    Person
      .findOne({name: 'Aaron'})
      .populate('stories')
      .exec((err, person) => {
        if (err) return console.error(err)
        console.log("Person>> " + person)
      })
  })
})
