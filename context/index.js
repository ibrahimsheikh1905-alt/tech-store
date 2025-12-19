import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { OrderProvider } from "./OrderContext";

export const AppProvider = ({ children }) => (
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <OrderProvider>{children}</OrderProvider>
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>
);
