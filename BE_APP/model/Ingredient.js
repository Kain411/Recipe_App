class Ingredient {
  constructor(
    id,
    name,
    image_url,
    calories,
    protein,
    fat,
    carbs,
    quantity,
    unit,
    price,
    supplier_id
  ) {
    this.id = id;
    this.name = name;
    this.image_url = image_url;
    this.calories = calories;
    this.protein = protein;
    this.fat = fat;
    this.carbs = carbs;
    this.quantity = quantity;
    this.unit = unit;
    this.price = price;
    this.supplier_id = supplier_id;
  }
}

module.exports = Ingredient;
