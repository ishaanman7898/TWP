import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { products, Product } from "@/data/products";
import { useProductsCsv } from "@/hooks/useProductsCsv";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

export default function WaterBottlesPage() {
    const { addToCart } = useCart();
    const { products: csvProducts } = useProductsCsv();
    const sourceProducts = csvProducts.length ? csvProducts : products;

    const waterBottleProducts = useMemo(() => {
        return sourceProducts.filter((product) => product.category === "Water Bottles");
    }, [sourceProducts]);

    // Group products by groupName
    const groupedProducts = useMemo(() => {
        const groups: { [key: string]: Product[] } = {};

        waterBottleProducts.forEach(product => {
            if (!groups[product.groupName]) {
                groups[product.groupName] = [];
            }
            groups[product.groupName].push(product);
        });

        return Object.values(groups);
    }, [waterBottleProducts]);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Hero Section - Apple Style */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-black to-black z-0"></div>
                <div className="absolute inset-0 matrix-dots opacity-5" aria-hidden="true"></div>

                <div className="relative z-10 text-center px-4">
                    <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 tracking-tight">
                        Water Bottles
                    </h1>
                    <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-light mb-8">
                        Engineered for performance. Designed for life.
                    </p>
                </div>

                {/* Scroll Indicator at Bottom */}
                <button
                    type="button"
                    aria-label="Scroll down"
                    onClick={() => window.scrollTo({ behavior: 'smooth', top: window.innerHeight })}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-30 hover:opacity-90 focus:outline-none"
                >
                    <ChevronDown className="w-8 h-8 text-white/60" />
                </button>
            </section>

            {/* Product Showcase Sections */}
            <div className="relative">
                {groupedProducts.map((group, index) => (
                    <AppleProductSection
                        key={group[0].groupName}
                        products={group}
                        index={index}
                        addToCart={addToCart}
                    />
                ))}
            </div>

            <Footer />
        </div>
    );
}

function AppleProductSection({ products: variants, index, addToCart }: { products: Product[]; index: number; addToCart: any }) {
    const [selectedVariant, setSelectedVariant] = useState(variants[0]);
    const [quantity, setQuantity] = useState(1);
    const isEven = index % 2 === 0;

    useEffect(() => {
        setSelectedVariant(variants[0]);
    }, [variants]);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart({
                name: selectedVariant.name,
                link: selectedVariant.buyLink,
                price: selectedVariant.price,
                image: selectedVariant.image,
            });
        }
        setQuantity(1);
    };

    return (
        <section className={cn(
            "relative min-h-screen flex items-center justify-center overflow-hidden py-20",
            isEven ? "bg-black" : "bg-slate-950"
        )}>
            <div className="absolute inset-0 matrix-dots opacity-3" aria-hidden="true"></div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className={cn(
                    "grid lg:grid-cols-2 gap-12 items-center",
                    isEven ? "" : "lg:grid-flow-dense"
                )}>
                    {/* Product Image */}
                    <div className={cn(
                        "flex items-center justify-center min-h-[500px]",
                        !isEven && "lg:col-start-2"
                    )}>
                        <div className="relative w-full max-w-md">
                            <img
                                key={selectedVariant.image}
                                src={selectedVariant.image?.replace(/^public\//, '/')}
                                alt={selectedVariant.name}
                                loading="lazy"
                                className="w-full h-auto object-contain drop-shadow-2xl"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className={cn(
                        "flex flex-col justify-center",
                        !isEven && "lg:col-start-1"
                    )}>
                        <div className="space-y-6">
                            <div>
                                <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                                    {selectedVariant.groupName}
                                </h2>
                                <p className="text-lg text-white/70 font-light leading-relaxed max-w-lg">
                                    Premium insulated water bottle engineered with advanced thermal technology. Keep your drinks at the perfect temperature for hours.
                                </p>
                            </div>

                            {/* Price */}
                            <div className="text-4xl font-bold">
                                ${selectedVariant.price.toFixed(2)}
                            </div>

                            {/* Color Variants */}
                            {variants.length > 1 && (
                                <div className="space-y-3">
                                    <p className="text-sm text-white/60 uppercase tracking-widest font-medium">
                                        Available Colors
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {variants.map((variant) => (
                                            <button
                                                key={variant.id}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={cn(
                                                    "w-10 h-10 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white",
                                                    selectedVariant.id === variant.id
                                                        ? "border-white scale-110"
                                                        : "border-white/30 hover:border-white/60",
                                                    variant.hexColor === "#FFFFFF" && "bg-white border-white"
                                                )}
                                                style={{
                                                    backgroundColor: variant.hexColor !== "#FFFFFF" ? variant.hexColor : undefined
                                                }}
                                                title={variant.color}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity and Add to Cart */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20 w-fit">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-lg font-bold transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <span className="w-8 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(99, quantity + 1))}
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-lg font-bold transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>

                                <Button
                                    size="lg"
                                    className="bg-white text-black hover:bg-white/90 font-bold text-lg rounded-full px-8 h-12 transition-all duration-300"
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Buy
                                </Button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                                <div>
                                    <p className="text-xs text-white/60 uppercase tracking-widest mb-1">Capacity</p>
                                    <p className="text-lg font-semibold">
                                        {selectedVariant.groupName.includes("Glacier") ? "40 oz" : "32 oz"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/60 uppercase tracking-widest mb-1">Material</p>
                                    <p className="text-lg font-semibold">Stainless Steel</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/60 uppercase tracking-widest mb-1">Insulation</p>
                                    <p className="text-lg font-semibold">Double-Wall</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/60 uppercase tracking-widest mb-1">Warranty</p>
                                    <p className="text-lg font-semibold">Lifetime</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
