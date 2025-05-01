const { db } = require("../firebase");

class CartController {
    async createCart(userId) {
        try {
            const newDoc = db.collection("carts").doc();
            const newCart = {
                id: newDoc.id,
                user_id: userId,
                totalPrice: 0
            };

            await newDoc.set(newCart);

            return { success: true, message: "Tạo giỏ hàng!", id: newDoc.id };
        } catch (error) {
            console.error("Lỗi tạo giỏ hàng:", error);
            return { success: false, message: "Lỗi tạo giỏ hàng!" };
        }
    }

    async addIngredientToCart(userId, ingredientId, quantity) {
        try {
            // Tìm giỏ hàng của user
            const cartSnapshot = await db.collection("carts")
                .where("user_id", "==", userId)
                .limit(1)
                .get();

            if (cartSnapshot.empty) {
                return { success: false, message: "Giỏ hàng không tồn tại!" };
            }

            const cartDoc = cartSnapshot.docs[0];
            const cartId = cartDoc.id;

            // Kiểm tra xem ingredient đã tồn tại trong cart chưa
            const existingIngredientSnap = await db.collection("cart_ingredients")
                .where("cart_id", "==", cartId)
                .where("ingredient_id", "==", ingredientId)
                .limit(1)
                .get();

            if (!existingIngredientSnap.empty) {
                // Đã tồn tại → tăng số lượng
                const docRef = existingIngredientSnap.docs[0].ref;
                const existingData = existingIngredientSnap.docs[0].data();
                const newQuantity = existingData.quantity + quantity;

                await docRef.update({ quantity: newQuantity });

                return { success: true, message: "Đã cập nhật số lượng nguyên liệu trong giỏ hàng!" };
            } else {
                // Chưa tồn tại → thêm mới
                const newDoc = db.collection("cart_ingredients").doc();
                const newCartIngre = {
                    id: newDoc.id,
                    cart_id: cartId,
                    ingredient_id: ingredientId,
                    quantity: quantity
                };

                await newDoc.set(newCartIngre);

                return { success: true, message: "Đã thêm nguyên liệu vào giỏ hàng!", id: newDoc.id };
            }
        } catch (error) {
            console.error("Lỗi thêm nguyên liệu vào giỏ hàng:", error);
            return { success: false, message: "Lỗi thêm nguyên liệu vào giỏ hàng!" };
        }
    }
    async addRecipeToCart(userId, ingredients, recipeId) {
        try {
            // Tìm giỏ hàng của user
            const cartSnapshot = await db.collection("carts")
                .where("user_id", "==", userId)
                .limit(1)
                .get();

            if (cartSnapshot.empty) {
                return { success: false, message: "Giỏ hàng không tồn tại!" };
            }

            const cartId = cartSnapshot.docs[0].id;

            // Tìm xem công thức đó đã có trong cart_recipes chưa (theo cart_id + recipe_id)
            const recipeSnapshot = await db.collection("cart_recipes")
                .where("cart_id", "==", cartId)
                .where("recipe_id", "==", recipeId)
                .get();

            const batch = db.batch();

            // Nếu đã tồn tại thì xóa hết nguyên liệu cũ
            if (!recipeSnapshot.empty) {
                recipeSnapshot.forEach(doc => {
                    batch.delete(doc.ref);
                });
            }

            // Thêm nguyên liệu mới
            ingredients.forEach(({ ingredientId, quantity }) => {
                const newDocRef = db.collection("cart_recipes").doc();
                batch.set(newDocRef, {
                    id: newDocRef.id,
                    cart_id: cartId,
                    ingredient_id: ingredientId,
                    quantity: quantity,
                    recipe_id: recipeId
                });
            });

            await batch.commit(); // Thực hiện tất cả các thao tác cùng lúc

            return { success: true, message: "Thêm vào giỏ hàng thành công!", cart_id: cartId };
        } catch (error) {
            console.error("Lỗi thêm vào giỏ hàng:", error);
            return { success: false, message: "Lỗi thêm vào giỏ hàng!" };
        }
    }

