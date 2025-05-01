class RecipeIngredient {
  constructor(id, recipe_id, ingredient_id, quantity) {
    this.id = id;
    this.recipe_id = recipe_id;
    this.ingredient_id = ingredient_id;
    this.quantity = quantity;
  }
}

module.exports = RecipeIngredient;
