const express = require("express");
const { validationResult } = require("express-validator");
const { validateRecipe, validateRecipeUpdate } = require("../validator/RecipeValidator");
const RecipeController = require("../controller/RecipeController");

const router = express.Router();
const recipeController = new RecipeController();

// API tạo công thức
router.post("/", validateRecipe, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const recipeData = req.body;
        const result = await recipeController.createRecipe(recipeData);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

// API lấy danh sách công thức
router.get("/", async (req, res) => {
    try {
        const result = await recipeController.getRecipes();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});



// API lấy công thức theo ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await recipeController.getRecipeByID(id);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

// API cập nhật công thức theo ID
router.put("/:id", validateRecipe, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const recipeData = req.body;
        const result = await recipeController.updateRecipeByID(id, recipeData);
        return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

// API xóa công thức theo ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await recipeController.deleteRecipeByID(id);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

router.get("/all/:userId", async (req, res) => {
    try {
        const userId = req.params.userId
        console.log("======>", userId)
        const result = await recipeController.getRecipesByUserId(userId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

module.exports = router;
