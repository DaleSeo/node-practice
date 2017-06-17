/**
 * https://nodejs.org/api/crypto.html#crypto_class_hash
 * https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm 
 */
const crypto = require('crypto')

function genHash (algo, text) {
  const hash = crypto.createHash(algo)
  hash.update(text)
  return hash.digest('hex')
}

console.log(genHash('md5', 'Learn Teach Code Seoul 2017'))
