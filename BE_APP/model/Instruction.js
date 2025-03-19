class Ingredient {
    constructor(id, recipe_id, step_number, description, duration) {
        this.id = id;
        this.recipe_id = recipe_id;
        this.step_number = step_number;
        this.description =  description;
        this.duration = duration;
    }
}

module.exports = Ingredient;