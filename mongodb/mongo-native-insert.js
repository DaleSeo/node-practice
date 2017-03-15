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
  let doc = {
    name: 'Dale'
  }
  conn.collection('messages').insert(doc, (error, result) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
    console.info('created/inserted:', result)
    db.close()
    process.exit(0)
  })
})
