/**
 * https://nodejs.org/api/crypto.html#crypto_class_cipher
 * https://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password
 * https://nodejs.org/api/crypto.html#crypto_class_decipher
 */

const crypto = require('crypto')

const key = 'myKey'
const text = 'Learn Teach Code Seoul 2017'

console.log('#text:', text)

const cipher = crypto.createCipher('aes192', key)
let encryptedText = cipher.update(text, 'utf8', 'hex')
encryptedText += cipher.final('hex')

console.log('#encryptedText:', encryptedText)

const decipher = crypto.createDecipher('aes192', key)
let decryptedText = decipher.update(encryptedText, 'hex', 'utf8')
decryptedText += decipher.final('utf8')

console.log('#decryptedText:', decryptedText)
