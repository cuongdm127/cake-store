import { Product } from "@/data/products";
import { createContext, ReactNode, useContext, useReducer } from "react";

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: number }
  | { type: "CLEAR_CART" }
  | { type: "INCREASE_ITEM"; productId: number }
  | { type: "DECREASE_ITEM"; productId: number };
const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.product.id
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
        item.id === action.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { items: updatedItems };
    }

    case "DECREASE_ITEM": {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // remove item if quantity <= 0
      return { items: updatedItems };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.productId
      );
      return { items: updatedItems };
    }

    case "CLEAR_CART": {
      return { items: [] };
    }

    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  increaseItem: (productId: number) => void;
  decreaseItem: (productId: number) => void;
} | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product) => dispatch({ type: "ADD_ITEM", product });
  const removeItem = (productId: number) =>
    dispatch({ type: "REMOVE_ITEM", productId });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const increaseItem = (productId: number) =>
    dispatch({ type: "INCREASE_ITEM", productId });
  const decreaseItem = (productId: number) =>
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
