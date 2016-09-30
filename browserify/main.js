/* custom module */
var exp = require('./exp');
console.log(exp.str);
console.log(exp.func(3));

/* external module */
var unique = require('uniq');
var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];
console.log(unique(data));