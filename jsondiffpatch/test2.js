const jsondiffpatch = require('jsondiffpatch')

var left = { a: 3, b: 4 }
var right = { a: 5, c: 9 }
var delta = jsondiffpatch.diff(left, right)

const html = jsondiffpatch.formatters.html.format(delta, left)
console.log(html)
