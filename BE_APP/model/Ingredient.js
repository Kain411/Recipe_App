class Ingredient {
    constructor(id, name, url, calories, protein, fat, carb, quantity, unit, price, id_supplier, description) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.calories = calories;
        this.protein =  protein;
        this.fat = fat;
        this.carb = carb;
        this.quantity = quantity;
        this.unit = unit;
        this.price = price;
        this.id_supplier = id_supplier
        this.description = description
    }
}

module.exports = Ingredient;