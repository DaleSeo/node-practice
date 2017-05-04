const superagent = require('superagent')

/* GET /posts/1?q1=123&q2=ABC&q3=1%20A%2B */
superagent.get('http://jsonplaceholder.typicode.com/posts/1')
  .query({
    'q1': 123,
    'q2': 'ABC',
    'q3': '1 A+'
  })
  .then(res => {
    console.log('res:', res)
  })
  .catch(err => console.error(err))
