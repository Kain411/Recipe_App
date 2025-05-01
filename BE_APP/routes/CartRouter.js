const express = require("express");
const CartController = require("../controller/CartController");

const router = express.Router();
const cartController = new CartController();

router.post("/create-cart", async (req, res) => {
    try {
        const userId = req.body.userId
        const result = await cartController.createCart(userId);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

router.put("/update-cart-ingredient/:id", async (req, res) => {
    try {
        const id = req.params.id
        const quantity = req.body.quantity
        const result = await cartController.updateCartIngredient(id, quantity);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

router.put("/update-cart-recipe/:id", async (req, res) => {
    try {
        const id = req.params.id
        const quantity = req.body.quantity
        const result = await cartController.updateCartRecipe(id, quantity);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId
        console.log("=====>", userId)
        const result = await cartController.getCartByUserId(userId);
        return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

router.post("/:userId/add-to-cart", async (req, res) => {
    try {
        const userId = req.params.userId
        const {ingredientId, quantity} = req.body
        const result = await cartController.addIngredientToCart(userId, ingredientId, quantity);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

router.post("/:userId/add-recipe-to-cart", async (req, res) => {
    try {
        const userId = req.params.userId
        const {ingredients, recipeId} = req.body
        const result = await cartController.addRecipeToCart(userId, ingredients, recipeId);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

router.delete("/:userId/:cartIngredientId", async (req, res) => {
    try {
        const cartIngredientId = req.params.cartIngredientId;
        console.log(cartIngredientId)
        const result = await cartController.deleteIngredientId(cartIngredientId);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});

router.delete("/:userId/cart-recipe/:cartRecipeId", async (req, res) => {
    try {
        const cartRecipeId = req.params.cartRecipeId;
        console.log(cartRecipeId)
        const result = await cartController.deleteCartRecipeId(cartRecipeId);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});


router.delete("/:userId/delete/:recipeId/:cartId", async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const cartId = req.params.cartId;
        console.log(recipeId, cartId)
        const result = await cartController.deleteRecipeCart(recipeId, cartId);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});





module.exports = router;
