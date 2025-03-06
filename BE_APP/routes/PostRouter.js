const express = require("express");
const router = express.Router();

const { PostController, PostDetailsController } = require("../controller/PostController");

router.get("", async (req, res) => {
    try {
        const postController = new PostController();
        const posts = await postController.getAllPost();

        return res.status(200).json({
            posts: posts.posts,
            message: posts.message
        })
    }
    catch (error) {
        return res.status(500).json({ posts: null, message: "Lỗi kết nối" })
    }
})

router.get("/:userID", async (req, res) => {
    try {
        const { userID } = req.params

        const postController = new PostController();
        const posts = await postController.getAllPostByUserID(userID);

        return res.status(200).json({
            posts: posts.posts,
            message: posts.message
        })
    }      
    catch (error) {
        return res.status(500).json({ posts: null, message: "Lỗi kết nối!" })
    }
})

router.get("/:postID/details", async (req, res) => {
    try {
        const { postID } = req.params;

        const postDetailsController = new PostDetailsController();
        const postDetails = await postDetailsController.getAllPostDetailsByPostID(postID);

        return res.status(200).json({
            postDetails: postDetails.postDetails,
            message: postDetails.message
        })
    }
    catch (error) {
        return res.status(500).json({ postDetails: null, message: "Lỗi kết nối!"})
    }
})

module.exports = router;