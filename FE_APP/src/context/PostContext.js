import React, { createContext, useState } from "react";
import { getAllPost, getAllPostByUserID, getAllPostDetailsByPostID, postNewPost, postNewPostDetails } from "../services/PostService";

export const PostContext = createContext()

export const PostProvider = ({children}) => {

    const [posts, setPosts] = useState([])

    const handleGetAllPost = async () => {
        const result = await getAllPost()

        setPosts(result.posts)

        return { message: result.message }
    }

    const handleGetAllPostByUserID = async (userID) => {
        const result = await getAllPostByUserID(userID)

        return { posts: result.posts, message: result.message }
    }

    const handlePostNewPost = async (post, postDetails) => {
        const result = await postNewPost(post, postDetails)

        setPosts(prev => [
            ...prev,
            result.newPost
        ])

        return { message: result.message }
    }

    return (
        <PostContext.Provider value={{ posts, handleGetAllPost, handleGetAllPostByUserID, handlePostNewPost }}>
            {children}
        </PostContext.Provider>
    )
}