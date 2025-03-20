class Recipe {
    constructor(id, name, category, video_url, person, mode,total_cooking_time, user_id) {
        this.id = id;
        this.name = name;
        this.mode = mode; 
        this.category = category;
        this.video_url =  video_url;
        this.person = person;
        this.total_cooking_time = total_cooking_time;
        this.user_id = user_id
    }
}

module.exports = Recipe;