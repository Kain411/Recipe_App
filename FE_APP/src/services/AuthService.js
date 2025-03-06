import { HostURL } from "./Host"
const API_URL = `${HostURL}/users`

export const register = async (user) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        const data = await response.json()

        if (response.ok) {
            return { success: true, message: data.message }
        }
        else {
            return { success: false, message: data.message }
        }
    }
    catch (error) {
        return { success: false, message: "Lỗi kết nối!" }
    }
}

export const login = async (user) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        const data = await response.json()

        if (!response.ok) {
            return { success: false, message: data.message }
        }

        return { 
            success: true, 
            user: data.user,
            message: data.message 
        }
    }
    catch (error) {
        return { success: false, message: "Lỗi kết nối!" }
    }
}

export const getUserByID = async (userID) => {
    try {
        const response = await fetch(`${API_URL}/user/${userID}`)
        
        if (!response.ok) {
            return { posts: null, message: "Lỗi kết nối" }
        }

        const result = await response.json()

        return { user: result.user, message: result.message }
    }
    catch (error) {
        return { user: null, message: "Lỗi kết nối!"  }
    }
}