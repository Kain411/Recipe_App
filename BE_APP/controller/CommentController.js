const { db } = require("../firebase")

const CommentModel = require("../model/CommentModel")

class CommentController {
    constructor() {}

    async getAllCommentByPostID(postID) {
        try {
            const commentRef = db.collection("comments")
            const query = await commentRef.where("post_id", "==", postID).get()

            const comments = []
            query.forEach((doc) => {
                comments.push(new CommentModel(
                    doc.id,
                    doc.data().user_id,
                    doc.data().post_id,
                    doc.data().comment,
                    doc.data().time
                ))
            })

            comments.sort((a, b) => {
                const aTime = this.parseDate(a.time)
                const bTime = this.parseDate(b.time)

                if (aTime > bTime) return -1;
                else if (aTime < bTime) return 1;
                return 0
            })

            return {
                comments: comments,
                message: "Thành công!"
            }
        }
        catch (error) {
            return {
                comments: null,
                message: "Lỗi kết nối!"
            }
        }
    }

    async postNewComment(userID, postID, commment) {
        try {

            const now = new Date()

            const commentStore = {
                user_id: userID,
                post_id: postID,
                comment: commment,
                time: this.formatDate(now)
            }

            console.log(commentStore)

            const commentRef = await db.collection("comments").add(commentStore);
            
            return { commentID: commentRef.id, message: "Thành công!" }
        }
        catch (error) {
            return { message: "Lỗi kết nối!" }
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

module.exports = CommentController;