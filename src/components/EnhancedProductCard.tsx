import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  category: string;
  group_name?: string;
  hex_color?: string;
  variant_order?: number;
  buy_link?: string;
}

interface EnhancedProductCardProps {
  variants: Product[];
  index: number;
}

const normalizeProduct = (product: Product) => ({
  ...product,
  buyLink: product.buy_link || '',
  image: product.image_url || '',
  groupName: product.group_name || product.name,
  hexColor: product.hex_color || null,
  variantOrder: product.variant_order || null
});

const slugify = (text: string) => 
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

export function EnhancedProductCard({ variants, index }: EnhancedProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedVariant(variants[0]);
    setImageLoaded(false);
    setImageError(false);
  }, [variants]);

  const product = normalizeProduct(selectedVariant);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoaded(false);
    setImageError(true);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        name: product.name,
        link: product.buyLink,
        price: product.price,
        image: product.image,
      });
    }
    setQuantity(1);
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "Wellness":
        return "from-purple-500/20 to-blue-500/20";
      case "Water Bottles":
        return "from-blue-400/20 to-cyan-400/20";
      case "Bundles":
        return "from-pink-400/20 to-rose-400/20";
      case "Accessories":
        return "from-slate-600/20 to-slate-800/20";
      default:
        return "from-gray-400/20 to-gray-600/20";
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-2xl overflow-hidden transition-all duration-500 h-[550px]",
        "shadow-xl hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2",
        "animate-fade-in-up border border-border/50 bg-white"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image Container */}
      <div className="absolute inset-0">
        <Link 
          to={`/product/${slugify(product.groupName)}`} 
          className="absolute inset-0 z-10" 
          aria-label={`View ${product.groupName}`} 
        />
        
        {/* Main Product Image */}
        {product.image && !imageError ? (
          <div className="relative w-full h-full">
            <img
              src={product.image.replace(/^public\//, '/')}
              alt={product.name}
              loading="lazy"
              className={cn(
                "w-full h-full object-cover transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse" />
              </div>
            )}
          </div>
        ) : (
          /* Fallback when no image or error */
          <div className={cn(
            "w-full h-full flex items-center justify-center",
            "bg-gradient-to-br", getCategoryGradient(product.category)
          )}>
            <div className="text-center">
              <div className="text-8xl font-display font-bold text-gray-400 mb-4">
                {product.groupName.charAt(0)}
              </div>
              <div className="text-sm text-gray-500 font-medium">
                {product.category}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md bg-white/90",
          product.category === "Wellness" ? "text-purple-500" :
          product.category === "Water Bottles" ? "text-blue-500" :
          product.category === "Bundles" ? "text-pink-500" :
          "text-slate-600"
        )}>
          {product.category}
        </span>
      </div>

      {/* Product Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col z-20 text-white">
        {/* Variant Swatches */}
        {variants.length > 1 && (
          <div className="flex gap-2 items-center mb-3 -mx-6 px-6">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedVariant(variant);
                }}
                className={cn(
                  "w-6 h-6 rounded-full border-2 focus:outline-none shadow-sm flex-none",
                  "relative flex items-center justify-center transition-all duration-200",
                  selectedVariant.id === variant.id 
                    ? "border-white scale-110" 
                    : "border-white/30 hover:border-white/60"
                )}
                style={{
                  backgroundColor: variant.hex_color || '#f3f4f6',
                }}
              >
                {selectedVariant.id === variant.id && (
                  <svg 
                    className="w-3 h-3 text-white drop-shadow-lg" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Product Name */}
        <h3 className="font-display text-2xl font-bold mb-2 line-clamp-2 tracking-wide leading-tight">
          <Link 
            to={`/product/${slugify(product.groupName)}`} 
            className="hover:underline drop-shadow-md"
          >
            {product.groupName}
          </Link>
        </h3>

        {/* Price and Actions */}
        <div className="mt-2 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-display font-bold drop-shadow-md">
              ${product.price.toFixed(2)}
            </span>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-2 py-1 border border-white/20">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 hover:scale-110 flex items-center justify-center text-sm font-bold transition-all duration-200"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(99, quantity + 1))}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 hover:scale-110 flex items-center justify-center text-sm font-bold transition-all duration-200"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <Button
            variant="default"
            size="lg"
            className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}