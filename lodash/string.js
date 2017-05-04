const _ = require('lodash')
const expect = require('chai').expect

/* interpolate */
let tpl = _.template('Hello, <%= name %>, the total amount is <%= order.amount + 10 %>.');
let result = tpl({
  name: 'Alex',
  order: {
    amount: 100
  }
})
expect(result).to.be.eql('Hello, Alex, the total amount is 110.')

/* escape */
tpl = _.template('<div><%- markup %></div>');
result = tpl({
  markup: '<span>Hello</span>'
})
expect(result).to.be.eql('<div>&lt;span&gt;Hello&lt;/span&gt;</div>')

/* evaluate */
tpl = _.template('<% if (a > 0) { %> Good! <% } else { %> Bad! <% } %>');
result = tpl({
  a: 1
})
expect(result).to.be.eql(' Good! ')
result = tpl({
  a: -1
})
expect(result).to.be.eql(' Bad! ')

/* imports */
tpl = _.template('Hi, <%= user %>, you should pay <%= amount * discount %>.', {
  imports: {
    discount: 0.8
  }
})
result = tpl({
  user: 'Alex',
  amount: 100
})
expect(result).to.be.eql('Hi, Alex, you should pay 80.')
