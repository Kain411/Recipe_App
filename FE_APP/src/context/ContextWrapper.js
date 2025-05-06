import React from 'react'
import { AuthProvider } from './AuthContext'
import { PostProvider } from './PostContext';
import { CommentProvider } from './CommentContext';
import { ReviewProvider } from './ReviewContext';
import { FavoriteProvider } from './FavoriteContext';
import { RecipeProvider } from './RecipeContext';
import { IngredientProvider } from './IngredientContext';
import { SupplierProvider } from './SupplierContext';

const ContextWrapper = ({ children }) => {
    return (
        <AuthProvider>
            <PostProvider>
                <RecipeProvider>
                    <CommentProvider>
                        <ReviewProvider>
                            <FavoriteProvider>
                                <IngredientProvider>
                                    <SupplierProvider>
                                        {children}
                                    </SupplierProvider>
                                </IngredientProvider>
                            </FavoriteProvider>
                        </ReviewProvider>
                    </CommentProvider>
                </RecipeProvider>
            </PostProvider>
        </AuthProvider>
    )
}

export default ContextWrapper;