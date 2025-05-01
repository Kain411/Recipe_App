class Recipe {
  constructor(id, user_id, name, url, person, mode, totalTime) {
    this.id = id;
    this.user_id = user_id;
    this.mode = mode;
    this.name = name;
    this.url = url;
    this.person = person;
    this.totalTime = totalTime;
  }
}

module.exports = Recipe;
