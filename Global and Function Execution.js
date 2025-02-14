var age = 25;
function displayAge() {
  console.log("Current age:", age);
}
function changeAge(newAge) {
  age = newAge;
  console.log("Age after change:", age);
}

displayAge();
changeAge(30);
displayAge();

function testScope(){
    var age = 10;
    console.log("Age inside testScope", age);
}

testScope();
displayAge();
