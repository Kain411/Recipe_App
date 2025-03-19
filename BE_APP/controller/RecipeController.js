const { db } = require("../firebase");
const Recipe = require("../model/Recipe");

class RecipeController {
    async createRecipe(recipeData) {
        try {
            const recipeRef = await db.collection("recipes").add({
                name: recipeData.name,
                category: recipeData.category,
                video_url: recipeData.video_url,
                person: recipeData.person,
                total_cooking_time: recipeData.total_cooking_time,
                user_id: recipeData.user_id,
                created_at: new Date()
            });

            return { success: true, id: recipeRef.id, message: "Công thức đã được tạo thành công!" };
        } catch (error) {
            return { success: false, message: "Lỗi khi tạo công thức!" };
        }
    }

    async getRecipes() {
        try {
            const recipesSnapshot = await db.collection("recipes").get();
            const recipes = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            return { success: true, recipes };
        } catch (error) {
            return { success: false, message: "Lỗi khi lấy danh sách công thức!" };
        }
    }
    async getRecipesByUserId(userId) {
        try {
            const recipesRef = db.collection("recipes");
            const querySnapshot = await recipesRef.where("user_id", "==", userId).get();
    
            if (querySnapshot.empty) {
                return { success: false, message: "Không tìm thấy công thức nào cho người dùng này!" };
            }
    
            const recipes = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
    
            return { success: true, recipes };
        } catch (error) {
            console.error("Lỗi khi lấy công thức:", error);
            return { success: false, message: "Lỗi khi lấy công thức!" };
        }
    }
    

    async getRecipeByID(id) {
        try {
            const recipeDoc = await db.collection("recipes").doc(id).get();

            if (!recipeDoc.exists) {
                return { success: false, message: "Không tìm thấy công thức!" };
            }

            return { success: true, recipe: { id: recipeDoc.id, ...recipeDoc.data() } };
        } catch (error) {
            return { success: false, message: "Lỗi khi lấy công thức!" };
        }
    }

    async updateRecipeByID(id, recipeData) {
        try {
            const recipeRef = db.collection("recipes").doc(id);
            const recipeDoc = await recipeRef.get();

            if (!recipeDoc.exists) {
                return { success: false, message: "Không tìm thấy công thức!" };
            }

            await recipeRef.update(recipeData);
            return { success: true, message: "Công thức đã được cập nhật!" };
        } catch (error) {
            return { success: false, message: "Lỗi khi cập nhật công thức!" };
        }
    }

    async deleteRecipeByID(id) {
        try {
            const recipeRef = db.collection("recipes").doc(id);
            const recipeDoc = await recipeRef.get();

            if (!recipeDoc.exists) {
                return { success: false, message: "Không tìm thấy công thức!" };
            }

            await recipeRef.delete();
            return { success: true, message: "Công thức đã được xóa!" };
        } catch (error) {
            return { success: false, message: "Lỗi khi xóa công thức!" };
        }
    }
}

module.exports = RecipeController;
