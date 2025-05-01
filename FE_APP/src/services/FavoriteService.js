import { HostURL } from "./Host";
const API_URL = `${HostURL}/favorites`

export const getFavoriteByUserID = async (userID, type) => {
    try {
        const response = await fetch(`${API_URL}/${userID}/${type}`)

        if (!response.ok) {
            return { itemIDs: null, message: "Lỗi kết nối!" }
        }

        const result = await response.json()

        return { itemIDs: result.itemIDs, message: result.message }
    }
    catch (error) {
        return { itemIDs: null, message: "Lỗi kết nối!" }
    }
}

export const getFavoriteByIDs = async (userID, itemID, type) => {
    try {
        const response = await fetch(`${API_URL}/getFavorite/${userID}/${itemID}/${type}`)

        if (!response.ok) {
            return { favorite: false, message: "Lỗi kết nối!" }
        }

        const result = await response.json()

        return { favorite: result.favorite, message: result.message }
    }
    catch (error) {
        return { favorite: false, message: "Lỗi kết nối!" }
    }
}

export const postFavoriteByIDs = async (userID, itemID, type) => {
    try {
        const response = await fetch(`${API_URL}/newFavorite/${userID}/${itemID}/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            return { message: "Lỗi kết nối!" }
        }

        const result = await response.json()


        return { message: result.message }
    }
    catch (error) {
        return { message: "Lỗi kết nối!" }
    }
}

export const deleteFavoriteByIDs = async (userID, itemID, type) => {
    try {
        const response = await fetch(`${API_URL}/deleteFavorite/${userID}/${itemID}/${type}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            return { message: "Lỗi kết nối!" }
        }

        const result = await response.json()

        return { message: result.message }
    }
    catch (error) {
        return { message: "Lỗi kết nối!" }
    }
}