const { body } = require("express-validator");

const validateSupplier = [
    body("name")
    .notEmpty().withMessage("Tên nhà cung cấp không được để trống")
    .isLength({ max: 100 }).withMessage("Tên nhà cung cấp không được vượt quá 100 ký tự"),

    body("phone")
    .notEmpty().withMessage("Số điện thoại không được để trống")
    .matches(/^(0|\+84)[0-9]{9}$/).withMessage("Số điện thoại không hợp lệ"),

    body("email")
    .notEmpty().withMessage("Email không được để trống")
    .isEmail().withMessage("Email không hợp lệ"),

    body("location")
    .notEmpty().withMessage("Địa chỉ không được để trống")
    .isLength({ max: 200 }).withMessage("Địa chỉ không được vượt quá 200 ký tự"),    

    body("description")
    .notEmpty().withMessage("Mô tả shop không được để trống")
    .isLength({max: 500}).withMessage("Mô tả quá dài"),
            
    body("background_url")
    .notEmpty().withMessage("backgroun_url không được trống")
];

module.exports = {validateSupplier};