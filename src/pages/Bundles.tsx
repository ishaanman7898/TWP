import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { products, Product } from "@/data/products";
import { ShoppingCart, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

export default function BundlesPage() {
    const { addToCart } = useCart();

    const bundlesProducts = useMemo(() => {
        return products.filter((product) => product.category === "Bundles");
    }, []);

    const groupedProducts = useMemo(() => {
        const groups: { [key: string]: Product[] } = {};
        bundlesProducts.forEach(product => {
            if (!groups[product.groupName]) {
                groups[product.groupName] = [];
            }
            groups[product.groupName].push(product);
        });
        return Object.values(groups);
    }, [bundlesProducts]);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 bg-gradient-to-b from-primary/10 to-background relative overflow-hidden">
                <div className="absolute inset-0 matrix-dots opacity-20"></div>
                <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                        <span className="text-gradient">Bundles</span>
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Curated wellness bundles designed to save you money while maximizing your health journey.
                    </p>
                </div>
            </section>
            <section className="py-12 relative">
                <div className="absolute inset-0 matrix-dots opacity-10"></div>
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <p className="text-sm text-muted-foreground mb-6">
                        Showing {groupedProducts.length} bundle packages
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {groupedProducts.map((group, index) => (
                            <BundleCard key={group[0].id} variants={group} index={index} addToCart={addToCart} />
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

function BundleCard({ variants, index, addToCart }: { variants: Product[]; index: number; addToCart: any }) {
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
                "bg-card border-2 border-primary/30 hover:border-primary",
                "hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2",
                "animate-fade-in-up"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Package className="w-3 h-3" />
                BUNDLE
            </div>

            <div className="relative h-44 sm:h-56 flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-primary/10 to-glacier/10">
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
            </div>

            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <p className="text-xs text-muted-foreground mb-1">SKU: {product.sku}</p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-3 line-clamp-2">
                    <Link to={`/product/${slugify(product.groupName)}`} className="hover:underline">
                        {product.groupName}
                    </Link>
                </h3>

                <div className="mt-auto space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-display font-bold text-primary">
                                ${product.price.toFixed(2)}
                            </span>
                            <span className="text-xs sm:text-sm text-muted-foreground line-through">
                                Save Big!
                            </span>
                        </div>
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
                        Add Bundle to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}
