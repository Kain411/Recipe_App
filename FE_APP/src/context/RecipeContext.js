import { createContext, useState } from "react";

export const RecipeContext = createContext()

export const RecipeProvider = ({children}) => {

    const [recipes, setRecipes] = useState([])

    const handleSaveRecipe = (foods) => {
        setRecipes(foods)
    }

    return (
        <RecipeContext.Provider value={{ recipes, handleSaveRecipe}}>
            {children}
        </RecipeContext.Provider>
    )
}