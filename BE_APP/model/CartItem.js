class CartItem {
  constructor(id, cart_id, ingredient_id, quantity, unit, display_price) {
    this.id = id;
    this.cart_id = cart_id;
    this.ingredient_id = ingredient_id;
    this.quantity = quantity;
    this.unit = unit;
    this.display_price = display_price;
  }
}

module.exports = CartItem;
