function Person(name, age) {
  this.name = name;
  this.age = age;

  this.displayInfo = function() {
    console.log("Name: " + this.name + ", Age: " + this.age);
  };

  this.boundDisplayInfo = this.displayInfo.bind(this);
}

let person1 = new Person("Alice", 30);

person1.displayInfo();

person1.boundDisplayInfo();


const showInfo = person1.displayInfo;
showInfo();

const showInfoBound = person1.boundDisplayInfo;
showInfoBound();

function Person2(name, age) {
    this.name = name;
    this.age = age;

    this.displayInfo = () => {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    };

    this.boundDisplayInfo = this.displayInfo.bind(this);
}

let person2 = new Person2("Bob", 25);
person2.displayInfo();
person2.boundDisplayInfo();
