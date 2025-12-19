// API Configuration
const API_URL =
  typeof window !== "undefined"
    ? import.meta?.env?.VITE_API_URL || "http://localhost:5000/api"
    : "http://localhost:5000/api"

// Axios-like fetch wrapper
const api = {
  async get(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
      if (!response.ok) throw new Error("Network response was not ok")
      return { data: await response.json() }
    } catch (error) {
      console.error("API GET Error:", error)
      throw error
    }
  },

  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Request failed")
      }
      return { data: await response.json() }
    } catch (error) {
      console.error("API POST Error:", error)
      throw error
    }
  },

  async put(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Network response was not ok")
      return { data: await response.json() }
    } catch (error) {
      console.error("API PUT Error:", error)
      throw error
    }
  },

  async delete(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
      if (!response.ok) throw new Error("Network response was not ok")
      return { data: await response.json() }
    } catch (error) {
      console.error("API DELETE Error:", error)
      throw error
    }
  },
}

export default api
export { API_URL }
