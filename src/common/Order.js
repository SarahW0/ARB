import Product from "./Product";

export default class Order {
  constructor(orderID) {
    this.orderID = orderID;
    this.companyID = 0;
    this.products = [];
    this.isPrintSKUs = false;
    this.isPrintShippingLabel = false;
  }
  //generate unique order id for each order
  static #orderID = 0;

  //get order id for new order
  static getNextOrderID() {
    this.#orderID += 1;
    return this.#orderID;
  }

  //add an ordered product
  addProduct(sku, name, price, amount) {
    const product = new Product(sku, name, price, amount);
    this.products.push(product);
  }

  //update an ordered product
  updateProduct(index, sku, name, price, amount) {
    this.products[index].sku = sku;
    this.products[index].name = name;
    this.products[index].price = price;
    this.products[index].amount = amount;
  }

  //add an ordered product
  removeProduct(index) {
    this.products.splice(index, 1);
  }
}
