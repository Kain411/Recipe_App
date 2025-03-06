const { db } = require("../firebase")

const { PostModel, PostDetailsModel } = require("../model/PostModel");

class PostController {
    constructor() {}

    async getAllPost() {
        try {
            const snapshot = await db.collection("posts").get()

            const posts = []
            snapshot.forEach((doc) => {
                posts.push(new PostModel(
                    doc.id,
                    doc.data().user_id,
                    doc.data().caption
                ))
            })

            return {
                posts: posts,
                message: "Thành công!"
            }
        }
        catch (error) {
            return {
                post: null,
                message: "Lỗi kết nối!"
            }
        }
    }
    
    async getAllPostByUserID(userID) {
        try {
            const postRef = db.collection("posts")
            const query = await postRef.where("user_id", "==", userID).get();

            const posts = []
            query.forEach((doc) => {
                posts.push(new PostModel(
                    doc.id,
                    doc.data().user_id,
                    doc.data().caption
                ))
            })

            return {
                posts: posts,
                message: "Thành công!"
            }
        }
        catch (error) {
            return {
                post: null,
                message: "Lỗi kết nối!"
            }
        }
    }
}

class PostDetailsController {
    constructor() {}

    async getAllPostDetailsByPostID(postID) {
        try {
            const postDetailsRef = db.collection("post_details")
            const query = await postDetailsRef.where("post_id", "==", postID).get()

            const postDetails = []
            query.forEach((doc) => {
                postDetails.push(new PostDetailsModel(
                    doc.id,
                    doc.data().post_id,
                    doc.data().url,
                    doc.data().video,
                    doc.data().type,
                    doc.data().caption
                ))
            })

            return {
                postDetails: postDetails,
                message: `Danh sách chi tiết ${postID}!`
            }
        }
        catch (error) {
            return {
                postDetails: null,
                message: "Lỗi kết nối!"
            }
        }
    }
}

module.exports = { PostController, PostDetailsController }