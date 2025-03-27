const express = require("express");
const router = express.Router();

const CommentController = require("../controller/CommentController");
const UserController = require("../controller/UserController");

router.get("/:postID", async (req, res) => {
    try {
        const { postID } = req.params

        const commentController = new CommentController();
        const comments = await commentController.getAllCommentByPostID(postID)

        const userComments = []
        const userController = new UserController();

        for (const commentData of comments.comments) {
            const userID = commentData.user_id

            const user = await userController.getUserByID(userID);

            const comment = {
                id: commentData.id,
                comment: commentData.comment,
                user: user.user
            }

            userComments.push(comment)
        }

        return res.status(200).json({
            comments: userComments,
            message: comments.message
        })
    }
    catch (error) {
        return res.status(500).json({ comments: null, message: "Lỗi kết nối" })
    }
})

router.post("/:postID/newComment", async (req, res) => {
    try {
        const { userID, postID, comment } = req.body

        const commentController = new CommentController()
        const commentRecord = await commentController.postNewComment(userID, postID, comment)

        const userController = new UserController();
        const userRecord = await userController.getUserByID(userID);

        const commentStore = {
            id: commentRecord.commentID,
            comment: comment,
            user: userRecord.user
        }

        return res.status(200).json({ 
            newComment: commentStore,
            message: commentRecord.message 
        })
    }
    catch (error) {
        return res.status(500).json({ comments: null, message: "Lỗi kết nối" })
    }
})

module.exports = router;