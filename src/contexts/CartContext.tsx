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
    clearCart: () => void;
    isCheckingOut: boolean;
    checkout: () => Promise<void>;
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

        alert(
            `Adding ${cart.length} items to your VEI cart...\nTiny windows will flash and auto-close (SUPER FAST)`
        );

        setIsCheckingOut(true);
        let addedCount = 0;

        // Process each item one by one with TINY popup
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            const url = `${item.link}?nocache=${Date.now() + i}`;

            // Completely invisible popup - pushed way off screen
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

            // Auto-close when VEI finishes adding (detects success page)
            const checkInterval = setInterval(() => {
                try {
                    if (
                        popup.closed ||
                        popup.location.href.includes("success") ||
                        popup.location.href.includes("/cart") ||
                        popup.document?.body?.innerText?.toLowerCase().includes("added")
                    ) {
                        clearInterval(checkInterval);
                        popup.close();
                        addedCount++;

                        // When ALL items are done → open final cart in new tab
                        if (addedCount === cart.length) {
                            setTimeout(() => {
                                window.open(finalCartUrl, "_blank");
                            }, 200);
                        }
                    }
                } catch (e) {
                    // Cross-origin = normal, just keep waiting
                }
            }, 100); // Check every 0.1 sec (SUPER FAST)

            // Fallback: force close after 3 sec max
            setTimeout(() => {
                if (!popup.closed) popup.close();
            }, 3000);
        }

        // Clear your local cart
        setCart([]);
        localStorage.removeItem(STORAGE_KEY);
        setIsCheckingOut(false);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, isCheckingOut, checkout }}
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
