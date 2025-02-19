function personInfo() {
  console.log("Name: " + this.name + ", Age: " + this.age);
}

let person1 = {
  name: "Alice",
  age: 30
};

let person2 = {
  name: "Bob",
  age: 25
};

personInfo.call(person1);
personInfo.call(person2);

let personInfo2 = function() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
}

personInfo2.call(person1);
personInfo2.call(person2);
