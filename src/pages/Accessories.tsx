import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { products, Product } from "@/data/products";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

export default function AccessoriesPage() {
    const { addToCart } = useCart();

    const accessoriesProducts = useMemo(() => {
        return products.filter((product) => product.category === "Accessories");
    }, []);

    const groupedProducts = useMemo(() => {
        const groups: { [key: string]: Product[] } = {};
        accessoriesProducts.forEach(product => {
            if (!groups[product.groupName]) {
                groups[product.groupName] = [];
            }
            groups[product.groupName].push(product);
        });
        return Object.values(groups);
    }, [accessoriesProducts]);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="relative">
                <div className="absolute inset-0 matrix-dots opacity-10" aria-hidden="true"></div>
            <section className="pt-48 sm:pt-56 pb-16 sm:pb-20 bg-gradient-to-b from-orange-500/10 to-background relative overflow-hidden">
                <div className="absolute inset-0 matrix-dots opacity-20"></div>
                <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
                        <span className="text-gradient">Accessories</span>
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Essential accessories to enhance your wellness experience and daily routine.
                    </p>
                </div>
            </section>
            <section className="py-12 relative">
                <div className="absolute inset-0 matrix-dots opacity-10"></div>
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <p className="text-sm text-muted-foreground mb-6">
                        Showing {groupedProducts.length} accessory products
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {groupedProducts.map((group, index) => (
                            <ProductCard key={group[0].id} variants={group} index={index} addToCart={addToCart} />
                        ))}
                    </div>
                </div>
            </section>
            </div>
            <Footer />
        </div>
    );
}

function ProductCard({ variants, index, addToCart }: { variants: Product[]; index: number; addToCart: any }) {
    const [selectedVariant, setSelectedVariant] = useState(variants[0]);
    const [quantity, setQuantity] = useState(1);
    const product = selectedVariant;

    const slugify = (text: string) =>
        text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

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

    return (
        <div
            className={cn(
                "group relative rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full",
                "bg-card border border-border hover:border-orange-500/50",
                "hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2",
                "animate-fade-in-up"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="relative h-40 sm:h-48 flex items-center justify-center p-4 sm:p-6 bg-orange-500/5">
                <Link to={`/product/${slugify(product.groupName)}`} className="absolute inset-0" aria-label={`View ${product.groupName}`} />
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-[1]"
                    />
                ) : (
                    <div className="text-4xl sm:text-6xl font-display font-bold text-foreground/10">
                        {product.groupName.charAt(0)}
                    </div>
                )}
                <span className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-600">
                    Accessories
                </span>
            </div>

            <div className="p-3 sm:p-5 flex flex-col flex-grow">
                <p className="text-xs text-muted-foreground mb-1">SKU: {product.sku}</p>
                <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-2 line-clamp-2 tracking-[0.02em]">
                    <Link to={`/product/${slugify(product.groupName)}`} className="hover:underline">
                        {product.groupName}
                    </Link>
                </h3>

                {variants.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4 min-h-[28px] sm:min-h-[32px] items-center">
                        {variants.map((variant) => (
                            <button
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant)}
                                className={cn(
                                    "w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-border transition-all hover:scale-110",
                                    selectedVariant.id === variant.id && "ring-2 ring-orange-500 scale-110"
                                )}
                                style={{ backgroundColor: variant.hexColor }}
                                title={variant.color}
                            />
                        ))}
                    </div>
                )}

                {product.color && (
                    <p className="text-xs text-muted-foreground mb-3">
                        Color: <span className="font-medium text-foreground">{product.color}</span>
                    </p>
                )}

                <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-lg sm:text-xl md:text-2xl leading-none font-display font-bold text-foreground">
                            ${product.price.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-background hover:bg-foreground/10 flex items-center justify-center text-sm font-bold"
                            >
                                −
                            </button>
                            <span className="w-6 sm:w-8 text-center font-medium text-sm">{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(99, quantity + 1))}
                                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-background hover:bg-foreground/10 flex items-center justify-center text-sm font-bold"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <Button
                        variant="default"
                        size="sm"
                        className="w-full rounded-full text-sm sm:text-base"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}
