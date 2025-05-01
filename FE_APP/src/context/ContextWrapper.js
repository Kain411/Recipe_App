import React from 'react'
import { AuthProvider } from './AuthContext'
import { PostProvider } from './PostContext';
import { CommentProvider } from './CommentContext';
import { ReviewProvider } from './ReviewContext';
import { FavoriteProvider } from './FavoriteContext';
import { RecipeProvider } from './RecipeContext';

const ContextWrapper = ({ children }) => {
    return (
        <AuthProvider>
            <PostProvider>
                <RecipeProvider>
                    <CommentProvider>
                        <ReviewProvider>
                            <FavoriteProvider>
                                {children}
                            </FavoriteProvider>
                        </ReviewProvider>
                    </CommentProvider>
                </RecipeProvider>
            </PostProvider>
        </AuthProvider>
    )
}

export default ContextWrapper;