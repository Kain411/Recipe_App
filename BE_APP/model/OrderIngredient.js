class OrderIngredient {
  constructor(id, order_id, ingredient_id, quantity, price) {
    this.id = id;
    this.order_id = order_id,
    this.ingredient_id = ingredient_id;
    this.quantity = quantity;
    this.price = price;
  }
}

module.exports = OrderIngredient;
