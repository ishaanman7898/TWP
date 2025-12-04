import { useState } from "react";
import { ShoppingCart, Trash2, Check, X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

export function FloatingCart() {
    const { cart, removeFromCart, clearCart, checkout, isCheckingOut } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    return (
        <>
            {/* Checkout Loading Overlay */}
            {isCheckingOut && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90">
                    <div className="text-center max-w-md px-6">
                        <div className="mb-6 inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
                        <h2 className="font-display text-2xl font-bold mb-2">Building Your Wellness Cart</h2>
                        <p className="text-muted-foreground mb-4">
                            We're adding each item to your official VEI cart. This only takes a few seconds — keep this tab open.
                        </p>
                        <p className="text-xs text-muted-foreground">No need to click anything. We'll open your cart automatically when it's ready.</p>
                    </div>
                </div>
            )}

            {/* Floating Cart Button */}
            <div className="fixed bottom-6 right-6 z-[60]">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all",
                        isOpen && "rounded-b-none"
                    )}
                >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="font-medium">{cart.length}</span>
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                            {cart.length}
                        </span>
                    )}
                </button>

                {/* Cart Dropdown */}
                {isOpen && (
                    <div className="absolute bottom-full right-0 mb-0 w-[380px] bg-card border border-border rounded-t-2xl shadow-xl">
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <h3 className="font-display text-lg font-bold">Your Cart</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {cart.length === 0 ? (
                            <div className="p-8 text-center">
                                <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                                <p className="text-muted-foreground">Your cart is empty</p>
                            </div>
                        ) : (
                            <>
                                <div className="max-h-[400px] overflow-auto p-4 space-y-3">
                                    {cart.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-muted/20 rounded-lg p-3">
                                            {item.image && (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-12 h-12 object-contain rounded"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                                                {item.price && (
                                                    <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}</p>
                                                )}
                                            </div>
                                            <button
                                                className="text-muted-foreground hover:text-destructive"
                                                onClick={() => removeFromCart(i)}
                                                aria-label="Remove"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 border-t border-border space-y-3">
                                    {totalPrice > 0 && (
                                        <div className="flex items-center justify-between text-lg font-bold">
                                            <span>Total:</span>
                                            <span>${totalPrice.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={clearCart} className="flex-1">
                                            Clear
                                        </Button>
                                        <Button onClick={checkout} className="flex-1 rounded-full">
                                            <Check className="w-4 h-4 mr-2" />
                                            Checkout
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
