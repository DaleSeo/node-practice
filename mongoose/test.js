const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', err => {
  console.log('#connected to MongoDB!')
})

const Article = mongoose.model('Article', {
  title: String,
  content: String,
  tags: Array,
  updated: Date
})

const toSave = {
  title: 'New Artilce',
  content: 'This is a new article!',
  tags: ['HTML', 'CSS', 'JS'],
  updated: new Date()
}

Article.create(toSave, (err, saved) => {
  console.log('#saved:', saved)
  const id = saved._id
  Article.findById(id, (err, found) => {
    console.log('#found:', found)
    Article.findByIdAndUpdate(id, {content: 'This is not a new article anymore!'}, (err, found) => {
      console.log('#updated!')
      Article.findByIdAndRemove(id, (err, found) => {
        console.log('#removed!')
        mongoose.disconnect(err => {
          console.log('#disconnected from MongoDB!')
        })
      })
    })
  })
})

Article.find({}, (err, articles) => {
  console.log('#articles:', articles)
})
