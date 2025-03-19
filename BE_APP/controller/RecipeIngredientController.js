const { db } = require("../firebase")
const RecipeIngredient = require("../model/RecipeIngredient");

class RecipeIngredientController {
    // Thêm nguyên liệu vào công thức
    async addRecipeIngredient(data) {
        try {
            const newDoc = db.collection("recipe_ingredients").doc();
            const newRecipeIngredient = new RecipeIngredient(
                newDoc.id,
                data.recipe_id,
                data.ingredient_id,
                data.quantity,
                data.unit
            );

            await newDoc.set({ ...newRecipeIngredient });

            return { success: true, message: "Thêm nguyên liệu vào công thức thành công!", id: newDoc.id };
        } catch (error) {
            console.error("Lỗi khi thêm nguyên liệu:", error);
            return { success: false, message: "Lỗi khi thêm nguyên liệu!" };
        }
    }

    // Lấy danh sách nguyên liệu của một công thức
    async getIngredientsByRecipeId(recipeId) {
        try {
            const querySnapshot = await db.collection("recipe_ingredients").where("recipe_id", "==", recipeId).get();

            if (querySnapshot.empty) {
                return { success: false, message: "Không tìm thấy nguyên liệu cho công thức này!" };
            }

            const ingredients = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return { success: true, ingredients };
        } catch (error) {
            console.error("Lỗi khi lấy nguyên liệu:", error);
            return { success: false, message: "Lỗi khi lấy nguyên liệu!" };
        }
    }

    // Cập nhật nguyên liệu trong công thức
    async updateRecipeIngredient(id, data) {
        try {
            const docRef = db.collection("recipe_ingredients").doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return { success: false, message: "Không tìm thấy nguyên liệu này!" };
            }

            await docRef.update(data);

            return { success: true, message: "Cập nhật nguyên liệu thành công!" };
        } catch (error) {
            console.error("Lỗi khi cập nhật nguyên liệu:", error);
            return { success: false, message: "Lỗi khi cập nhật nguyên liệu!" };
        }
    }

    // Xóa nguyên liệu khỏi công thức
    async deleteRecipeIngredient(id) {
        try {
            const docRef = db.collection("recipe_ingredients").doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return { success: false, message: "Không tìm thấy nguyên liệu này!" };
            }

            await docRef.delete();

            return { success: true, message: "Xóa nguyên liệu thành công!" };
        } catch (error) {
            console.error("Lỗi khi xóa nguyên liệu:", error);
            return { success: false, message: "Lỗi khi xóa nguyên liệu!" };
        }
    }
}

module.exports = RecipeIngredientController;
