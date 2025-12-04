import { useState } from "react";
import { ShoppingCart, Trash2, Check, X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export function FloatingCart() {
    const { cart, removeFromCart, clearCart, checkout, isCheckingOut } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Hide cart on home page
    const shouldShowCart = location.pathname !== '/';

    const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    // Don't render if we're on home page
    if (!shouldShowCart) {
        return null;
    }

    return (
        <>
            {/* Checkout Loading Overlay */}
            {isCheckingOut && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md">
                    <div className="relative max-w-lg w-full mx-4">
                        {/* Matrix Dots */}
                        <div className="absolute inset-0 matrix-dots opacity-10 rounded-3xl"></div>

                        {/* Main Card */}
                        <div className="relative glass border border-primary/20 rounded-3xl p-8 md:p-12 shadow-2xl">
                            {/* Animated Spinner */}
                            <div className="relative mb-8 flex justify-center">
                                <div className="relative">
                                    {/* Outer ring */}
                                    <div className="absolute inset-0 h-24 w-24 animate-spin rounded-full border-4 border-glacier/20 border-t-glacier"></div>
                                    {/* Inner glow */}
                                    <div className="absolute inset-2 h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-glacier/20 blur-xl animate-pulse"></div>
                                    {/* Center icon */}
                                    <div className="relative h-24 w-24 flex items-center justify-center">
                                        <ShoppingCart className="w-10 h-10 text-glacier" />
                                    </div>
                                </div>
                            </div>

                            {/* Header */}
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-foreground to-glacier bg-clip-text text-transparent">
                                Processing Your Order
                            </h2>

                            {/* Description */}
                            <div className="space-y-3 mb-6 text-center">
                                <p className="text-muted-foreground text-lg">
                                    We're securely adding your items to the official VEI cart
                                </p>
                                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/80">
                                    <div className="w-2 h-2 rounded-full bg-glacier animate-pulse"></div>
                                    <span>Processing {cart.length} item{cart.length !== 1 ? 's' : ''}</span>
                                </div>
                            </div>

                            {/* Progress Steps */}
                            <div className="space-y-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-glacier flex items-center justify-center">
                                        <Check className="w-4 h-4 text-background" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Verifying Items</p>
                                        <p className="text-sm text-muted-foreground">Confirming product availability</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-glacier flex items-center justify-center animate-pulse">
                                        <div className="w-2 h-2 rounded-full bg-glacier"></div>
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Building Cart</p>
                                        <p className="text-sm text-muted-foreground">Adding items to VEI portal</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 opacity-50">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-muted-foreground/30"></div>
                                    <div>
                                        <p className="font-medium text-foreground">Ready to Checkout</p>
                                        <p className="text-sm text-muted-foreground">Opening secure checkout</p>
                                    </div>
                                </div>
                            </div>

                            {/* Important Notice */}
                            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                                <p className="text-sm text-center text-muted-foreground leading-relaxed">
                                    <span className="font-semibold text-foreground">Please keep this tab open.</span><br />
                                    Your cart will open automatically when ready.
                                </p>
                            </div>

                            {/* Subtle animation bars */}
                            <div className="mt-6 flex gap-2 justify-center">
                                <div className="w-2 h-2 rounded-full bg-glacier animate-pulse"></div>
                                <div className="w-2 h-2 rounded-full bg-glacier/70 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 rounded-full bg-glacier/40 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Cart Button */}
            <div className="fixed bottom-6 right-6 z-[60]">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-3 sm:px-4 sm:py-3 rounded-full shadow-lg flex items-center gap-2 sm:gap-3 transition-all"
                >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="font-medium text-sm sm:text-base">{cart.length}</span>
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-bold">
                            {cart.length}
                        </span>
                    )}
                </button>

                {/* Cart Slide-in Panel */}
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[55]"
                            onClick={() => setIsOpen(false)}
                        ></div>

                        {/* Cart Panel */}
                        <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-card border-l border-border shadow-2xl z-[65] animate-slide-in-right flex flex-col">
                            {/* Header */}
                            <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between flex-shrink-0">
                                <h3 className="font-display text-xl sm:text-2xl font-bold">Your Cart</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {cart.length === 0 ? (
                                <div className="flex-1 flex items-center justify-center p-8">
                                    <div className="text-center">
                                        <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                                        <p className="text-lg text-muted-foreground">Your cart is empty</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Cart Items */}
                                    <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-4">
                                        {cart.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 sm:gap-4 bg-muted/20 rounded-xl p-3 sm:p-4">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-background"
                                                    />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm sm:text-base line-clamp-2">{item.name}</p>
                                                    {item.price && (
                                                        <p className="text-sm sm:text-base text-glacier font-bold mt-1">${item.price.toFixed(2)}</p>
                                                    )}
                                                </div>
                                                <button
                                                    className="text-muted-foreground hover:text-destructive transition-colors p-2"
                                                    onClick={() => removeFromCart(i)}
                                                    aria-label="Remove"
                                                >
                                                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="p-4 sm:p-6 border-t border-border space-y-4 flex-shrink-0 bg-card">
                                        {totalPrice > 0 && (
                                            <div className="flex items-center justify-between text-xl sm:text-2xl font-bold">
                                                <span>Total:</span>
                                                <span className="text-glacier">${totalPrice.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex gap-3">
                                            <Button variant="outline" size="default" onClick={clearCart} className="flex-1">
                                                Clear
                                            </Button>
                                            <Button onClick={checkout} className="flex-1 rounded-full" size="default">
                                                <Check className="w-4 h-4 mr-2" />
                                                Checkout
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
