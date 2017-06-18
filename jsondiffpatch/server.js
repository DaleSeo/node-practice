const http = require('http')
const jsondiffpatch = require('jsondiffpatch')

const server = http.createServer()

server.on('request', (req, res) => {
  var left = { a: 3, b: 4 }
  var right = { a: 5, c: 9 }
  var delta = jsondiffpatch.diff(left, right)
  const html = jsondiffpatch.formatters.annotated.format(delta, left)
  res.end(html)
})

server.listen(3000, _ => {
  console.log('Server is on')
})
