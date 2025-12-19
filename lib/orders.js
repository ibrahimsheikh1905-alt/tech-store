import api from "./api";

export const placeOrder = (orderData) => api.post("/orders", orderData);
export const getMyOrders = () => api.get("/orders/my");
export const cancelOrder = (orderId) => api.put(`/orders/cancel/${orderId}`);
