var arr = [0, 1, 2, 3, 4];
console.log("arr : " + arr);

// without initial value
var total = arr.reduce((prev, curr) => prev + curr);
console.log("total without initial value : " + total);

// with initial value
var total = arr.reduce((prev, curr) => prev + curr, 10);
console.log("total with initial value : " + total);

// convert a 2d array to a 1d array
var array2d = [[0, 1], [2, 3], [4, 5]];
var array1d = array2d.reduce((prev, curr) => prev.concat(curr), []);
console.log("array1d : " + array1d);

// count items in an array
var countObj = ['A', 'B', 'B', 'B', 'C', 'C'].reduce((prev, curr) => {
  prev[curr] = prev[curr] ? prev[curr] + 1 : 1;
  return prev;
}, {});
console.log("countObj : " + JSON.stringify(countObj));