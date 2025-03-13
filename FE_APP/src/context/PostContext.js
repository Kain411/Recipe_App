import React, { createContext } from "react";
import { getAllPost, getAllPostByUserID, getAllPostDetailsByPostID, postNewPost, postNewPostDetails } from "../services/PostService";

export const PostContext = createContext()

export const PostProvider = ({children}) => {

    const handleGetAllPost = async () => {
        const result = await getAllPost()

        return { posts: result.posts, message: result.message }
    }

    const handleGetAllPostByUserID = async (userID) => {
        const result = await getAllPostByUserID(userID)

        return { posts: result.posts, message: result.message }
    }

    const handleGetAllPostDetailsByPostID = async (postID) => {
        const result = await getAllPostDetailsByPostID(postID)

        return { postDetails: result.postDetails, message: result.message }
    }

    const handlePostNewPost = async (post) => {
        const result = await postNewPost(post)

        return { post_id: result.post_id, message: result.message }
    }

    const handlePostNewPostDetails = async (postDetails) => {
        const result = await postNewPostDetails(postDetails)

        return { message: result.message }
    }

    return (
        <PostContext.Provider value={{ handleGetAllPost, handleGetAllPostByUserID, handleGetAllPostDetailsByPostID, handlePostNewPost, handlePostNewPostDetails }}>
            {children}
        </PostContext.Provider>
    )
}