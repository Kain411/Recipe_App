const express = require("express");
const router = express.Router();

const { PostController, PostDetailsController } = require("../controller/PostController");
const UserController = require("../controller/UserController");

router.get("", async (req, res) => {
    try {
        const postController = new PostController();
        const posts = await postController.getAllPost();

        const userController = new UserController();
        const postDetailsController = new PostDetailsController();

        const lstPosts = []

        for (const postData of posts.posts) {
            const userID = postData.user_id
            const user = await userController.getUserByID(userID)

            const postID = postData.id
            const postDetails = await postDetailsController.getAllPostDetailsByPostID(postID)

            const post = {
                id: postData.id,
                caption: postData.caption,
                user: user.user,
                post_details: postDetails.postDetails
            }

            lstPosts.push(post)
        }

        return res.status(200).json({
            posts: lstPosts,
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

        const userController = new UserController();
        const postDetailsController = new PostDetailsController();

        const lstPosts = []

        for (const postData of posts.posts) {
            const userID = postData.user_id
            const user = await userController.getUserByID(userID)

            const postID = postData.id
            const postDetails = await postDetailsController.getAllPostDetailsByPostID(postID)

            const post = {
                id: postData.id,
                caption: postData.caption,
                user: user.user,
                post_details: postDetails.postDetails
            }

            lstPosts.push(post)
        }

        return res.status(200).json({
            posts: lstPosts,
            message: posts.message
        })
    }      
    catch (error) {
        return res.status(500).json({ posts: null, message: "Lỗi kết nối!" })
    }
})

router.post("/newPost", async (req, res) => {
    try {
        const { post, postDetails } = req.body

        const postController = new PostController()
        const postRecord = await postController.postNewPost(post)

        const userController = new UserController()
        const userRecord = await userController.getUserByID(post.user_id)

        const postDetailsController = new PostDetailsController()

        const lstDetails = []
        for (const onePostDetails of postDetails) {
            const tmp = {
                ...onePostDetails,
                post_id: postRecord.postID
            }

            const postDetailRecord = await postDetailsController.postNewPostDetails(tmp)
            const postDetailStore = {
                id: postDetailRecord.postDetailID,
                ...onePostDetails
            }

            lstDetails.push(postDetailStore)
        }

        const newPost = {
            id: postRecord.postID,
            caption: post.caption,
            user: userRecord.user,
            post_details: lstDetails
        }


        return res.status(200).json({ newPost: newPost, message: postRecord.message })
    }
    catch (error) {
        return res.status(500).json({ post_id: null, message: "Lỗi kết nối!" })
    }
})

module.exports = router;