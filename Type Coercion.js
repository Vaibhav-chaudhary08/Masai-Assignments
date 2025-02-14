const checkout = {
  items: [],
  total: 0,
  addItem(item) {
    if (!item || typeof item.price !== 'number' || isNaN(item.price)) {
      console.error("Invalid price. Price must be a number.");
      return;
    }

    this.items.push(item);
    this.total += item.price;
  },
  getTotal() {
    return `Total: $${this.total.toFixed(2)}`;
  },
};

checkout.addItem({ name: "Coffee Maker", price: 99.95 });
checkout.addItem({ name: "Milk", price: 3.50 });
console.log(checkout.getTotal()); 

checkout.addItem({name: "Invalid Item", price: "abc"});
