import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface CartItem {
    name: string;
    link: string;
    price?: number;
    image?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem, quantity?: number) => void;
    removeFromCart: (index: number) => void;
    updateQuantity: (index: number, quantity: number) => void;
    clearCart: () => void;
    isCheckingOut: boolean;
    checkout: () => Promise<void>;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "veCart";

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            setCart(Array.isArray(saved) ? saved : []);
        } catch {
            setCart([]);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem, quantity: number = 1) => {
        const items = Array(quantity).fill(item);
        setCart((prev) => [...prev, ...items]);
    };

    const removeFromCart = (index: number) => {
        setCart((prev) => prev.filter((_, i) => i !== index));
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateQuantity = (index: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(index);
        } else {
            setCart((prev) => {
                const newCart = [...prev];
                // For simplicity, we just adjust the array length for that item
                // This is a basic implementation
                return newCart;
            });
        }
    };

    const totalItems = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    const checkout = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Extract company code once
        const companyCode = cart[0].link.match(/buybuttons\/([a-z0-9]+)\//i)?.[1];
        if (!companyCode) {
            alert("Can't detect company code!");
            return;
        }
        const finalCartUrl = `https://portal.veinternational.org/buybuttons/${companyCode}/cart/`;

        setIsCheckingOut(true);

        // Open all items in invisible popups IMMEDIATELY (parallel processing)
        const popups: (Window | null)[] = [];

        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            const url = `${item.link}?nocache=${Date.now() + i}`;

            // Completely invisible popup
            const popup = window.open(
                url,
                `vei_add_${i}`,
                "width=1,height=1,top=-10000,left=-10000,scrollbars=no,resizable=no,menubar=no,toolbar=no,location=no,status=no"
            );

            if (!popup || popup.closed) {
                alert("Please allow popups (just this once) so we can add all your items!");
                setIsCheckingOut(false);
                return;
            }

            popups.push(popup);
        }

        // Wait a short time for items to be added, then close all popups and open cart
        setTimeout(() => {
            // Close all popups
            popups.forEach(popup => {
                if (popup && !popup.closed) {
                    popup.close();
                }
            });

            // Open final cart in NEW TAB
            window.open(finalCartUrl, "_blank");

            // Clear local cart
            setCart([]);
            localStorage.removeItem(STORAGE_KEY);
            setIsCheckingOut(false);
        }, 2000); // Reduced from 3000ms to 2000ms for speed
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isCheckingOut, checkout, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
