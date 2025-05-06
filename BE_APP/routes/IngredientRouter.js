const express = require("express");
const { validationResult } = require("express-validator");
const { validateIngredient } = require("../validator/IngredientValidator");
const IngredientController = require("../controller/IngredientController");

const router = express.Router();
const ingredientController = new IngredientController();

// API thêm nguyên liệu
router.post("/", validateIngredient, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const result = await ingredientController.addIngredient(req.body);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

// API lấy danh sách nguyên liệu
router.get("/", async (req, res) => {
    try {
        const result = await ingredientController.getAllIngredients();
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

// API lấy nguyên liệu theo ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ingredientController.getIngredientById(id);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

//API lây nguyên liệu theo id_supplier
router.get("/supplier/:id_supplier", async(req, res) =>{
    try {
        const {id_supplier} = req.params
        const result = await ingredientController.getIngredientBySupplierId(id_supplier)
        return res.status(result.success? 200 : 404).json(result)
    } catch (e) {
        return res.status(500).json({success: false, message: "Lỗi server"})
    }
})

// API cập nhật nguyên liệu
router.put("/:id", validateIngredient, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const result = await ingredientController.updateIngredient(id, req.body);
        return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

// API xóa nguyên liệu
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ingredientController.deleteIngredient(id);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

module.exports = router;
