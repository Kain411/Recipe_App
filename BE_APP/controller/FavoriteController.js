const { db } = require("../firebase")

const { FavoritePostModel, FavoriteRecipeModel } = require("../model/FavoriteModel")

class FavoriteController {
    constructor() {}

    async getFavoriteByUserID(userID, type) {
        try {
            const itemIDs = []
            let favoriteRef;
            if (type=="Post") favoriteRef = db.collection("favorite_posts")
            else if (type=="Recipe") favoriteRef = db.collection("favorite_recipes")

            const query = await favoriteRef.where("user_id", "==", userID).get()

            if (query.empty) {
                return {
                    itemIDs: false,
                    message: "Không tồn tại!"
                }
            }

            if (type=="Post") {
                query.forEach((doc) => {
                    itemIDs.push(doc.data().post_id)
                })
            }
            else if (type=="Recipe") {
                query.forEach((doc) => {
                    itemIDs.push(doc.data().recipe_id)
                })
            }

            return {
                itemIDs: itemIDs,
                message: "Thành công!"
            }
        }
        catch (error) {
            return {
                itemIDs: null,
                message: "Lỗi kết nối!"
            }
        }
    }

    async getFavoriteByIDs(userID, itemID, type) {
        try {
            let favoriteRef;
            let query;

            if (type=="Post") {
                favoriteRef = db.collection("favorite_posts")
                query = await favoriteRef.where("user_id", "==", userID).where("post_id", "==", itemID).get()
            }
            else if (type=="Recipe") {
                favoriteRef = db.collection("favorite_recipes")
                query = await favoriteRef.where("user_id", "==", userID).where("recipe_id", "==", itemID).get()
            }

            if (query.empty) {
                return {
                    favorite: false,
                    message: "Không tồn tại!"
                }
            }

            return {
                favorite: true,
                message: "Thành công!"
            }
        }
        catch (error) {
            return {
                favorite: false,
                message: "Lỗi kết nối!"
            }
        }
    }

    async postFavoriteIDs(userID, itemID, type) {
        try {
            let favoriteRef;
            if (type=="Post") {
                favoriteRef = await db.collection("favorite_posts").add({
                    user_id: userID,
                    post_id: itemID
                })

                return {
                    message: "Thành công!"
                }
            }
            else if (type=="Recipe") {
                favoriteRef = await db.collection("favorite_recipes").add({
                    user_id: userID,
                    recipe_id: itemID
                })

                return {
                    message: "Thành công!"
                }
            }

            return {
                message: "Không thành công!"
            }
        }
        catch (error) {
            return {
                message: "Lỗi kết nối! Co"
            }
        }
    }

    async deleteFavoriteIDs(userID, itemID, type) {
        try {
            if (type=="Post") {
                const favoriteRef = db.collection("favorite_posts")
                const query = await favoriteRef.where("user_id", "==", userID).where("post_id", "==", itemID).get()

                if (query.empty) {
                    return {
                        message: "Không tìm thấy!"
                    }
                }

                const docRef = query.docs[0].ref
                await docRef.delete()

                return {
                    message: "Thành công!"
                }
            }
            else if (type=="Recipe") {
                const favoriteRef = db.collection("favorite_recipes")
                const query = await favoriteRef.where("user_id", "==", userID).where("recipe_id", "==", itemID).get()

                if (query.empty) {
                    return {
                        message: "Không tìm thấy!"
                    }
                }

                const docRef = query.docs[0].ref
                await docRef.delete()

                return {
                    message: "Thành công!"
                }
            }
        }
        catch (error) {
            return {
                message: "Lỗi kết nối!"
            }
        }
    }
}

module.exports = FavoriteController;