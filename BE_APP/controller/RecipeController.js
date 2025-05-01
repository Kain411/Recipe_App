const { db } = require("../firebase");
const Recipe = require("../model/Recipe");
const RecipeIngredient = require("../model/RecipeIngredient");
const Step = require("../model/Step");

const UserController = require("./UserController");

class RecipeController {
  async getRecipes() {
    try {
      const recipesSnapshot = await db.collection("recipes").get();
      const recipes = [];

      for (const doc of recipesSnapshot.docs) {
        const data = doc.data();
        const recipeId = doc.id;

        // Lấy danh sách steps
        const stepsSnapshot = await db
          .collection("steps")
          .where("recipe_id", "==", recipeId)
          .get();
        const steps = stepsSnapshot.docs.map((stepDoc) => stepDoc.data());

        // Lấy danh sách recipe_ingredients
        const recipeIngredientsSnapshot = await db
          .collection("recipe_ingredients")
          .where("recipe_id", "==", recipeId)
          .get();
        const recipeIngredients = [];
        let totalCalories = 0;
        let totalFat = 0;
        let totalCarbs = 0;
        let totalProtein = 0;

        for (const recipeIngDoc of recipeIngredientsSnapshot.docs) {
          const recipeIngData = recipeIngDoc.data();

          // Lấy thông tin ingredient từ bảng ingredients
          const ingredientRef = await db
            .collection("ingredients")
            .doc(recipeIngData.ingredient_id)
            .get();
          const ingredientData = ingredientRef.exists
            ? ingredientRef.data()
            : null;

          if (ingredientData) {
            const ingredientCalories = ingredientData.calories || 0;
            const ingredientFat = ingredientData.fat || 0;
            const ingredientCarbs = ingredientData.carbs || 0;
            const ingredientProtein = ingredientData.protein || 0;
            const ingredientQuantity = ingredientData.quantity || 1;
            const recipeIngQuantity = recipeIngData.quantity || 1;

            // Tính toán lượng dinh dưỡng cho recipe ingredient
            const ingredientFactor = recipeIngQuantity / ingredientQuantity;

            // Cộng dồn giá trị nutrition cho recipe
            totalCalories += ingredientCalories * ingredientFactor;
            totalFat += ingredientFat * ingredientFactor;
            totalCarbs += ingredientCarbs * ingredientFactor;
            totalProtein += ingredientProtein * ingredientFactor;
          }

          recipeIngredients.push({
            id: recipeIngDoc.id,
            quantity: recipeIngData.quantity,
            ingredient: ingredientData
              ? {
                  id: ingredientData.id,
                  name: ingredientData.name,
                  unit: ingredientData.unit,
                  quantity: ingredientData.quantity,
                  carbs: ingredientData.carbs,
                  fat: ingredientData.fat,
                  protein: ingredientData.protein,
                  calories: ingredientData.calories,
                  price: ingredientData.price,
                  url: ingredientData.url,
                }
              : {},
          });
        }

        // Thêm thông tin về tổng calories, fat, carbs và protein cho recipe

        const youTubeId = data.url.split("?v=")[1];
        const thumbnailUrl = `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg`;

        const userController = new UserController();
        const user = await userController.getUserByID(data.user_id);

        recipes.push({
          id: recipeId,
          name: data.name,
          mode: data.mode,
          description: data.description,
          person: data.person,
          totalTime: data.totalTime,
          url: data.url,
          thumbnail: thumbnailUrl,
          user: user.user,
          recipe_ingredients: recipeIngredients,
          steps: steps,
          totalCalories: totalCalories,
          totalFat: totalFat,
          totalCarbs: totalCarbs,
          totalProtein: totalProtein,
        });
      }

      // Log the recipes to check the structure
      console.log("Recipes:", recipes);

      return { success: true, recipes };
    } catch (error) {
      return {
        success: false,
        message: "Lỗi khi lấy danh sách công thức!",
        error,
      };
    }
  }
}

module.exports = RecipeController;
