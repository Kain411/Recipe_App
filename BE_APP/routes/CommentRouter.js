const express = require("express");
const router = express.Router();

const CommentController = require("../controller/CommentController");

router.get("/:postID", async (req, res) => {
    try {
        const { postID } = req.params

        const commentController = new CommentController();
        const comments = await commentController.getAllCommentByPostID(postID)

        return res.status(200).json({
            comments: comments.comments,
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

        return { message: commentRecord.message }
    }
    catch (error) {
        console.log("err")
        return { message: "Lỗi kết nối!" }
    }
})

module.exports = router;