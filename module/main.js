/* Import a string */
var str = require('./str');
console.log(str);

/* Import an array */
var arr = require('./arr');
console.log(arr);

/* Import an object */
var obj = require('./obj');
console.log(obj);

/* Import a function */
var func = require('./func');
console.log(func(5));

/* Import multiple */
var multi = require('./multi');
console.log(multi.str);
console.log(multi.func(3));