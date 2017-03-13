const should = require('chai').should()
const foo = 'bar'
const beverages = {tea: ['chai', 'matcha', 'oolong']}

foo.should.be.a('string')
foo.should.equal('bar');
foo.should.have.lengthOf(3)
beverages.should.have.property('tea').with.lengthOf(3)
