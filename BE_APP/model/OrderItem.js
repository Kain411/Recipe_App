class OrderItem {
  constructor(id, order_item, ingredient_id, quantity, unit, price_per_unit) {
    this.id = id;
    this.order_item = order_item;
    this.ingredient_id = ingredient_id;
    this.quantity = quantity;
    this.unit = unit;
    this.price_per_unit = price_per_unit;
  }
}

module.exports = OrderItem;
