import { HostURL } from "./Host";
const API_URL = `${HostURL}/posts`

export const getAllPost = async () => {
    try {
        const response = await fetch(`${API_URL}`)

        if (!response.ok) {
            return { posts: null, message: "Lỗi kết nối!" }
        }

        const result = await response.json()

        return { posts: result.posts, message: result.message }
    }
    catch (error) {
        return { posts: null, message: "Lỗi kết nối!" }
    }
}

export const getAllPostByUserID = async (userID) => {
    try {
        const response = await fetch(`${API_URL}/${userID}`)
        
        if (!response.ok) {
            return { posts: null, message: "Lỗi kết nối!" }
        }
        
        const result = await response.json()

        return { posts: result.posts, message: result.message }
    }
    catch (error) {
        return { posts: null, message: "Lỗi kết nối!" }
    }
}

export const postNewPost = async (post, postDetails) => {
    try {
        const response = await fetch(`${API_URL}/newPost`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                post: post, 
                postDetails: postDetails
            })
        })

        const data = await response.json()

        return { newPost: data.newPost, message: data.message }
    }
    catch (error) {
        return { post_id: null, message: "Lỗi kết nối!" }
    }
}