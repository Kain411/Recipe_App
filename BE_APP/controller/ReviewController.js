const { db } = require("../firebase")

const ReviewModel = require("../model/ReviewModel")

class ReviewController {
    constructor() {}

    async getAllReviewByRecipeID(recipeID) {
        try {
            const reviewRef = db.collection("reviews")
            const query = await reviewRef.where("recipe_id", "==", recipeID).get()

            const reviews = []
            query.forEach((doc) => {
                reviews.push(new ReviewModel(
                    doc.id, 
                    doc.data().user_id,
                    doc.data().recipe_id, 
                    doc.data().comment,
                    doc.data().rating
                ))
            })

            return {
                reviews: reviews,
                message: "Thành công!"
            }
        }
        catch (error) {
            return {
                reviews: null,
                message: "Lỗi kết nối!"
            }
        }
    }

    async postNewReview(userID, recipeID, comment, rating) {
        try {

            const review = {
                "user_id": userID,
                "recipe_id": recipeID,
                "comment": comment,
                "rating": rating
            }

            const reviewRef = await db.collection("reviews").add(review)

            return { reviewID: reviewRef.id, message: "Thành công!" }
        }
        catch (error) {
            return { newReview: null, message: "Lỗi kết nối!" }
        }
    }
}

module.exports = ReviewController