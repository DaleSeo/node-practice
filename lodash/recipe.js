const _ = require('lodash')
const expect = require('chai').expect

/* Filter an object’s properties */
const fruits = {
  apple: {
    name: 'Apple',
    price: 2.99
  },
  orange: {
    name: 'Orange',
    price: 1.99
  },
  banana: {
    name: 'Banana',
    price: 0.5
  }
}

expect(_.pickBy(fruits, (fruit) => {
  return fruit.price > 2
})).to.be.eql({apple: fruits.apple})

expect(_.omitBy(fruits, (fruit, key) => {
  return key !== 'apple'
})).to.be.eql({apple: fruits.apple})

/* Create a unique array of objects */
const users = [
  {
    "name": "Alex",
    "age": 30
  },
  {
    "name": "Bob",
    "age": 28
  },
  {
    "name": "Alex",
    "age": 30
  }
]

expect(_.uniqBy(users, user => JSON.stringify(user))).to.be.lengthOf(2)

/* Convert an array to an object */
const array = [
  {
    "id": "user001",
    "name": "Alex"
  },
  {
    "id": "user002",
    "name": "Bob"
  }
]

let obj = _.reduce(array, (prev, curr) => {
  prev[curr.id] = curr
  return prev
}, {})
console.log(obj)
