const _ = require('lodash')
const expect = require('chai').expect

/**
 * Every vs. Some
 */
expect(_.every([1, 2, 3, 4], n => n % 2 === 0)).to.be.false
expect(_.some([1, 2, 3, 4], n => n % 2 === 0)).to.be.true

var fruits = [
  {
    name: 'apple',
    price: 1.99,
    onSale: true
  },
  {
    name: 'orange',
    price: 0.99,
    onSale: true
  }
];
expect(_.every(fruits, 'onSale', true)).to.be.true
expect(_.some(fruits, 'onSale', true)).to.be.true

var obj = {a: 1, b: 2, c: 3
};
expect(_.every(obj, n => n % 2 === 0)).to.be.false
expect(_.some(obj, n => n % 2 === 0)).to.be.true

/**
 * Fitler
 */
expect(_.filter(['a', 'b', 'c'], c => c > 'b')).to.be.eql(['c'])

var obj = {a: 1, b: 2, c: 3};

expect(_.filter(obj, n => n > 1)).to.be.eql([2, 3])

expect(_.filter('hello', c => c !== 'l')).to.be.eql(['h', 'e', 'o'])

expect(_.reject(['a', 'b', 'c'], c => c > 'b')).to.be.eql(['a', 'b'])

/**
 * Size
 */
expect(_.size([1, 2])).to.be.eql(2)

expect(_.size({a: 1, b: 2, c: 3
})).to.be.eql(3)

expect(_.size('hello')).to.be.eql(5)

/**
 * At
 */
expect(_.at({a: 1, b: 2, c: 3
}, ['a', 'c'])).to.be.eql([1, 3])

expect(_.at('hello', [1, 2])).to.be.eql(['e', 'l'])

/**
 * Includes
 */
expect(_.includes(['a', 'b', 'c'], 'a')).to.be.true
expect(_.includes(['a', 'b', 'c'], 'a', 1)).to.be.false
expect(_.includes({a: 1, b: 2, c: 3
}, 1)).to.be.true

expect(_.includes('hello', 'h')).to.be.true

/**
 * Sample
 */
expect(_.sample(['a', 'b', 'c'])).to.be.oneOf(['a', 'b', 'c'])
expect(_.sample({a: 1, b: 2, c: 3})).to.be.oneOf([1, 2, 3])
expect(_.sampleSize('hello', 2)).to.have.lengthOf(2)

/**
 * Shuffle
 */
expect(_.shuffle(['a', 'b', 'c'])).to.have.lengthOf(3)
expect(_.shuffle({a: 1, b: 2, c: 3})).to.have.lengthOf(3)
expect(_.shuffle('hello')).to.have.lengthOf(5)

/**
 * Partition
 */
expect(_.partition(['a', 'b', 'c'], c => c > 'a')).to.be.eql([['b', 'c'], ['a']])

expect(_.partition(fruits, 'onSale')).to.be.eql([fruits, []])

expect(_.partition('hello', c => c > 'l')).to.be.eql([['o'], ['h', 'e', 'l', 'l']])

/**
 * CountBy
 */
expect(_.countBy([1, 2, 3], n => n > 1)).to.be.eql({false: 1, true: 2})

expect(_.countBy({a: 1, b: 1, c: 2}, val => val / 2)).to.be.eql({1: 1, 0.5: 2})

expect(_.countBy('hello', c => c === 'l')).to.be.eql({false: 3, true: 2})

/**
 * GroupBy
 */
expect(_.groupBy([1, 2, 3], n => n > 1)).to.be.eql({false: [1], true: [2, 3]})

expect(_.groupBy({a: 1, b: 1, c: 2}, val => val / 2)).to.be.eql({0.5: [1, 1], 1: [2]})

expect(_.groupBy('hello', c => c === 'l')).to.be.eql({ false: [ 'h', 'e', 'o' ], true: [ 'l', 'l' ] })

/**
 * Map
 */
expect(_.map([1, 2, 3], n => n * 2)).to.be.eql([2, 4, 6])

var users = [
  {
    name: 'Alex'
  },
  {
    name: 'Bob'
  }
];

expect(_.map(users, 'name')).to.be.eql(['Alex', 'Bob'])
expect(_.map(users, {name: 'Alex'})).to.be.eql([true, false])

/**
 * Reduce
 */

 expect(_.reduce([1, 2, 3], (accumulator, value) => accumulator + value)).to.be.eql(6)
 expect(_.reduce([1, 2, 3], (accumulator, value) => accumulator + value, 100)).to.be.eql(106)

 expect(_.reduceRight('hello', (accumulator, value) => accumulator.toUpperCase() + value)).to.be.eql('OLLEh')
 expect(_.reduce('hello', (accumulator, value) => accumulator.toUpperCase() + value)).to.be.eql('HELLo')

 /**
  * Search
  */
var fruits = [
  {
    name: 'apple',
    price: 0.99,
    onSale: true
  },
  {
    name: 'orange',
    price: 1.99,
    onSale: false
  },
  {
    name: 'passion fruit',
    price: 4.99,
    onSale: false
  }
]

expect(_.find(fruits, f => f.price <= 2)).to.be.eql(fruits[0])

expect(_.find(fruits, 'onSale')).to.be.eql(fruits[0])

expect(_.find(fruits, 'name', 'apple')).to.be.eql(fruits[0])

expect(_.find(fruits, {name: 'apple', onSale: true})).to.be.eql(fruits[0])

expect(_.findLast('hello', c => c < 'f')).to.be.eql('e')

/**
 * Sort
 */
expect(_.sortBy([3, 2, 1])).to.be.eql([1, 2, 3])
expect(_.sortBy([-3, 2, 1], n => Math.abs(n))).to.be.eql([1, 2, -3])
expect(_.sortBy([-3, 2, 1], Math.abs)).to.be.eql([1, 2, -3])

var users = [
  {
    name: 'David',
    age: 28
  },
  {
    name: 'Alex',
    age: 30
  },
  {
    name: 'Bob',
    age: 28
  }
]

expect(_.sortBy(users, 'name')).to.be.eql([{name: 'Alex', age: 30}, {name: 'Bob', age: 28}, {name: 'David', age: 28}])

expect(_.sortBy(users, ['age', 'name'])).to.be.eql([{name: 'Bob', age: 28}, {name: 'David', age: 28}, {name: 'Alex', age: 30}])

expect(_.orderBy(users, ['age','name'], ['asc', 'desc'])).to.be.eql([{name: 'David', age: 28}, {name: 'Bob', age: 28}, {name: 'Alex', age: 30}])

/**
 * FlatMap
 */
expect(_.flatMap([1, 2], v => [v + 1, v - 1])).to.be.eql([2, 0, 3, 1])
