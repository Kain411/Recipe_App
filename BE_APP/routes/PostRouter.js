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

router.post("/newPost", async (req, res) => {
    try {
        const post = req.body

        const postController = new PostController()
        const postRecord = await postController.postNewPost(post)

        return res.status(200).json({ post_id: postRecord.post_id, message: postRecord.message })
    }
    catch (error) {
        return res.status(500).json({ post_id: null, message: "Lỗi kết nối!" })
    }
})

router.post("/newPostDetails", async (req, res) => {
    try {
        const postDetails = req.body

        const postDetailsController = new PostDetailsController()
        for (const posDetail of postDetails) {
            const postDetailRecord = await postDetailsController.postNewPostDetails(posDetail)
            if (postDetailRecord.message !== "Thành công!") {
                return res.status(404).json({ message: "Lỗi kết nối!" })
            }
        }

        return res.status(200).json({ message: "Thành công!" })
    }
    catch (error) {
        return res.status(500).json({ message: "Lỗi kết nối!" })
    }
})

module.exports = router;