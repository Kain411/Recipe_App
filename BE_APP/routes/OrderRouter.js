const express = require("express");
const OrderController = require("../controller/OrderController");

const router = express.Router();
const orderController = new OrderController();

router.post("/:userId/create-order", async (req, res) => {
    try {
        const userId = req.params.userId
        const orderInfo = req.body.orderInfo
        console.log(orderInfo)
        const result = await orderController.createOrder(userId, orderInfo);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

module.exports = router;