    async getCartByUserId(userId) {
        try {
            const cartSnapshot = await db.collection("carts")
                .where("user_id", "==", userId)
                .limit(1)
                .get();

            if (cartSnapshot.empty) {
                return { success: false, message: "Giỏ hàng không tồn tại!" };
            }

            const cartDoc = cartSnapshot.docs[0];
            const cartId = cartDoc.id;
            const cartData = cartDoc.data();

            // Truy vấn nguyên liệu & công thức trong giỏ hàng
            const [ingredientsSnapshot, recipesSnapshot] = await Promise.all([
                db.collection("cart_ingredients").where("cart_id", "==", cartId).get(),
                db.collection("cart_recipes").where("cart_id", "==", cartId).get()
            ]);

            const ingredientList = ingredientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const recipeList = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            const allIngredientIds = [...new Set([...ingredientList.map(i => i.ingredient_id), ...recipeList.map(r => r.ingredient_id)])];
            const recipeIds = [...new Set(recipeList.map(r => r.recipe_id))];

            const ingredientRefs = allIngredientIds.map(id => db.collection("ingredients").doc(id));
            const recipeRefs = recipeIds.map(id => db.collection("recipes").doc(id));

            // Truy vấn tài liệu từ doc ID thay vì dùng where("id", "in", [...])
            const [ingredientDocs, recipeDocs] = await Promise.all([
                ingredientRefs.length > 0 ? db.getAll(...ingredientRefs) : Promise.resolve([]),
                recipeRefs.length > 0 ? db.getAll(...recipeRefs) : Promise.resolve([])
            ]);

            const ingredientDataMap = Object.fromEntries(
                ingredientDocs.map(doc => {
                    const data = doc.data();
                    return [doc.id, { ingredientId: doc.id, name: data.name, unit: data.unit, url: data.url, base_quantity: data.quantity, base_price: data.price }];
                })
            );

            const recipeDataMap = Object.fromEntries(recipeDocs.map(doc => [doc.id, doc.data()]));

            const calculatePrice = (ingredientId, quantity) => {
                const ingredient = ingredientDataMap[ingredientId];
                if (!ingredient) return 0;

                const price = (quantity / ingredient.base_quantity) * ingredient.base_price;
                return Number.isInteger(price) ? price : parseFloat(price.toFixed(1));
            };

            const cartIngredients = ingredientList.map(item => ({
                id: item.id,
                quantity: item.quantity,
                price: calculatePrice(item.ingredient_id, item.quantity),
                ...(ingredientDataMap[item.ingredient_id] || {})
            }));


            const recipes = recipeList.reduce((acc, item) => {
                if (!acc[item.recipe_id]) {
                    acc[item.recipe_id] = { id: item.recipe_id, ...recipeDataMap[item.recipe_id], ingredients: [] };
                }
                acc[item.recipe_id].ingredients.push({
                    cart_recipe_id: item.id,
                    quantity: item.quantity,
                    price: calculatePrice(item.ingredient_id, item.quantity),
                    ...(ingredientDataMap[item.ingredient_id] || {})
                });
                return acc;
            }, {});

            return {
                success: true,
                cart: { id: cartId, ...cartData, cartIngredients: Object.values(cartIngredients), recipes: Object.values(recipes) }
            };
        } catch (error) {
            console.error("Lỗi lấy giỏ hàng:", error);
            return { success: false, message: "Lỗi lấy giỏ hàng!" };
        }
    }
    async deleteIngredientId(id) {
        try {
            await db.collection("cart_ingredients").doc(id).delete();

            return { success: true, message: "Đã xóa nguyên liệu!" };
        } catch (error) {
            console.error("Lỗi xóa nguyên liệu:", error);
            return { success: false, message: "Lỗi xóa nguyên liệu!" };
        }
    }

    async deleteCartRecipeId(id) {
        try {
            await db.collection("cart_recipes").doc(id).delete();

            return { success: true, message: "Đã xóa nguyên liệu!" };
        } catch (error) {
            console.error("Lỗi xóa nguyên liệu:", error);
            return { success: false, message: "Lỗi xóa nguyên liệu!" };
        }
    }

    async deleteRecipeCart(recipeId, cartId) {
        try {
            const querySnapshot = await db.collection("cart_recipes")
                .where("recipe_id", "==", recipeId)
                .where("cart_id", "==", cartId)
                .get();

            if (querySnapshot.empty) {
                return { success: false, message: "Không tìm thấy công thức nào trong giỏ hàng!" };
            }

            const deletePromises = querySnapshot.docs.map(doc => doc.ref.delete());
            await Promise.all(deletePromises);

            return { success: true, message: `Đã xoá ${querySnapshot.size} công thức khỏi giỏ hàng!` };
        } catch (error) {
            console.error("Lỗi xóa công thức:", error);
            return { success: false, message: "Lỗi xóa công thức!" };
        }
    }

    async updateCartIngredient(id, quantity) {
        try {
            const docRef = db.collection('cart_ingredients').doc(id);
            const docSnap = await docRef.get();

            if (!docSnap.exists) {
                return { success: false, message: 'Không tìm thấy nguyên liệu!' };
            }

            await docRef.update({ quantity });
            return { success: true, message: `Cập nhật thành công` };

        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng:', error);
            return res.status(500).json({ success: false, message: 'Lỗi server khi cập nhật!' });
        }
    }

    async updateCartRecipe(id, quantity) {
        try {
            const docRef = db.collection('cart_recipes').doc(id);
            const docSnap = await docRef.get();

            if (!docSnap.exists) {
                return { success: false, message: `Không tìm thấy` };
            }

            await docRef.update({ quantity });

            return { success: true, message: `Cập nhật thành công` };
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng:', error);
            return res.status(500).json({ success: false, message: 'Lỗi server khi cập nhật!' });
        }
    }

}



module.exports = CartController;
