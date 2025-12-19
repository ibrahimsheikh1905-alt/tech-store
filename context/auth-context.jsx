"use client"

import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [pendingProduct, setPendingProduct] = useState(null)

  // 🔹 Load user on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    const savedPending = localStorage.getItem("pendingProduct")
    if (savedPending) {
      setPendingProduct(JSON.parse(savedPending))
    }
  }, [])

  // 🔹 Login (NO BACKEND)
  const login = async (email, password) => {
    if (!email || !password) {
      return { success: false, error: "Email & password required" }
    }

    const fakeUser = {
      id: Date.now(),
      name: email.split("@")[0],
      email,
    }

    localStorage.setItem("user", JSON.stringify(fakeUser))
    setUser(fakeUser)

    return { success: true }
  }

  // 🔹 Signup
  const signup = async (name, email, password) => {
    if (!name || !email || !password) {
      return { success: false, error: "All fields required" }
    }

    const fakeUser = {
      id: Date.now(),
      name,
      email,
    }

    localStorage.setItem("user", JSON.stringify(fakeUser))
    setUser(fakeUser)

    return { success: true }
  }

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  // 🔹 Pending product helpers (USED BY LOGIN / SIGNUP)
  const getPendingProduct = () => pendingProduct

  const clearPendingProduct = () => {
    localStorage.removeItem("pendingProduct")
    setPendingProduct(null)
  }

  const savePendingProduct = (product) => {
    localStorage.setItem("pendingProduct", JSON.stringify(product))
    setPendingProduct(product)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        // pending product flow
        getPendingProduct,
        clearPendingProduct,
        savePendingProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return ctx
}