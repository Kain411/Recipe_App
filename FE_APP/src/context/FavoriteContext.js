import React, { createContext, useContext, useState } from "react";
import { getFavoriteByUserID, getFavoriteByIDs, postFavoriteByIDs, deleteFavoriteByIDs } from "../services/FavoriteService";

export const FavoriteContext = createContext()

export const FavoriteProvider = ({children}) => {

    const handleGetFavoriteByUserID = async (userID, type) => {
        const result = await getFavoriteByUserID(userID, type)

        return { itemIDs: result.itemIDs, message: result.message }
    }

    const handleGetFavoriteByIDs = async (userID, itemID, type) => {
        const result = await getFavoriteByIDs(userID, itemID, type)

        return { favorite: result.favorite, message: result.message }
    }

    const handlePostFavoriteByIDs = async (userID, itemID, type) => {
        const result = await postFavoriteByIDs(userID, itemID, type)

        return { message: result.message }
    }

    const handleDeleteFavoriteByIDs = async (userID, itemID, type) => {
        const result = await deleteFavoriteByIDs(userID, itemID, type)

        return { message: result.message }
    }

    return (
        <FavoriteContext.Provider value={{ handleGetFavoriteByUserID, handleGetFavoriteByIDs, handlePostFavoriteByIDs, handleDeleteFavoriteByIDs }}>
            {children}
        </FavoriteContext.Provider>
    )
}