import React from 'react'
import { AuthProvider } from './AuthContext'
import { PostProvider } from './PostContext';
import { CommentProvider } from './CommentContext';
import { ReviewProvider } from './ReviewContext';

const ContextWrapper = ({ children }) => {
    return (
        <AuthProvider>
            <PostProvider>
                <CommentProvider>
                    <ReviewProvider>
                        {children}
                    </ReviewProvider>
                </CommentProvider>
            </PostProvider>
        </AuthProvider>
    )
}

export default ContextWrapper;