import React from 'react'
import { AuthProvider } from './AuthContext'

const ContextWrapper = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export default ContextWrapper;