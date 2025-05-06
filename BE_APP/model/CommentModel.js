class CommentModel {
    constructor(id, user_id, post_id, comment, time) {
        this.id = id,
        this.user_id = user_id,
        this.post_id = post_id,
        this.comment = comment,
        this.time = time
    }
}

module.exports = CommentModel;