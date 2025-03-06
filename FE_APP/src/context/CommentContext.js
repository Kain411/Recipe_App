import React, { createContext } from 'react'
import { getAllCommentByPostID, postNewComment } from '../services/CommentService'

export const CommentContext = createContext()

export const CommentProvider = ({children}) => {
    
    const handleGetAllCommentByPostID = async (postID) => {
        const result = await getAllCommentByPostID(postID)

        return { comments: result.comments, message: result.message }
    }

    const handlePostNewComment = async (userID, postID, comment) => {
        const result = await postNewComment(userID, postID, comment)

        return { message: result.message }
    }

    return (
        <CommentContext.Provider value={{ handleGetAllCommentByPostID, handlePostNewComment }}>
            {children}
        </CommentContext.Provider>
    )
}