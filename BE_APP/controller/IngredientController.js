const Ingredient = require("../model/Ingredient");
const { db } = require("../firebase")

class IngredientController {
    // Thêm nguyên liệu
    async addIngredient(data) {
        try {
            const newDoc = db.collection("ingredients").doc();
            const newIngredient = new Ingredient(
                newDoc.id,
                data.name,
                data.image_url,
                data.calories,
                data.protein,
                data.fat,
                data.carb,
                data.quantity,
                data.unit,
                data.price
            );

            await newDoc.set({ ...newIngredient });

            return { success: true, message: "Thêm nguyên liệu thành công!", id: newDoc.id };
        } catch (error) {
            console.error("Lỗi khi thêm nguyên liệu:", error);
            return { success: false, message: "Lỗi khi thêm nguyên liệu!" };
        }
    }

    // Lấy danh sách nguyên liệu
    async getAllIngredients() {
        try {
            const querySnapshot = await db.collection("ingredients").get();

            if (querySnapshot.empty) {
                return { success: false, message: "Không tìm thấy nguyên liệu nào!" };
            }

            const ingredients = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return { success: true, ingredients };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách nguyên liệu:", error);
            return { success: false, message: "Lỗi khi lấy danh sách nguyên liệu!" };
        }
    }

    // Lấy nguyên liệu theo ID
    async getIngredientById(id) {
        try {
            const doc = await db.collection("ingredients").doc(id).get();

            if (!doc.exists) {
                return { success: false, message: "Không tìm thấy nguyên liệu!" };
            }

            return { success: true, ingredient: { id: doc.id, ...doc.data() } };
        } catch (error) {
            console.error("Lỗi khi lấy nguyên liệu:", error);
            return { success: false, message: "Lỗi khi lấy nguyên liệu!" };
        }
    }

    // Cập nhật nguyên liệu
    async updateIngredient(id, data) {
        try {
            const docRef = db.collection("ingredients").doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return { success: false, message: "Không tìm thấy nguyên liệu!" };
            }

            await docRef.update(data);

            return { success: true, message: "Cập nhật nguyên liệu thành công!" };
        } catch (error) {
            console.error("Lỗi khi cập nhật nguyên liệu:", error);
            return { success: false, message: "Lỗi khi cập nhật nguyên liệu!" };
        }
    }

    // Xóa nguyên liệu
    async deleteIngredient(id) {
        try {
            const docRef = db.collection("ingredients").doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return { success: false, message: "Không tìm thấy nguyên liệu!" };
            }

            await docRef.delete();

            return { success: true, message: "Xóa nguyên liệu thành công!" };
        } catch (error) {
            console.error("Lỗi khi xóa nguyên liệu:", error);
            return { success: false, message: "Lỗi khi xóa nguyên liệu!" };
        }
    }
}

module.exports = IngredientController;
