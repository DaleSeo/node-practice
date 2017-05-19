const crypto = require('crypto')

const genSalt = function (length) {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0, length)
}

const genHash = function (text, salt) {
  const hmac = crypto.createHmac('sha512', salt)
  return hmac.update(text).digest('hex')
}

const encryptPassword = function (password) {
  const salt = genSalt(16)
  const hash = genHash(password, salt)
  return {
    salt, hash
  }
}

function verifyPassword (inPassword) {
  const password = encryptPassword(inPassword) // shoud get salt & hash from DB
  const inHash = genHash(inPassword, password.salt)
  return password.hash === inHash
}

console.log(encryptPassword('MYPASSWORD'))
console.log(encryptPassword('MYPASSWORD'))

console.log(verifyPassword('MYPASSWORD'))
