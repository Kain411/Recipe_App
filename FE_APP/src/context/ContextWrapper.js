import React from 'react'
import { AuthProvider } from './AuthContext'
import { PostProvider } from './PostContext';
import { CommentProvider } from './CommentContext';

const ContextWrapper = ({ children }) => {
    return (
        <AuthProvider>
            <PostProvider>
                <CommentProvider>
                    {children}
                </CommentProvider>
            </PostProvider>
        </AuthProvider>
    )
}

export default ContextWrapper;