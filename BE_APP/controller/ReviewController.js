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
                    doc.data().rating,
                    doc.data().time
                ))
            })

            reviews.sort((a, b) => {
                const aTime = this.parseDate(a.time)
                const bTime = this.parseDate(b.time)

                if (aTime > bTime) return -1;
                else if (aTime < bTime) return 1;
                return 0
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
            const now = new Date()

            const review = {
                "user_id": userID,
                "recipe_id": recipeID,
                "comment": comment,
                "rating": rating,
                "time": this.formatDate(now)
            }

            const reviewRef = await db.collection("reviews").add(review)

            return { reviewID: reviewRef.id, message: "Thành công!" }
        }
        catch (error) {
            return { newReview: null, message: "Lỗi kết nối!" }
        }
    }

    parseDate(str) {
        const [time, date] = str.split(" ");
        const [hh, mm] = time.split(":");
        const [dd, MM, yyyy] = date.split("/");
    
        return new Date(`${yyyy}-${MM}-${dd}T${hh}:${mm}:00`);
    }

    formatDate (value) {
        const date = new Date(value)
        const hh = String(date.getHours()).padStart(2, '0')
        const mm = String(date.getMinutes()).padStart(2, '0')
        const dd = String(date.getDate()).padStart(2, '0')
        const MM = String(date.getMonth()+1).padStart(2, '0')
        const yyyy = date.getFullYear()

        return `${hh}:${mm} ${dd}/${MM}/${yyyy}`;
    }
}

module.exports = ReviewController