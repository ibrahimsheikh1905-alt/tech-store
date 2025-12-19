import api from "./api";

export const getCart = () => api.get("/cart");
export const addToCart = (productId, quantity) =>
  api.post("/cart/add", { productId, quantity });
export const updateQuantity = (productId, quantity) =>
  api.put("/cart/update", { productId, quantity });
export const removeItem = (productId) => api.delete(`/cart/remove/${productId}`);
export const clearCart = () => api.delete("/cart/clear");
export const mergeGuestCart = (guestItems) => api.post("/cart/merge", { guestItems });
