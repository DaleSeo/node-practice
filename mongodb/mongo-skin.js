const mongo = require('mongoskin')
const dbHost = '127.0.0.1'
const dbPort = 27017

const db = mongo.db('mongodb://' + dbHost + ':' + dbPort + '/local', {native_parser: true})

db.bind('messages').bind({
  findOneAndAddText: (text, fn) => {
    db.collection('messages').findOne({}, (error, doc) => {
      if (error) {
        console.error(error)
        process.exit(1)
      }
      console.info('findOne:', doc)
      doc.text = text
      let id = doc._id.toString() // we can store ID in a string
      console.info('before saving:', doc)
      db.collection('messages').save(doc, (error, result) => {
        if (error) {
          console.error(error)
          process.exit(1)
        }
        console.info('save:', result.result)
        return fn(result, id)
      })
    })
  }
})

db.messages.findOneAndAddText('hi', function (count, id) {
  db.messages.find({_id: new mongo.ObjectID(id)}).toArray(function (error, docs) {
    if (error) {
      console.error(error)
      process.exit(1)
    }
    console.info('find:', docs)
    db.close()
    process.exit(0)
  })
})
