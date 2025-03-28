import React, { createContext, useState } from 'react'
import { register, login, getUserByID } from '../services/AuthService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth, signInWithEmailAndPassword } from "../database/firebase";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [userLogin, setUserLogin] = useState(null)

    const handleRegister = async (user) => {
        const result = await register(user) 
        if (result.success) {
            return { success: true, message: result.message }
        }
        else return { success: false, message: result.message }
    }

    const handleLogin = async (user) => {

        user.email = "asa@gmail.com"
        user.password = "411411"

        if (!user.email || !user.password) {
            return { success: false, message: "Vui lòng nhập đủ thông tin!" }
        }

        if (user.email.slice(-10) != "@gmail.com") {
            return { success: false, message: "Sai địa chỉ email!" }
        }

        if (user.password.length < 6) {
            return { success: false, message: "Mật khẩu ít hơn 6 kí tự!" }
        }

        try {
            // const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
            const result = await login(user)

            if (result.success) {
                setUserLogin(result.user)
                await AsyncStorage.setItem("user", JSON.stringify(result.user))
                return { success: true, message: result.message }
            }
            else return { success: false, message: result.message }
        }
        catch (error) {
            return { success: false, message: "Sai tài khoản hoặc mật khẩu" }
        }
    }

    const handleGetUserByID = async (userID) => {
        const result = await getUserByID(userID)

        return { user: result.user, message: result.message }
    }

    return (
        <AuthContext.Provider value={{ userLogin, handleRegister, handleLogin, handleGetUserByID }}>
            {children}
        </AuthContext.Provider>
    )
}