import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface CartItem {
    name: string;
    link: string;
    price?: number;
    image?: string;
    quantity?: number; // default 1
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

    // Load cart from localStorage on mount and merge duplicates into quantities
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            const arr: CartItem[] = Array.isArray(saved) ? saved : [];
            // Normalize: convert legacy repeated items into aggregated by link
            const map = new Map<string, CartItem>();
            for (const it of arr) {
                const key = it.link;
                const existing = map.get(key);
                if (existing) {
                    existing.quantity = (existing.quantity || 1) + (it.quantity || 1);
                } else {
                    map.set(key, { ...it, quantity: it.quantity || 1 });
                }
            }
            setCart(Array.from(map.values()));
        } catch {
            setCart([]);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem, quantity: number = 1) => {
        setCart((prev) => {
            const idx = prev.findIndex((p) => p.link === item.link);
            if (idx !== -1) {
                const next = [...prev];
                next[idx] = { ...next[idx], quantity: (next[idx].quantity || 1) + quantity };
                return next;
            }
            return [...prev, { ...item, quantity }];
        });
    };

    const removeFromCart = (index: number) => {
        setCart((prev) => prev.filter((_, i) => i !== index));
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateQuantity = (index: number, quantity: number) => {
        setCart((prev) => {
            const next = [...prev];
            if (quantity <= 0) {
                return next.filter((_, i) => i !== index);
            }
            if (next[index]) next[index] = { ...next[index], quantity };
            return next;
        });
    };

    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

    const checkout = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        const companyCode = cart[0].link.match(/buybuttons\/([a-z0-9]+)\//i)?.[1];
        if (!companyCode) {
            alert("Can't detect company code!");
            return;
        }
        const finalCartUrl = `https://portal.veinternational.org/buybuttons/${companyCode}/cart/`;
        setIsCheckingOut(true);
        const popups: (Window | null)[] = [];
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            const times = Math.max(1, item.quantity || 1);
            for (let k = 0; k < times; k++) {
                const url = `${item.link}?nocache=${Date.now() + i * 100 + k}`;
                const popup = window.open(
                    url,
                    `vei_add_${i}_${k}`,
                    "width=1,height=1,top=-10000,left=-10000,scrollbars=no,resizable=no,menubar=no,toolbar=no,location=no,status=no"
                );
                if (!popup || popup.closed) {
                    setIsCheckingOut(false);
                    window.location.href = "/checkout-manual";
                    return;
                }
                popups.push(popup);
            }
        }
        setTimeout(() => {
            try {
                popups.forEach((p) => { if (p && !p.closed) p.close(); });
            } catch {}
            window.open(finalCartUrl, "_blank");
            setIsCheckingOut(false);
        }, 1500);
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
