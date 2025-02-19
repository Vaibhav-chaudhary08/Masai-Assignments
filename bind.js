function setTimeoutGreeting() {
  console.log("Hello, " + this.name);
}

let person = {
  name: "Alice"
};

let delayedGreeting = setTimeoutGreeting.bind(person);

setTimeout(delayedGreeting, 1000);

let setTimeoutGreeting2 = function() {
    console.log(`Hello, ${this.name}`);
}

let delayedGreeting2 = setTimeoutGreeting2.bind(person);

setTimeout(delayedGreeting2, 1000);
