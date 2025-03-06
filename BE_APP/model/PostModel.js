class PostModel {
    constructor(id, user_id, caption) {
        this.id = id;
        this.user_id = user_id;
        this.caption = caption
    }
}

class PostDetailsModel {
    constructor(id, post_id, url, video, type, caption) {
        this.id = id;
        this.post_id = post_id;
        this.url = url;
        this.video = video;
        this.type = type;
        this.caption = caption
    }
}

module.exports = { PostModel, PostDetailsModel }