function sortNames(namesArray) {
  return namesArray.sort((a, b) => a.localeCompare(b));
}

let names = ["Charlie", "Alice", "Bob"];
let sortedNames = sortNames(names);
console.log(sortedNames);

let names2 = ["charlie", "Alice", "bob", "David"];
let sortedNames2 = sortNames(names2);
console.log(sortedNames2);

let names3 = ["Émilie", "Alice", "Bob", "éve"];
let sortedNames3 = sortNames(names3);
console.log(sortedNames3);
