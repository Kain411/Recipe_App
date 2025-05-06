const express = require("express");
const router = express.Router();

const ReviewController = require("../controller/ReviewController");
const UserController = require("../controller/UserController");

router.get("/:recipeID", async (req, res) => {
    try {
        const { recipeID } = req.params

        const reviewController = new ReviewController()
        const reviews = await reviewController.getAllReviewByRecipeID(recipeID)

        const userReviews = []
        const userController = new UserController();

        for (const reviewData of reviews.reviews) {
            const userID = reviewData.user_id

            const user = await userController.getUserByID(userID)

            const review = {
                id: reviewData.id,
                comment: reviewData.comment,
                rating: reviewData.rating,
                time: reviewData.time,
                user: user.user
            }

            userReviews.push(review)
        }

        return res.status(200).json({ 
            reviews: userReviews, 
            message: reviews.message 
        })
    }
    catch (error) {
        return res.status(500).json({ reviews: null, message: "Lỗi kết nối!" })
    }
})

router.post("/:recipeID/newReview", async (req, res) => {
    try {
        const { userID, recipeID, comment, rating } = req.body

        const reviewController = new ReviewController()
        const reviewRecord = await reviewController.postNewReview(userID, recipeID, comment, rating)

        const userController = new UserController();
        const userRecord = await userController.getUserByID(userID);

        const reviewStore = {
            id: reviewRecord.reviewID,
            comment: comment,
            rating: rating,
            user: userRecord.user
        }


        return res.status(200).json({ 
            newReview: reviewStore,
            message: reviewRecord.message 
        })
    }
    catch (error) {
        return res.status(500).json({ 
            newReview: null,
            message: "Lỗi kết nối!" 
        })
    }
})

module.exports = router;