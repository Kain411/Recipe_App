const { db } = require("../firebase");
class OrderController {
    async createOrder(userId, orderInfo) {
        try {
            // Tạo đơn hàng
            const newDoc = db.collection("orders").doc();
            const newOrder = {
                id: newDoc.id,
                user_id: userId,
                name: orderInfo.name,
                phone: orderInfo.phone,
                strict: orderInfo.strict,
                ward: orderInfo.ward,
                district: orderInfo.district,
                province: orderInfo.province,
                shippingFee: orderInfo.shippingFee,
                paymentType: orderInfo.paymentType,
                totalPrice: orderInfo.totalPrice,
                status: orderInfo.status
            };
    
            // Mảng chứa các Promise sẽ xử lý song song
            const deletePromises = [];
    
            // Xử lý song song các thao tác xóa
            orderInfo.ingredients.forEach(({ ingredientId, quantity, price, cartIngreId, cartRecipeId }) => {
                // Nếu có cartIngredientId thì xóa nguyên liệu trong cart_ingredients
                if (cartIngreId) {
                    const ingredientRef = db.collection("cart_ingredients").doc(cartIngreId);
                    deletePromises.push(ingredientRef.delete());
                }
    
                if (cartRecipeId) {
                    const recipeRef = db.collection("cart_recipes").doc(cartRecipeId);
                    deletePromises.push(recipeRef.delete());
                }
    
                const newDocRef = db.collection("order_ingredients").doc();
                deletePromises.push(
                    newDocRef.set({
                        id: newDocRef.id,
                        order_id: newDoc.id,
                        ingredient_id: ingredientId,
                        quantity: quantity,
                        price: price
                    })
                );
            });
    
            await Promise.all(deletePromises);
    
            // Sau khi xóa xong, thêm đơn hàng vào Firestore
            await newDoc.set(newOrder);
    
            return { success: true, message: "Tạo đơn hàng thành công!", id: newDoc.id };
        } catch (error) {
            console.error("Lỗi tạo đơn hàng:", error);
            return { success: false, message: "Lỗi tạo đơn hàng!" };
        }
    }
    
}
module.exports = OrderController;
