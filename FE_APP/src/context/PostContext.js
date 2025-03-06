import React, { createContext } from "react";
import { getAllPost, getAllPostByUserID, getAllPostDetailsByPostID } from "../services/PostService";

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

    return (
        <PostContext.Provider value={{ handleGetAllPost, handleGetAllPostByUserID, handleGetAllPostDetailsByPostID }}>
            {children}
        </PostContext.Provider>
    )
}