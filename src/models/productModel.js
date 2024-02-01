class Product {
  constructor(name, description, price, variants = []) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.variants = variants;
  }
}

module.exports = Product;
