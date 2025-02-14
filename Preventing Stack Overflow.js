function factorial(n) {
  if (typeof n !== 'number' || isNaN(n) || n < 0) {
    console.error("Invalid input. Input must be a non-negative number.");
    return;
  }

  if (n === 0) {
    return 1;
  }

  return n * factorial(n - 1);
}

console.log(factorial(5));
console.log(factorial(0));
console.log(factorial(-5));
console.log(factorial("abc"));
console.log(factorial(10));
console.log(factorial(15));

try{
    const result = factorial(-1);
    if (result !== undefined){
        console.log("The result is: ", result);
    }
}catch(error){
    console.error("An error occurred: ", error);
}

try{
    const result = factorial(5);
    if (result !== undefined){
        console.log("The result is: ", result);
    }
}catch(error){
    console.error("An error occurred: ", error);
}
