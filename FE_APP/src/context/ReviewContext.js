import React, { createContext, useState } from "react"
import { getAllReviewByRecipeID, postNewRecipe } from "../services/ReviewService"

export const ReviewContext = createContext()

export const ReviewProvider = ({children}) => {
    const [reviews, setReviews] = useState([])

    const handleGetAllReviewByRecipeID = async (recipeID) => {
        const result = await getAllReviewByRecipeID(recipeID)
        
        setReviews(result.reviews)

        return { message: result.message }
    } 

    const handlePostNewReview = async (user, recipe, comment, rating) => {
        const result = await postNewRecipe(user, recipe, comment, rating)

        await handleGetAllReviewByRecipeID(recipe.id)

        return { message: result.message }
    }

    return (
        <ReviewContext.Provider value={{ reviews, handleGetAllReviewByRecipeID, handlePostNewReview }}>
            {children}
        </ReviewContext.Provider>
    )
}