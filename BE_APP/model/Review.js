class Review {
    constructor(id, recipe_id, user_id, description, rating) {
        this.id = id;
        this.recipe_id = recipe_id;
        this.user_id = user_id;
        this.description =  description;
        this.rating = rating;
    }
}

module.exports = Review;