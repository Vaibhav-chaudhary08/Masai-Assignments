function multiplyNumbers(a, b) {
  return function(x, y) {
    return x * y;
  }.apply(null, [a, b]); 
}

let result = multiplyNumbers(5, 3);
console.log(result);

result = multiplyNumbers(10, 2);
console.log(result);
