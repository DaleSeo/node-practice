const mongo = require('mongoskin')
const dbHost = '127.0.0.1'
const dbPort = 27017

const db = mongo.db('mongodb://' + dbHost + ':' + dbPort + '/test', {native_parser: true})

db.bind('tests')

db.tests.insertOne({date: new Date()}, (err, result) => {
  if (err) return console.error(err)
  db.tests.findById(result.ops[0]._id, (err, doc) => {
    if (err) return console.error(err)
    console.log(doc.date.constructor.name)
    console.log(doc.date)
    db.close()
  })
})
