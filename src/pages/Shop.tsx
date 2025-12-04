import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products, categories, Product } from "@/data/products";
import { Search, ShoppingBag, ArrowUpDown, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");

  // Update selected category when URL param changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("All");
    }
  }, [categoryParam]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.groupName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.groupName.localeCompare(b.groupName);
        case "name-desc":
          return b.groupName.localeCompare(a.groupName);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Group products by groupName
  const groupedProducts = useMemo(() => {
    const groups: { [key: string]: Product[] } = {};

    filteredAndSortedProducts.forEach(product => {
      if (!groups[product.groupName]) {
        groups[product.groupName] = [];
      }
      groups[product.groupName].push(product);
    });

    return Object.values(groups);
  }, [filteredAndSortedProducts]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Shop <span className="text-gradient">Thrive</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium wellness products designed for those who demand more from life.
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low-High)</SelectItem>
                <SelectItem value="price-desc">Price (High-Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {groupedProducts.length} products
          </p>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groupedProducts.map((group, index) => (
              <ProductCard key={group[0].id} variants={group} index={index} />
            ))}
          </div>

          {/* Empty State */}
          {groupedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ProductCard({ variants, index }: { variants: Product[]; index: number }) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const { addToCart } = useCart();

  // Update selected variant if variants prop changes (e.g. filtering)
  useEffect(() => {
    setSelectedVariant(variants[0]);
  }, [variants]);

  const product = selectedVariant;

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

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      link: product.buyLink,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full",
        "bg-card border border-border hover:border-primary/30",
        "hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Product Image */}
      <div className={cn("relative h-48 flex items-center justify-center p-6", getCategoryBg(product.category))}>
        <Link to={`/product/${slugify(product.groupName)}`} className="absolute inset-0" aria-label={`View ${product.groupName}`} />
        {product.image ? (
          <img
            key={product.image}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-[1]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}

        {/* Fallback Placeholder (hidden if image loads) */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          product.image ? "hidden" : ""
        )}>
          <div className="text-6xl font-display font-bold text-foreground/10">
            {product.groupName.charAt(0)}
          </div>
        </div>

        <span className={cn(
          "absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium",
          getCategoryColor(product.category)
        )}>
          {product.category}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs text-muted-foreground mb-1">SKU: {product.sku}</p>
        <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-2">
          <Link to={`/product/${slugify(product.groupName)}`} className="hover:underline">
            {product.groupName}
          </Link>
        </h3>

        {/* Variant Swatches (aligned height) */}
        {variants.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-4 min-h-[32px] items-center">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={cn(
                  "w-6 h-6 rounded-full border border-border transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50",
                  selectedVariant.id === variant.id && "ring-2 ring-primary scale-110",
                  variant.hexColor === "#FFFFFF" && "bg-white", // Ensure white is visible
                )}
                style={{ backgroundColor: variant.hexColor }}
                title={variant.color}
              />
            ))}
          </div>
        )}

        {/* Selected Variant Label */}
        {product.color && (
          <p className="text-xs text-muted-foreground mb-3">
            {product.category === "Wellness" ? "Flavor" : "Color"}: <span className="font-medium text-foreground">{product.color}</span>
          </p>
        )}

        <div className="flex items-center justify-between mt-auto gap-2">
          <span className="text-[22px] leading-none font-display font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-8 w-8 p-0"
              onClick={handleAddToCart}
              title="Add to Cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
            <Button
              variant="default"
              size="sm"
              className="rounded-full"
              asChild
            >
              <a href={product.buyLink} target="_blank" rel="noopener noreferrer">
                <ShoppingBag className="w-4 h-4 mr-1" />
                Buy
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
