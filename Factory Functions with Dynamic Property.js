function createInventoryItem(name, category, price) {
  return {
    name: name,
    category: category,
    price: price,
    describeItem: function() {
      console.log(`Item: ${this.name}, Category: ${this.category}, Price: ${this.price}`);
    }
  };
}

function addItemDiscount(inventoryItem, discountPercent) {
  const discountedPrice = inventoryItem.price * (1 - discountPercent / 100);
  return {
    ...inventoryItem,
    discountedPrice: discountedPrice,
    applyDiscount: function() {
      console.log(`Discounted Price for ${this.name}: ${this.discountedPrice}`);
    }
  };
}

const item = createInventoryItem("Laptop", "Electronics", 1500);
item.describeItem();

const discountedItem = addItemDiscount(item, 10);
discountedItem.applyDiscount();

const item2 = createInventoryItem("Book", "Books", 20);
item2.describeItem();

const discountedItem2 = addItemDiscount(item2, 25);
discountedItem2.applyDiscount();
