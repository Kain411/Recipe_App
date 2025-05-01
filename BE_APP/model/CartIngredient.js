class CartIngredient {
  constructor(id, cart_id, ingredient_id, quantity) {
    this.id = id;
    this.cart_id = cart_id;
    this.ingredient_id = ingredient_id;
    this.quantity = quantity;
  }
}

module.exports = CartIngredient;
