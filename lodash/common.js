const _ = require('lodash')
const expect = require('chai').expect

/* Predicates */

let f = _.matches('hello')
expect(f('world')).to.be.false
expect(f('hello')).to.be.true

f = _.matches([{a: 1}, {b: 2}])
expect(f([{a: 1}, {b: 3}])).to.be.false
expect(f([{a: 1}, {b: 2}])).to.be.true

expect(_.matchesProperty('name', 'Alex')({name: 'Alex'})).to.be.true

expect(_.matchesProperty('length', 5)('hello')).to.be.true

expect(_.matchesProperty('user.name', 'Alex')({user: {name: 'Alex'}})).to.be.true

expect(_.property('name')({name: 'Alex'})).to.be.equal('Alex')

const users = [
  {
    name: 'Alex',
    age: 30,
    is_premium: false
  },
  {
    name: 'Bob',
    age: 20,
    is_premium: true
  },
  {
    name: 'Mary',
    age: 25,
    is_premium: false
  }
]

expect(_.find(users, user => user.age > 18)).to.be.equal(users[0])

expect(_.find(users, 'is_premium')).to.be.equal(users[1])

expect(_.find(users, {name: 'Alex'})).to.be.equal(users[0])

/* Iteratees */

expect(_.map([1, 2, 3], n => n * 3)).to.be.eql([3, 6, 9])

expect(_.map(users, {name: 'Alex'})).to.be.eql([true, false, false])
expect(_.map(users, ['name', 'Alex'])).to.be.eql([true, false, false])
expect(_.map(users, 'name')).to.be.eql(['Alex', 'Bob', 'Mary'])
