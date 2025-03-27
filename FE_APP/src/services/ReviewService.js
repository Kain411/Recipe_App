import { HostURL } from "./Host";
const API_URL = `${HostURL}/reviews`

export const getAllReviewByRecipeID = async (recipeID) => {
    try {
        const response = await fetch(`${API_URL}/${recipeID}`)

        if (!response.ok) {
            return { reviews: null, message: "Lỗi kết nối!" }
        }

        const result = await response.json()

        return { reviews: result.reviews, message: result.message }

    }
    catch (error) {
        return { reviews: null, message: "Lỗi kết nối!" }
    }
}

export const postNewRecipe = async (user, recipe, comment, rating) => {
    try {
        const recipeID = recipe.id
        const response = await fetch(`${API_URL}/${recipeID}/newReview`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userID: user.id,
                recipeID: recipe.id,
                comment: comment,
                rating: rating
            })
        })

        const data = await response.json()

        return { newReview: data.newReview, message: data.message }
    }
    catch (error) {
        return { message: "Lỗi kết nối!" }
    }
}