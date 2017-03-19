const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  _id: Number,
  name: String,
  posts: [{
    type: Schema.Type.ObjectId,
    ref: 'Post'
  }]
})

const postSchema = Schema({
  _creator: {
    type: Number,
    ref: 'User'
  },
  title: String,
  text: String
})

const Post = mongoose.model('Post', postSchema)
const User = mongoose.model('User', userSchema)
User.findOne({name: /azat/i})
  .populate((err, user) => {
    if (err) throw err
    console.log(`The user has ${user.posts.length} post(s)`)
  })
