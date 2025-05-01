const express = require('express');
const router = express.Router();

const FavoriteController = require("../controller/FavoriteController");

router.get("/:userID/:type", async (req, res) => {
    try {
        const { userID, type } = req.params

        const favoriteController = new FavoriteController()

        const result = await favoriteController.getFavoriteByUserID(userID, type);

        return res.status(200).json({
            itemIDs: result.itemIDs,
            message: result.message
        })
    }
    catch (error) {
        return res.status(500).json({
            itemIDs: false,
            message: "Lỗi kết nối! Ro"
        })
    }
})

router.get("/getFavorite/:userID/:itemID/:type", async (req, res) => {
    try {
        const { userID, itemID, type } = req.params

        const favoriteController = new FavoriteController()
        const result = await favoriteController.getFavoriteByIDs(userID, itemID, type)

        return res.status(200).json({
            favorite: result.favorite,
            message: result.message
        })
    }
    catch (error) {
        return res.status(500).json({
            favorite: false,
            message: "Lỗi kết nối!"
        })
    }
})

router.post("/newFavorite/:userID/:itemID/:type", async (req, res) => {
    try {
        const { userID, itemID, type } = req.params

        const favoriteController = new FavoriteController()
        const result = await favoriteController.postFavoriteIDs(userID, itemID, type)

        return res.status(200).json({
            message: result.message
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Lỗi kết nối!"
        })
    }
})

router.delete("/deleteFavorite/:userID/:itemID/:type", async (req, res) => {
    try {
        const { userID, itemID, type } = req.params

        const favoriteController = new FavoriteController()
        const result = await favoriteController.deleteFavoriteIDs(userID, itemID, type)

        return res.status(200).json({
            message: result.message
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Lỗi kết nối!"
        })
    }
})

module.exports = router;