const express = require("express");
const { validationResult } = require("express-validator");
const { validateRecipeIngredient } = require("../validator/RecipeIngredientValidator");
const RecipeIngredientController = require("../controller/RecipeIngredientController");

const router = express.Router();
const recipeIngredientController = new RecipeIngredientController();

// API thêm nguyên liệu vào công thức
router.post("/", validateRecipeIngredient, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const result = await recipeIngredientController.addRecipeIngredient(req.body);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

// API lấy danh sách nguyên liệu theo công thức
router.get("/:recipeId", async (req, res) => {
    try {
        const { recipeId } = req.params;
        const result = await recipeIngredientController.getIngredientsByRecipeId(recipeId);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

// API cập nhật nguyên liệu
router.put("/:id", validateRecipeIngredient, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const result = await recipeIngredientController.updateRecipeIngredient(id, req.body);
        return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

// API xóa nguyên liệu khỏi công thức
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await recipeIngredientController.deleteRecipeIngredient(id);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

module.exports = router;
