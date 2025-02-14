const squareAndCube = (num) => ({ square: num * num, cube: num * num * num });

console.log(squareAndCube(5));   // Output: { square: 25, cube: 125 }
console.log(squareAndCube(2));   // Output: { square: 4, cube: 8 }
console.log(squareAndCube(10));  // Output: { square: 100, cube: 1000 }
