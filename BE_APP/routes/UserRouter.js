const express = require("express");
const router = express.Router();
const { auth } = require("../firebase")

const UserController = require("../controller/UserController");

router.get("", async (req, res) => {
    try {
        const userController = new UserController();
        const users = await userController.getAllUser();

        if (users.users == null) {
            return res.status(404).json({message: users.message})
        }

        return res.status(200).json({
            users: users.users,
            message: users.message
        })
    }
    catch (error) {
        return res.status(500).json({message: "Lỗi kết nối!"})
    }
});

router.get("/user/:userID", async (req, res) => {
    try {
        const { userID } = req.params;
        
        const userController = new UserController();
        const user = await userController.getUserByID(userID)

        if (user.user == null) {
            return res.status(404).json({message: user.message})
        }

        return res.status(200).json({
            user: user.user,
            message: user.message
        })
    }
    catch (error) {
        return res.status(500).json({message: "Lỗi kết nối!"})
    }
})

router.put("/user/:userID", async (req, res) => {
    try {
        const { userID } = req.params;
        const userData = req.body;

        const userController = new UserController();
        const updatedUser = await userController.updateUserByID(userID, userData);

        if (!updatedUser.success) {
            return res.status(404).json({ message: updatedUser.message });
        }

        return res.status(200).json({
            user: updatedUser.user,
            message: updatedUser.message
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi kết nối!" });
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

        const userController = new UserController();
        await userController.addNewUser(user)

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

    console.log("Login")

    try {
        const userController = new UserController();
        const userRecord = await userController.getUserByEmail(user.email)

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