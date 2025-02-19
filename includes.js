function checkElement(arr, element) {
  return arr.includes(element);
}

let myArray = [10, 20, 30, 40];
let elementToCheck = 20;
let result = checkElement(myArray, elementToCheck);
console.log(result);

elementToCheck = 50;
result = checkElement(myArray, elementToCheck);
console.log(result);


let myArray2 = ["apple", "banana", "cherry"];
let elementToCheck2 = "banana";
let result2 = checkElement(myArray2, elementToCheck2);
console.log(result2);

elementToCheck2 = "grape";
result2 = checkElement(myArray2, elementToCheck2);
console.log(result2);
