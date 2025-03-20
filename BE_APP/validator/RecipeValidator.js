const { body } = require("express-validator");

const validateRecipe = [
    body("name").notEmpty().withMessage("Tên món ăn không được để trống"),
    body("category").notEmpty().withMessage("Danh mục không được để trống"),
    body("video_url").optional().isURL().withMessage("URL video không hợp lệ"),
    body("person")
        .isInt({ min: 1 })
        .withMessage("Số người ăn phải là số nguyên dương"),
    body("mode").optional().isString().withMessage("Chế độ món ăn phải là chuỗi"), // Cho phép không nhập, nhưng nếu nhập thì phải là chuỗi
    body("total_cooking_time")
        .isInt({ min: 1 })
        .withMessage("Thời gian nấu ăn phải là số nguyên dương"),
    body("user_id").notEmpty().withMessage("ID người dùng không được để trống"),
    body("ingredients")
        .isArray({ min: 1 })
        .withMessage("Cần có ít nhất một nguyên liệu")
        .custom((ingredients) => {
            ingredients.forEach((ing) => {
                if (!ing.ingredient_id || !ing.quantity || !ing.unit) {
                    throw new Error("Mỗi nguyên liệu phải có ID, số lượng và đơn vị");
                }
            });
            return true;
        }),
    body("steps")
        .isArray({ min: 1 })
        .withMessage("Cần có ít nhất một bước chế biến")
        .custom((steps) => {
            steps.forEach((step) => {
                if (!step.description || !step.duration) {
                    throw new Error("Mỗi bước phải có mô tả và thời gian");
                }
            });
            return true;
        }),
];

const validateRecipeUpdate = [
    body("name").optional().notEmpty().withMessage("Tên món ăn không được để trống"),
    body("category").optional().notEmpty().withMessage("Danh mục không được để trống"),
    body("video_url").optional().isURL().withMessage("URL video không hợp lệ"),
    body("person").optional().isInt({ min: 1 }).withMessage("Số người ăn phải là số nguyên dương"),
    body("mode").optional().custom((value) => value === null || typeof value === "string").withMessage("Phương thức chế biến không hợp lệ"),
    body("total_cooking_time").optional().isInt({ min: 1 }).withMessage("Thời gian nấu ăn phải là số nguyên dương"),
    body("user_id").optional().notEmpty().withMessage("ID người dùng không được để trống"),

    // Chỉ validate `ingredients` nếu có truyền vào request
    body("ingredients").optional().isArray({ min: 1 }).withMessage("Cần có ít nhất một nguyên liệu")
        .custom((ingredients) => {
            ingredients.forEach((ing) => {
                if (!ing.ingredient_id || !ing.quantity || !ing.unit) {
                    throw new Error("Mỗi nguyên liệu phải có ID, số lượng và đơn vị");
                }
            });
            return true;
        }),

    // Chỉ validate `steps` nếu có truyền vào request
    body("steps").optional().isArray({ min: 1 }).withMessage("Cần có ít nhất một bước chế biến")
        .custom((steps) => {
            steps.forEach((step) => {
                if (!step.description || !step.duration) {
                    throw new Error("Mỗi bước phải có mô tả và thời gian");
                }
            });
            return true;
        }),
];

module.exports = {validateRecipe, validateRecipeUpdate};
