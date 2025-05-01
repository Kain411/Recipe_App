class CartRecipe {
    constructor(id, cart_id, ingredient_id, recipe_id,quantity) {
      this.id = id;
      this.cart_id = cart_id;
      this.ingredient_id = ingredient_id;
      this.recipe_id = recipe_id;
      this.quantity = quantity;
    }
}

module.exports = CartRecipe;