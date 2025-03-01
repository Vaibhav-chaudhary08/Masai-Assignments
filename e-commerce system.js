function Product(name, price, quantity) {
  this.name = name;
  this.price = price;
  this.quantity = quantity;
}

Product.prototype.displayInfo = function() {
  console.log(`Name: ${this.name}, Price: $${this.price}, Quantity: ${this.quantity}`);
};

Product.prototype.increaseQuantity = function(amount) {
  this.quantity += amount;
};

Product.prototype.decreaseQuantity = function(amount) {
  if (this.quantity >= amount) {
    this.quantity -= amount;
  } else {
    console.log("Insufficient quantity.");
  }
};

function Electronics(name, price, quantity, brand, model) {
  Product.call(this, name, price, quantity);
  this.brand = brand;
  this.model = model;
}

Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;

Electronics.prototype.displayInfo = function() {
  Product.prototype.displayInfo.call(this);
  console.log(`Brand: ${this.brand}, Model: ${this.model}`);
};

Electronics.prototype.powerOn = function() {
  console.log(`${this.name} (${this.model}) is powered on.`);
};

Electronics.prototype.powerOff = function() {
  console.log(`${this.name} (${this.model}) is powered off.`);
};

function Clothing(name, price, quantity, size, color) {
  Product.call(this, name, price, quantity);
  this.size = size;
  this.color = color;
}

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;

Clothing.prototype.displayInfo = function() {
  Product.prototype.displayInfo.call(this);
  console.log(`Size: ${this.size}, Color: ${this.color}`);
};

Clothing.prototype.changeColor = function(newColor) {
    this.color = newColor;
    console.log(`${this.name} color changed to ${newColor}`);
}

function Books(name, price, quantity, author, genre) {
  Product.call(this, name, price, quantity);
  this.author = author;
  this.genre = genre;
}

Books.prototype = Object.create(Product.prototype);
Books.prototype.constructor = Books;

Books.prototype.displayInfo = function() {
  Product.prototype.displayInfo.call(this);
  console.log(`Author: ${this.author}, Genre: ${this.genre}`);
};

Books.prototype.getAuthor = function(){
    console.log(`Author of ${this.name} is ${this.author}`);
}

const laptop = new Electronics("Laptop", 1200, 5, "Dell", "XPS 15");
const shirt = new Clothing("T-Shirt", 25, 20, "L", "Blue");
const book = new Books("The Hobbit", 15, 10, "J.R.R. Tolkien", "Fantasy");

laptop.displayInfo();
laptop.powerOn();
laptop.decreaseQuantity(2);
laptop.displayInfo();
laptop.powerOff();

shirt.displayInfo();
shirt.increaseQuantity(10);
shirt.displayInfo();
shirt.changeColor("Red");
shirt.displayInfo();

book.displayInfo();
book.getAuthor();
book.decreaseQuantity(1);
book.displayInfo();
