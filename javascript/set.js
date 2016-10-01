// Convert an array to a set
var set = new Set([1, 2, 3]);
console.log(set);

// Convert a set to an array
var arr = [...set];
// var arr = Array.from(set);
console.log(arr);

let setA = new Set([1, 2, 3]);
let setB = new Set([3, 4, 5]);
console.log(">>> setA : " + setA);
console.log(">>> setB : " + setB);

// Difference
let difference = [...setA].filter(x => !setB.has(x));
console.log(">>> difference : " + difference);

// Intersection
let intersection = [...setA].filter(x => setB.has(x));
console.log(">>> intersection : " + intersection);