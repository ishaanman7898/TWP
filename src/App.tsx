import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { FloatingCart } from "@/components/FloatingCart";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";

import About from "./pages/About";
import Stories from "./pages/Stories";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import CartTest from "./pages/CartTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart-test" element={<CartTest />} />
            <Route path="/about" element={<About />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingCart />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
