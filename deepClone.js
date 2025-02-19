function deepClone(obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    console.error("Error during deep cloning:", error);
    return null;
  }
}

let originalObject = { name: "Alice", hobbies: ["reading", "traveling"] };
let clonedObject = deepClone(originalObject);

clonedObject.hobbies.push("coding");

console.log("Original:", originalObject);
console.log("Clone:", clonedObject);


let originalObject2 = {
    name: "Bob",
    address: {
        street: "123 Main St",
        city: "Anytown"
    }
};

let clonedObject2 = deepClone(originalObject2);
clonedObject2.address.city = "New City";

console.log("Original 2:", originalObject2);
console.log("Clone 2:", clonedObject2);


let objWithCircularRef = {};
objWithCircularRef.itself = objWithCircularRef;

let clonedCircular = deepClone(objWithCircularRef);
console.log("Cloned Circular:", clonedCircular);


let objWithFunction = {
    name: "Charlie",
    greet: function() { console.log("Hello, " + this.name); }
};

let clonedWithFunction = deepClone(objWithFunction);
console.log("Cloned with function:", clonedWithFunction);
