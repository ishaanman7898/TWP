import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductService } from "@/services/ProductService";
import { Product } from "@/lib/supabase";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { ProductLineSection } from "@/components/ProductLineSection";

export default function AccessoriesPage() {
    const { addToCart } = useCart();
    const [sourceProducts, setSourceProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await ProductService.getAllProducts();
                setSourceProducts(allProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const accessoriesProducts = useMemo(() => {
        return sourceProducts.filter((product) => product.category === "Accessories");
    }, [sourceProducts]);

    const groupedProducts = useMemo(() => {
        const groups: { [key: string]: Product[] } = {};

        accessoriesProducts.forEach(product => {
            const groupName = product.group_name || product.name;
            if (!groups[groupName]) {
                groups[groupName] = [];
            }
            groups[groupName].push(product);
        });

        return Object.values(groups);
    }, [accessoriesProducts]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="container mx-auto px-4 lg:px-8 pt-52 pb-20">
                    <div className="text-center py-12 text-white/70">Loading products...</div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="relative">
                <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
                    {/* Image Background */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-glacier/20 to-background"></div>

                    </div>
                    {/* Darker overlay for text readability */}
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    {/* Content */}
                    <div className="container mx-auto px-4 lg:px-8 text-center relative z-20">
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                            <span className="text-gradient">Accessories</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                            Accessories to complement your healthy routine and maximize performance, style, and convenience.
                        </p>
                    </div>
                    {/* Scroll-down indicator at true hero bottom, outside .container */}
                    <button
                        type="button"
                        aria-label="Scroll down"
                        onClick={() => window.scrollTo({ behavior: 'smooth', top: window.innerHeight })}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-30 hover:opacity-90 focus:outline-none"
                    >
                        <ChevronDown className="w-8 h-8 text-white/80" />
                    </button>
                </section>

                {/* Overview / quick navigation divider */}
                <section className="border-y border-white/10 bg-gradient-to-r from-slate-950/60 via-black to-slate-950/60 py-10">
                    <div className="container mx-auto px-4 lg:px-8 flex flex-col gap-6 items-center">
                        <p className="text-sm uppercase tracking-[0.25em] text-white/50">
                            Explore the accessories
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {groupedProducts.map((group) => {
                                const label = group[0].group_name || group[0].name;
                                const sectionId = label.toLowerCase().replace(/\s+/g, "-");
                                return (
                                    <a
                                        key={label}
                                        href={`#${sectionId}`}
                                        className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm text-white/80 hover:bg-white/15 hover:border-white/40 transition-colors"
                                    >
                                        {label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Product Showcase Sections */}
                <div className="relative">
                    {groupedProducts.map((group, index) => {
                        const sectionId = (group[0].group_name || group[0].name).toLowerCase().replace(/\s+/g, "-");
                        const isLast = index === groupedProducts.length - 1;
                        return (
                            <div key={group[0].id}>
                                <ProductLineSection
                                    variants={group}
                                    index={index}
                                    addToCart={addToCart}
                                    sectionId={sectionId}
                                    lineDescription="Thoughtful add-ons that complete your wellness setup and enhance everyday convenience."
                                />
                                {!isLast && (
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}
