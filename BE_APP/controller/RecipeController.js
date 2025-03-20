const { db } = require("../firebase");
const Recipe = require("../model/Recipe");
const RecipeIngredient = require("../model/RecipeIngredient");
const Step = require("../model/Step");




class RecipeController {
    async createRecipe(recipeData) {
        try {
            if (!recipeData.mode) {
                recipeData.mode = null
            }
            // Tạo mới công thức
            const recipeRef = db.collection("recipes").doc();
            const recipe = new Recipe(recipeRef.id, recipeData.name, recipeData.category, recipeData.video_url, 
                recipeData.person, recipeData.mode, recipeData.total_cooking_time, recipeData.user_id);
            await recipeRef.set({ ...recipe });

            // Thêm nguyên liệu vào `recipe_ingredients`
            const ingredientPromises = recipeData.ingredients.map(async (ing) => {
                const ingredientRef = db.collection("recipe_ingredients").doc();
                const recipeIngredient = new RecipeIngredient(ingredientRef.id, recipeRef.id, ing.ingredient_id, ing.quantity, ing.unit);
                return ingredientRef.set({ ...recipeIngredient });
            });

            // Thêm các bước chế biến vào `steps`
            const stepPromises = recipeData.steps.map(async (step, index) => {
                const stepRef = db.collection("steps").doc();
                const stepData = new Step(stepRef.id, recipeRef.id, index + 1, step.description, step.duration);
                return stepRef.set({ ...stepData });
            });

            await Promise.all([...ingredientPromises, ...stepPromises]);

            return { success: true, message: "Đã tạo công thức nấu ăn thành công!", recipeId: recipeRef.id };
        } catch (error) {
            console.log(error)

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
            const recipeRef = db.collection("recipes").doc(id);
            const recipeDoc = await recipeRef.get();

            if (!recipeDoc.exists) {
                return { success: false, message: "Không tìm thấy công thức!" };
            }

            // Lấy danh sách nguyên liệu từ bảng `recipe_ingredients`
            const ingredientsSnapshot = await db.collection("recipe_ingredients")
                .where("recipe_id", "==", id)
                .get();
            const ingredients = ingredientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Lấy danh sách bước hướng dẫn từ bảng `instructions`
            const stepsSnapshot = await db.collection("steps")
                .where("recipe_id", "==", id)
                .get();

            const steps = stepsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            steps.sort((a, b) => a.step_number - b.step_number);

            return {
                success: true,
                recipe: {
                    id: recipeDoc.id,
                    ...recipeDoc.data(),
                    ingredients,
                    steps
                }
            };
        } catch (error) {
            console.error("Lỗi khi lấy công thức:", error);
            return { success: false, message: "Lỗi khi lấy công thức!", error: error.message };
        }
    }


    async updateRecipeByID(id, recipeData) {
        try {
            const recipeRef = db.collection("recipes").doc(id);
            const recipeDoc = await recipeRef.get();

            if (!recipeDoc.exists) {
                return { success: false, message: "Không tìm thấy công thức!" };
            }
            // Cập nhật thông tin công thức
            await recipeRef.update({
                name: recipeData.name,
                category: recipeData.category,
                video_url: recipeData.video_url,
                person: recipeData.person,
                mode: recipeData.mode ?? null,
                total_cooking_time: recipeData.total_cooking_time,
                user_id: recipeData.user_id
            });

            // Xóa nguyên liệu cũ
            const ingredientQuery = db.collection("recipe_ingredients").where("recipe_id", "==", id);
            const ingredientDocs = await ingredientQuery.get();
            const ingredientDeletes = ingredientDocs.docs.map(doc => doc.ref.delete());

            // Xóa bước chế biến cũ
            const stepQuery = db.collection("steps").where("recipe_id", "==", id);
            const stepDocs = await stepQuery.get();
            const stepDeletes = stepDocs.docs.map(doc => doc.ref.delete());

            await Promise.all([...ingredientDeletes, ...stepDeletes]);

            // Thêm nguyên liệu mới
            const ingredientPromises = recipeData.ingredients.map(async (ing) => {
                const ingredientRef = db.collection("recipe_ingredients").doc();
                return ingredientRef.set({
                    id: ingredientRef.id,
                    recipe_id: id,
                    ingredient_id: ing.ingredient_id,
                    quantity: ing.quantity,
                    unit: ing.unit
                });
            });

            // Thêm các bước chế biến mới
            const stepPromises = recipeData.steps.map(async (step, index) => {
                const stepRef = db.collection("steps").doc();
                return stepRef.set({
                    id: stepRef.id,
                    recipe_id: id,
                    step_number: index + 1,
                    description: step.description,
                    duration: step.duration
                });
            });

            await Promise.all([...ingredientPromises, ...stepPromises]);
            return { success: true, message: "Công thức đã được cập nhật!" };
        } catch (error) {
            return { success: false, message: "Lỗi chỉnh sửa công thức!", error: error.message };
        }
    }
    



    async deleteRecipeByID(id) {
        try {
            const recipeRef = db.collection("recipes").doc(id);
            const recipeDoc = await recipeRef.get();

            if (!recipeDoc.exists) {
                return { success: false, message: "Không tìm thấy công thức!" };
            }
            await Promise.all([
                recipeRef.delete(),
                db.collection("recipe_ingredients").where("recipe_id", "==", id),
                db.collection("steps").where("recipe_id", "==", id),

            ])
            return { success: true, message: "Công thức đã được xóa!" };
        } catch (error) {
            return { success: false, message: "Lỗi khi xóa công thức!" };
        }
    }
}

module.exports = RecipeController;
