function Car(make, model, year, isAvailable = true) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.isAvailable = isAvailable;
}

function Customer(name, rentedCars = []) {
  this.name = name;
  this.rentedCars = rentedCars;
}

Customer.prototype.rentCar = function(car) {
  if (car.isAvailable) {
    car.isAvailable = false;
    this.rentedCars.push(car);
    console.log(`${this.name} rented ${car.make} ${car.model}.`);
  } else {
    console.log(`${car.make} ${car.model} is already rented.`);
  }
};

Customer.prototype.returnCar = function(car) {
  setTimeout(() => {
    car.isAvailable = true;
    this.rentedCars = this.rentedCars.filter(rentedCar => rentedCar !== car);
    console.log(`${this.name} returned ${car.make} ${car.model}.`);
  }, 2000);
};

function PremiumCustomer(name, rentedCars, discountRate) {
  Customer.call(this, name, rentedCars);
  this.discountRate = discountRate;
}

PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;

function calculateRentalPrice(car, customer, carType) {
  const basePricePerDay = 50;
  let carRate = 1;

  if (carType === "SUV") {
    carRate = 1.5;
  } else if (carType === "Sedan") {
    carRate = 1.2;
  }

  let totalPrice = basePricePerDay * carRate;

  if (customer instanceof PremiumCustomer) {
    totalPrice *= (1 - customer.discountRate / 100);
  }

  return totalPrice;
}

function Maintenance(car, delay) {
  setTimeout(() => {
    car.isAvailable = true;
    console.log(`${car.make} ${car.model} is now available after maintenance.`);
  }, delay);
}

const toyotaCorolla = new Car("Toyota", "Corolla", 2020);
const hondaCivic = new Car("Honda", "Civic", 2021);
const fordExplorer = new Car("Ford", "Explorer", 2019);

const regularCustomer = new Customer("John");
const premiumCustomer = new PremiumCustomer("Alice", [], 10);

regularCustomer.rentCar(toyotaCorolla);
premiumCustomer.rentCar(fordExplorer);
regularCustomer.rentCar(toyotaCorolla);

console.log(`Rental price for Corolla: $${calculateRentalPrice(toyotaCorolla, regularCustomer, "Sedan")}`);
console.log(`Rental price for Explorer: $${calculateRentalPrice(fordExplorer, premiumCustomer, "SUV")}`);

regularCustomer.returnCar(toyotaCorolla);
premiumCustomer.returnCar(fordExplorer);

Maintenance(hondaCivic, 3000);
