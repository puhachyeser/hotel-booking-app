import { createContext, useContext, useState, useEffect } from 'react'
import axiosInstance from '../axiosInstance'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return
        setIsLoggedIn(!!token)

        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get('/users/me')
                setUser(res.data.user)
                setIsLoggedIn(true)
            } catch {
                setIsLoggedIn(false)
                setUser(null)
            }
        }

        fetchUser()
    }, [])

    const login = (token, userData) => {
        localStorage.setItem('token', token)
        setIsLoggedIn(true)
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}