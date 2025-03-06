import { HostURL } from "./Host";
const API_URL = `${HostURL}/posts`

export const getAllPost = async () => {
    try {
        const response = await fetch(`${API_URL}`)

        if (!response.ok) {
            return { posts: null, message: "Lỗi kết nối" }
        }

        const result = await response.json()

        return { posts: result.posts, message: result.message }
    }
    catch (error) {
        return { posts: null, message: "Lỗi kết nối" }
    }
}

export const getAllPostByUserID = async (userID) => {
    try {
        const response = await fetch(`${API_URL}/${userID}`)
        
        if (!response.ok) {
            return { posts: null, message: "Lỗi kết nối" }
        }
        
        const result = await response.json()

        return { posts: result.posts, message: result.message }
    }
    catch (error) {
        return { posts: null, message: "Lỗi kết nối" }
    }
}

export const getAllPostDetailsByPostID = async (postID) => {
    try {
        const response = await fetch(`${API_URL}/${postID}/details`)

        if (!response.ok) {
            return { posts: null, message: "Lỗi kết nối" }
        }
        
        const result = await response.json()

        return { postDetails: result.postDetails, message: result.message }
    }
    catch (error) {
        return { postDetails: null, message: "Lỗi kết nối!" }
    }
}