import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, totalPrice, totalItems, checkout, isCheckingOut } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8">
            <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/50 mb-6" />
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
              <Button variant="hero" asChild>
                <Link to="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item, index) => (
                  <div 
                    key={index} 
                    className="glass rounded-xl p-4 md:p-6 flex flex-col sm:flex-row gap-4"
                  >
                    {/* Product Image Placeholder */}
                    <div className="w-full sm:w-24 h-24 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-primary font-bold">${(item.price || 0).toFixed(2)}</p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(index)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors self-end sm:self-auto"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass rounded-xl p-6 sticky top-32">
                  <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    variant="hero" 
                    className="w-full rounded-full"
                    onClick={checkout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Taxes and shipping calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
