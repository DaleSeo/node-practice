const expect = require('expect.js')

let expected, current

before(function () {
  console.log('before')
  expected = ['a', 'b', 'c']
})

describe('String#split', function () {
  beforeEach(function () {
    console.log('beforeEach')
    current = 'a,b,c'.split(',')
  })

  it('should return an array', function () {
    expect(Array.isArray(current)).to.be.true
  })
})
