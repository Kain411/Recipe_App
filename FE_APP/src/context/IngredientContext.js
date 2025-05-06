import React, { createContext, useState } from 'react'
import {getAllIngredient, getAllIngredientsBySupplierId, addIngredientToCart} from '../services/IngredientService'
import { getIngredientById } from '../services/IngredientService'

export const IngredientContext = createContext()

export const IngredientProvider = ({children}) => {

    const [ingredients, setIngredients] = useState([])
    const [ingredient, setIngredient] = useState()

    const handleGetAllIngredient = async () => {
        const result = await getAllIngredient()
        setIngredients(result.ingredients)
        return { ingredients: result.ingredients, message: result.message }
    }

    const handleGetIngredientById = async (id) =>{
        const result = await getIngredientById(id)
        setIngredient(result.ingredient)
        return{ingredient: result.ingredient, message: result.message}
    }

    const handleGetIngredientBySupplierId = async(id_supplier) =>{
        const result = await getAllIngredientsBySupplierId(id_supplier)
        return {ingredients: result.ingredients, message: result.message}
    }

    const handleAddIngredientToCart = async(id_user, id_ingredient, quantity) =>{
        const result = await addIngredientToCart(id_user, id_ingredient, quantity)
        console.log(result)
        return{message: result.message}
    }
    return (
        <IngredientContext.Provider value={
            { ingredients, handleGetAllIngredient,
            ingredient, handleGetIngredientById, 
            handleGetIngredientBySupplierId,
            handleAddIngredientToCart
            }
            }>
            {children}
        </IngredientContext.Provider>
    )
}