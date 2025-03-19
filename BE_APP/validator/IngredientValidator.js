const { body } = require("express-validator");

const validateIngredient = [
    body("name").notEmpty().withMessage("Tên nguyên liệu không được để trống"),
    body("calories")
        .isInt({ min: 0 })
        .withMessage("Lượng calo phải là số không âm"),
    body("protein")
        .isInt({ min: 0 })
        .withMessage("Lượng protein phải là số không âm"),
    body("fat")
        .isInt({ min: 0 })
        .withMessage("Lượng chất béo phải là số không âm"),
    body("carb")
        .isInt({ min: 0 })
        .withMessage("Lượng carb phải là số không âm"),
    body("quantity")
        .isInt({ min: 0})
        .withMessage("Số lượng phải lớn hơn 0"),
        body("price")
        .isInt({ min: 0})
        .withMessage("Số lượng phải lớn hơn 0"),
    body("unit").notEmpty().withMessage("Đơn vị không được để trống"),
];

module.exports = { validateIngredient };
