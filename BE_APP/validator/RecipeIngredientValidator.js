const { body } = require("express-validator");

const validateRecipeIngredient = [
    body("recipe_id").notEmpty().withMessage("recipe_id không được để trống"),
    body("ingredient_id").notEmpty().withMessage("ingredient_id không được để trống"),
    body("quantity")
        .isInt({ min: 0 })
        .withMessage("quantity phải là số lớn hơn 0"),
    body("unit").notEmpty().withMessage("unit không được để trống"),
];

module.exports = { validateRecipeIngredient };
