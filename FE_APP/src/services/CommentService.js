import { HostURL } from "../services/Host";
const API_URL = `${HostURL}/comments`

export const getAllCommentByPostID = async (postID) => {
    try {
        const response = await fetch(`${API_URL}/${postID}`)

        if (!response.ok) {
            return { comments: null, message: "Lỗi kết nối! " }
        }

        const result = await response.json()

        return { comments: result.comments, message: result.message }
    }
    catch (error) {
        return { comments: null, message: "Lỗi kết nối!" }
    }
}

export const postNewComment = async (userID, postID, comment) => {
    try {
        const response = await fetch(`${API_URL}/${postID}/newComment`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                userID: userID,
                postID: postID,
                comment: comment
            })
        })

        const data = await response.json()

        if (!response.ok) {
            return { message: data.message }
        }
        
        return { newComment: data.newComment, message: data.message }
    }
    catch (error) {
        return { message: "Lỗi kết nối!" }
    }
}