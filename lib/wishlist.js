import api from "./api";

export const getWishlist = () => api.get("/wishlist");
export const toggleWishlist = (productId) => api.post(`/wishlist/${productId}`);
export const moveToCart = (productId) => api.post(`/wishlist/move-to-cart/${productId}`);
