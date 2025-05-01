class FavoritePostModel {
    constructor(id, user_id, post_id) {
        this.id = id;
        this.user_id = user_id;
        this.post_id = post_id
    }
}

class FavoriteRecipeModel {
    constructor(id, user_id, recipe_id) {
        this.id = id;
        this.user_id = user_id;
        this.recipe_id = recipe_id
    }
}

module.exports = { FavoritePostModel, FavoriteRecipeModel };