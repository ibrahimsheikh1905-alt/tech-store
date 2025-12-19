"use client";
import { createContext, useContext, useState } from "react";
import api from "../utils/api";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const placeOrder = async (orderData) => {
    try {
      const { data } = await api.post("/orders", orderData);
      return data.order;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyOrders = async () => {
    try {
      const { data } = await api.get("/orders/my-orders");
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, fetchMyOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);