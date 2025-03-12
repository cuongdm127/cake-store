import { Product } from "@/types/Product";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "CLEAR_CART" }
  | { type: "INCREASE_ITEM"; productId: string }
  | { type: "DECREASE_ITEM"; productId: string }
  | { type: "SET_CART"; items: CartItem[] };
const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.product._id
      );
      const updatedItems = [...state.items];

      if (itemIndex > -1) {
        updatedItems[itemIndex].quantity += 1;
      } else {
        updatedItems.push({ ...action.product, quantity: 1 });
      }

      return { items: updatedItems };
    }

    case "INCREASE_ITEM": {
      const updatedItems = state.items.map((item) =>
        item._id === action.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { items: updatedItems };
    }

    case "DECREASE_ITEM": {
      const updatedItems = state.items
        .map((item) =>
          item._id === action.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // remove item if quantity <= 0
      return { items: updatedItems };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item._id !== action.productId
      );
      return { items: updatedItems };
    }

    case "CLEAR_CART": {
      return { items: [] };
    }

    case "SET_CART":
      return { items: action.items };

    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  increaseItem: (productId: string) => void;
  decreaseItem: (productId: string) => void;
} | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  // 1. Load user cart on login
  useEffect(() => {
    const loadUserCart = async () => {
      if (user) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/cart`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          dispatch({ type: "SET_CART", items: res.data.items });
        } catch (error) {
          console.error("Failed to load user cart:", error);
        }
      }
    };

    loadUserCart();
  }, [user]);

  // 2. Save cart to backend when items change (for logged-in user)
  useEffect(() => {
    const saveCart = async () => {
      if (user) {
        console.log(state.items);
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/cart`,
            {
              items: state.items.map((item) => ({
                productId: item._id,
                quantity: item.quantity,
              })),
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
        } catch (error) {
          console.error("Failed to save cart:", error);
        }
      }
    };

    if (state.items.length > 0) {
      saveCart();
    }
  }, [state.items, user]);

  const addItem = (product: Product) => dispatch({ type: "ADD_ITEM", product });
  const removeItem = (productId: string) =>
    dispatch({ type: "REMOVE_ITEM", productId });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const increaseItem = (productId: string) =>
    dispatch({ type: "INCREASE_ITEM", productId });
  const decreaseItem = (productId: string) =>
    dispatch({ type: "DECREASE_ITEM", productId });

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        clearCart,
        increaseItem,
        decreaseItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
