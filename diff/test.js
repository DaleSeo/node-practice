const diff = require('diff')

var one = 'beep boop'
var other = 'beep boob blah'

var results = diff.diffChars(one, other)
console.log(results)

results.forEach(function(part){
  // green for additions, red for deletions
  // grey for common parts
  console.log('#part:', part)
  let color = part.added ? 'green' : part.removed ? 'red' : 'grey'
  console.log('#color:', color)
  //process.stderr.write(part.value[color]);
});

console.log()
