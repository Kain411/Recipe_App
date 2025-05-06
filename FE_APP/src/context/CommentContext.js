import React, { createContext, useState } from 'react'
import { getAllCommentByPostID, postNewComment } from '../services/CommentService'

export const CommentContext = createContext()

export const CommentProvider = ({children}) => {
    const [comments, setComments] = useState([])
    
    const handleGetAllCommentByPostID = async (postID) => {
        const result = await getAllCommentByPostID(postID)

        setComments(result.comments)

        return { message: result.message }
    }

    const handlePostNewComment = async (userID, postID, comment) => {
        const result = await postNewComment(userID, postID, comment)

        await handleGetAllCommentByPostID(postID)

        return { message: result.message }
    }

    return (
        <CommentContext.Provider value={{ comments, handleGetAllCommentByPostID, handlePostNewComment }}>
            {children}
        </CommentContext.Provider>
    )
}