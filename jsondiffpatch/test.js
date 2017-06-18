const jsondiffpatch = require('jsondiffpatch')
const assert = require('assert')

var country = {
    name: "Argentina",
    capital: "Buenos Aires",
    independence: new Date(1816, 6, 9),
    unasur: true
}

var country2 = JSON.parse(JSON.stringify(country), jsondiffpatch.dateReviver)
country2.name = "Republica Argentina"
country2.population = 41324992
delete country2.capital

var delta = jsondiffpatch.diff(country, country2)
console.log('#delta:', delta)
assert.deepEqual(delta, {
    "name":["Argentina","Republica Argentina"], // old value, new value
    "population":[41324992], // new value
    "capital":["Buenos Aires", 0, 0] // deleted
})

jsondiffpatch.patch(country, delta)

// reverse diff
var reverseDelta = jsondiffpatch.reverse(delta)
// also country2 can be return to original value with: jsondiffpatch.unpatch(country2, delta);
console.log('#reverseDelta:', reverseDelta)

var delta2 = jsondiffpatch.diff(country, country2);
assert(delta2 === undefined)
