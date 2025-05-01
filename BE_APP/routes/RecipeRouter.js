const express = require("express");
const { validationResult } = require("express-validator");
const {
  validateRecipe,
  validateRecipeUpdate,
} = require("../validator/RecipeValidator");
const RecipeController = require("../controller/RecipeController");

const router = express.Router();
const recipeController = new RecipeController();

// API lấy danh sách công thức
router.get("/", async (req, res) => {
  try {
    const result = await recipeController.getRecipes();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi server!" });
  }
});

module.exports = router;
