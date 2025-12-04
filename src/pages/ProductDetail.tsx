import { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { products, Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Minus, Plus } from "lucide-react";

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const variants = useMemo(() => {
    const group = products.filter(p => slugify(p.groupName) === slug);
    return group;
  }, [slug]);

  const [selected, setSelected] = useState<Product | null>(variants[0] || null);

  useEffect(() => {
    setSelected(variants[0] || null);
  }, [variants]);

  if (!variants || variants.length === 0 || !selected) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-28 pb-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-display text-3xl font-bold mb-2">Product not found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const category = selected.category;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Wellness":
        return "bg-emerald-500/10 text-emerald-700";
      case "Water Bottles":
        return "bg-sky-500/10 text-sky-600";
      case "Bundles":
        return "bg-orange-500/10 text-orange-600";
      case "Accessories":
        return "bg-purple-500/10 text-purple-600";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case "Wellness":
        return "bg-emerald-500/5";
      case "Water Bottles":
        return "bg-sky-500/5";
      case "Bundles":
        return "bg-orange-500/5";
      case "Accessories":
        return "bg-purple-500/5";
      default:
        return "bg-primary/5";
    }
  };

  const handleAddToCart = () => {
    addToCart(
      {
        name: selected.name,
        link: selected.buyLink,
        price: selected.price,
        image: selected.image,
      },
      quantity
    );
    // Reset quantity after adding
    setQuantity(1);
  };

  // Group-level description placeholder. Replace with real copy later if desired.
  const groupDescription = `Discover ${selected.groupName} — premium quality designed to elevate your routine. Choose your ${category === "Wellness" ? "flavor" : "color"} and enjoy exceptional performance.`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <div className="text-sm text-muted-foreground mb-6">
            <Link to="/shop" className="hover:underline">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{selected.groupName}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Gallery */}
            <div className={cn("relative rounded-2xl border border-border p-6", getCategoryBg(category))}>
              {selected.image ? (
                <img src={selected.image} alt={selected.name} className="w-full h-[420px] object-contain" />
              ) : (
                <div className="h-[420px] flex items-center justify-center text-7xl font-display text-foreground/10">
                  {selected.groupName.charAt(0)}
                </div>
              )}
              <span className={cn("absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-medium", getCategoryColor(category))}>
                {category}
              </span>
            </div>

            {/* Info */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {selected.groupName}
              </h1>
              <p className="text-muted-foreground mb-6">{groupDescription}</p>

              <div className="flex items-center gap-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {category === "Wellness" ? "Flavor" : "Color"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map(v => (
                      <button
                        key={v.id}
                        onClick={() => setSelected(v)}
                        className={cn(
                          "w-8 h-8 rounded-full border border-border transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50",
                          selected.id === v.id && "ring-2 ring-primary scale-110",
                          v.hexColor === "#FFFFFF" && "bg-white"
                        )}
                        style={{ backgroundColor: v.hexColor }}
                        title={v.color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-muted-foreground">SKU: {selected.sku}</p>
                  {selected.color && (
                    <p className="text-xs text-muted-foreground">
                      {category === "Wellness" ? "Flavor" : "Color"}: <span className="font-medium text-foreground">{selected.color}</span>
                    </p>
                  )}
                </div>
                <span className="text-3xl font-display font-bold text-foreground">${selected.price.toFixed(2)}</span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 p-0 rounded-full"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="w-20 text-center font-medium text-lg">
                    {quantity}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    className="h-10 w-10 p-0 rounded-full"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button onClick={handleAddToCart} className="rounded-full">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add {quantity > 1 ? `${quantity}x ` : ''}to Cart
                </Button>
                <Button asChild variant="secondary" className="rounded-full">
                  <a href={selected.buyLink} target="_blank" rel="noopener noreferrer">Buy Now Direct</a>
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
