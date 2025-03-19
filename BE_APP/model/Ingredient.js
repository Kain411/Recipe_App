class Ingredient {
    constructor(id, name, image_url, calories, protein, fat, carb, quantity, unit, price) {
        this.id = id;
        this.name = name;
        this.image_url = image_url;
        this.calories = calories;
        this.protein =  protein;
        this.fat = fat;
        this.carb = carb;
        this.quantity = quantity;
        this.unit = unit;
        this.price = price;
    }
}

module.exports = Ingredient;