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

  it('should return the same array', function () {
    expect(expected.length).to.equal(current.length)
    for (let i = 0; i < expected.length; i++) {
      expect(expected[i]).equal(current[i])
    }
  })
})
