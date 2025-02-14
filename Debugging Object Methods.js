const userProfile = {
  name: "Alice",
  age: 28,
  details() {
    return `${this.name} is ${this.age} years old.`;
  },
  updateAge(newAge) {
    if (newAge <= 0 || typeof newAge !== 'number') {
      console.error("Invalid age. Age must be a positive number.");
      return;
    }
    this.age = newAge;
    console.log(this.details());
  },
};

userProfile.updateAge(30);
console.log(userProfile.details());

userProfile.updateAge(-5);
userProfile.updateAge("abc");
