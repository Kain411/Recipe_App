const { db } = require("../firebase")

const CommentModel = require("../model/CommentModel")

class CommentController {
    constructor() {}

    async getAllCommentByPostID(postID) {
        try {
            const commentRef = db.collection("comments")
            const query = await commentRef.where("post_id", "==", postID).get()

            const comments = []
            query.forEach((doc) => {
                comments.push(new CommentModel(
                    doc.id,
                    doc.data().user_id,
                    doc.data().post_id,
                    doc.data().comment
                ))
            })

            return {
                comments: comments,
                message: "Thành công!"
            }
        }
        catch (error) {
            return {
                comments: null,
                message: "Lỗi kết nối!"
            }
        }
    }

    async postNewComment(userID, postID, commment) {
        try {
            const commentStore = {
                user_id: userID,
                post_id: postID,
                comment: commment
            }

            const commentRef = await db.collection("comments").add(commentStore);
            
            return { commentID: commentRef.id, message: "Thành công!" }
        }
        catch (error) {
            return { message: "Lỗi kết nối!" }
        }
    }
}

module.exports = CommentController;