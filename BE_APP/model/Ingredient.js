class Ingredient {
    constructor(id, name, calories, protein, fat, carb, quantity, unit) {
        this.id = id;
        this.name = name;
        this.calories = calories;
        this.protein =  protein;
        this.fat = fat;
        this.carb = carb;
        this.quantity = quantity;
        this.unit = unit;
    }
}

module.exports = Ingredient;