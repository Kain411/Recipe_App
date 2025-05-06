// Goi API
import { HostURL } from "./Host";
const API_URL = `${HostURL}/ingredients`
const API_CART_URL = `${HostURL}/cart`

export const getAllIngredient = async()=>{
    try{
        const response = await fetch(`${API_URL}`,{method: 'GET'})
        if(!response.ok){
            return {
                status: response.status, 
                message: "Lỗi kết nối",
                ingredients: null,
            }
        }

        const result = await response.json()
        return{
            message: "Thành công",
            ingredients: result.ingredients
        }
    }
    catch(e){
        return{
            ingredients: null, 
            message: "Lỗi kết nối"
        }   
    }
}

export const getIngredientById = async(id) =>{
    try{
        const response = await fetch(`${API_URL}/${id}`, 
            { method: 'GET' })
        if(!response.ok){
            return {
                status: response.status,
                message: "Lỗi kết nối",
                ingredient: null,     
            }
        }

        const result = await response.json()
        return{
            message: "thành công",
            ingredient: result.ingredient        
        }
    }
    catch(e){
        return {ingredient: null, message: "Lỗi kết nối"}
    }
}

export const getAllIngredientsBySupplierId = async (id_supplier) => {
    try {
        const response = await fetch(`${API_URL}/supplier/${id_supplier}`, {method: 'GET'})
        if(!response.ok){
            return{
                status: response.status,
                message: 'Lỗi khi chạy API',
                ingredients : []
            }
        }
        const result = await response.json()
        console.log(response.result)
        return{
            message: "thành công",
            ingredients: result.ingredients
        }
    } catch (error) {
        return {ingredient: null, message: "Lỗi kết nối"}
    }
} 

export const addIngredientToCart = async(id_user, id_ingredient, quantity) =>{
    try {
        const response = await fetch(`${API_CART_URL}/${id_user}/add-to-cart`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "ingredientId": id_ingredient,
                "quantity": quantity
            })
        })

        const data = await response.json()
        if(!response.ok)
            return {message: data.message}
        else
            return {
                success: response.ok,
                message: data.message || "Thêm vào giỏ hàng thành công",
                data: data
            }
    } catch (e) {
        return {message: "Lỗi kết nối khi chạy API"}
    }
}
// export const addIngredient = async (
//     name,
//     image_url,
//     calories,
//     protein,
//     fat,
//     carb,
//     quantity,
//     unit,
//     price
// )=>{
//     try {
//         const response = await fetch(`${API_URL}`, {
//             method: "POST",
//             headers:{
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 name: name,
//                 image_url: image_url,
//                 calories: calories,
//                 protein: protein,
//                 fat: fat,
//                 carb: carb,
//                 quantity: quantity,
//                 unit: unit,
//                 price: price                
//             })
//         })

//         const data = await response.json()

//         if(!response.ok){
//             return {message: data.message, ingredientID: data.id}
//         }
//     } catch (error) {
//         return {message: "Lỗi kết nối", ingredientID: null};        
//     }
// }

