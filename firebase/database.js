const firebase = require('firebase')

firebase.database.enableLogging(true);

module.exports = firebase.initializeApp({
  databaseURL: 'https://practice-52ad5.firebaseio.com'
}).database()
