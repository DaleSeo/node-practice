const mongo = require('mongodb')
const dbHost = '127.0.0.1'
const dbPort = 27017

const db = new mongo.Db('local', new mongo.Server(dbHost, dbPort))

db.open((error, conn) => {
  if (error) {
    console.error(error)
    process.exit(1)
  }
  db.stats((error, stats) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
    console.log('db state:', stats)
  })
  conn.collection('messages').findOne({}, (error, doc) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
    console.info('findOne:', doc)
    doc.text = 'hi'
    let id = doc._id.toString() // we can store ID in a string
    console.info('before saving:', doc)
    conn.collection('messages').save(doc, (error, result) => {
      if (error) {
        console.error(error)
        process.exit(1)
      }
      console.info('save:', result.result)
      conn.collection('messages').find({_id: new mongo.ObjectID(id)}).toArray((error, docs) => {
        if (error) {
          console.error(error)
          process.exit(1)
        }
        console.info('find:', docs)
        db.close()
        process.exit(0)
      })
    })
  })
})
