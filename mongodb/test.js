const URI = 'mongodb://localhost:27017/test'

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

MongoClient.connect(URI, (err, db) => {
  assert.equal(null, err)
  console.log('Connected correctly to server')
  insertDocuments(db, () => {
    updateDocument(db, () => {
      deleteDocument(db, () => {
        findDocuments(db, () => {
          db.close()
        })
      })
    })
  })
})

function insertDocuments (db, callback) {
  let collection = db.collection('documents')
  collection.insertMany([
    {a: 1}, {a: 2}, {a: 3}
  ], (err, result) => {
    assert.equal(err, null)
    assert.equal(3, result.result.n)
    assert.equal(3, result.ops.length)
    console.log('Inserted 3 documents into the document collection')
    callback(result)
  })
}

function updateDocument (db, callback) {
  let collection = db.collection('documents')
  collection.updateOne({a: 2}, {$set: {b: 1}},
    (err, result) => {
      assert.equal(err, null)
      assert.equal(1, result.result.n)
      console.log('Updated the document with the field a equal to 2')
      callback(result)
    })
}

function deleteDocument (db, callback) {
  let collection = db.collection('documents')
  collection.deleteOne({a: 3}, (err, result) => {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    console.log('Removed the document with the field a equal to 3')
    callback(result)
  })
}

function findDocuments (db, callback) {
  let collection = db.collection('documents')
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null)
    assert.equal(2, docs.length)
    console.log('Found the following records')
    console.dir(docs)
    callback(docs)
  })
}
