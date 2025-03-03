const express = require("express");
const UserController = require("../controller/UserController");
const router = express.Router();
const { auth } = require("../firebase")

router.get("/getAllUser", async (req, res) => {
    try {
        const userController = new UserController();
        const users = await userController.getAllUser();
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json({message: 'Error'})
    }
});

router.post("/register", async (req, res) => {
    const user = req.body

    user.email = user.email.trim()

    if (!user.email || !user.password || !user.accuracy) {
        return res.status(400).json({
            message: "Vui lòng nhập đủ thông tin!"
        })
    }

    if (user.email.slice(-10) != "@gmail.com") {
        return res.status(400).json({
            message: "Sai địa chỉ email!"
        })
    }

    if (user.password.length < 6) {
        return res.status(400).json({
            message: "Mật khẩu ít hơn 6 kí tự!"
        })
    }

    if (user.password !== user.accuracy) {
        return res.status(400).json({
            message: "Mật khẩu không trùng khớp!"
        })
    }

    try {
        const userRecord = await auth.createUser({
            email: user.email,
            password: user.password
        })

        const userStore = {
            bg_url: "https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg",
            url: "https://www.shutterstock.com/image-vector/profile-line-icon-user-outline-260nw-1283517448.jpg",
            username: "New User",
            email: user.email,
            gender: "",
            dob: "",
            phone: "",
            location: ""
        }

        const userController = new UserController();
        await userController.addNewUser(userStore)

        return res.status(201).json({
            user: userRecord,
            message: "Đăng ký thành công"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Lỗi kết nối!"
        })
    }
})

router.post("/login", async (req, res) => {
    const user = req.body

    user.email = user.email.trim()

    try {
        const userController = new UserController();
        const userRecord = await userController.getUserByEmail(user.email)


        console.log(userRecord)

        return res.status(200).json({
            user: userRecord.user,
            message: userRecord.message
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Lỗi kết nối!"
        })
    }
})

module.exports = router;