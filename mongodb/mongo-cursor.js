var MongoClient = require('mongodb').MongoClient,
  test = require('assert');

MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {

  // Create a collection
  var collection = db.collection('test_to_a_after_for_each');
  // Insert a document in the collection
  collection.insertMany([{a:1}, {a:2}, {a:3}], function(err, ids) {
    // Count of documents returned
    var count = 0;
    // Grab a cursor
    var cursor = collection.find();
    // Execute the each command, triggers for each document
    cursor.forEach(doc => {
      test.ok(doc != null)
      console.log(doc)
      count = count + 1
    }, err => {
      test.equal(null, err)
      test.equal(3, count)
      collection.drop(_ => {
        db.close()
      })
    })
  })
})
