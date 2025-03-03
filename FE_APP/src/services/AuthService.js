const API_URL = "http://172.11.108.184:8000/api/users"

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

        console.log(data.message)

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

        if (response.ok) {
            return { 
                success: true, 
                user: data.user,
                message: data.message 
            }
        }
        else {
            return { success: false, message: data.message }
        }
    }
    catch (error) {
        return { success: false, message: "Lỗi kết nối!" }
    }
}