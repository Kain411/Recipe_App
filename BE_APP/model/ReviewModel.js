class ReviewModel {
    constructor(id, user_id, recipe_id, comment, rating) {
        this.id = id;
        this.user_id = user_id;
        this.recipe_id = recipe_id;
        this.comment = comment;
        this.rating = rating
    }
}

module.exports = ReviewModel;