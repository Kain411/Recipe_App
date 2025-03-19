const { body } = require("express-validator");

const validateRecipe = [
    body("name")
        .notEmpty().withMessage("Tên công thức không được để trống.")
        .isString().withMessage("Tên công thức phải là chuỗi.")
        .trim(),

    body("category")
        .notEmpty().withMessage("Danh mục không được để trống.")
        .isString().withMessage("Danh mục phải là chuỗi.")
        .trim(),

    body("video_url")
        .optional()
        .isURL().withMessage("URL video không hợp lệ."),

    body("person")
        .notEmpty().withMessage("Số người phục vụ không được để trống.")
        .isInt({ min: 1 }).withMessage("Số người phục vụ phải là số nguyên >= 1."),

    body("total_cooking_time")
        .notEmpty().withMessage("Tổng thời gian nấu không được để trống.")
        .isInt({ min: 1 }).withMessage("Tổng thời gian nấu phải là số nguyên >= 1."),

    body("user_id")
        .notEmpty().withMessage("ID người dùng không được để trống.")
        .isString().withMessage("ID người dùng phải là chuỗi.")
];

module.exports = { validateRecipe};
