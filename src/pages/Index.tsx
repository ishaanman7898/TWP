import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";

interface Product {
  category: string;
  name: string;
  price: string;
  image?: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Parse CSV data
    fetch('/products.csv')
      .then(res => res.text())
      .then(csv => {
        const lines = csv.split('\n').slice(1); // Skip header
        const parsed = lines
          .filter(line => line.trim() && line.includes('In Store'))
          .slice(0, 12) // Get first 12 products
          .map(line => {
            const parts = line.split(',');
            return {
              category: parts[0]?.trim() || '',
              name: parts[1]?.trim() || '',
              price: parts[5]?.trim() || '',
              image: '/placeholder.svg' // Using placeholder for now
            };
          });
        setProducts(parsed);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Matrix Dots Background for entire page */}
      <div className="relative">
        <div className="absolute inset-0 matrix-dots opacity-30"></div>

        {/* Tagline Section */}
        <section className="py-12 md:py-16 bg-background relative z-10">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-foreground max-w-4xl mx-auto leading-tight">
              We create Innovative products that make wellness simple.
            </h2>
          </div>
        </section>

        {/* Section Divider */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>

        {/* Single Scrolling Text Animation */}
        <section className="py-8 overflow-hidden bg-card border-y border-border relative z-10">
          <div className="flex animate-scroll-left whitespace-nowrap">
            <div className="flex items-center gap-8 px-4">
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Elegant</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Beautiful</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Innovative</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Sustainable</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Simple</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Elegant</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Beautiful</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Innovative</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Sustainable</span>
              <span className="text-2xl md:text-3xl">〰️</span>
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex items-center gap-8 px-4" aria-hidden="true">
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Elegant</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Beautiful</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Innovative</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Sustainable</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Simple</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Elegant</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Beautiful</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Innovative</span>
              <span className="text-2xl md:text-3xl">〰️</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Sustainable</span>
              <span className="text-2xl md:text-3xl">〰️</span>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>

        {/* The Thrive Factor - Product Carousel Section */}
        <section className="py-12 md:py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                The <span className="text-gradient">Thrive</span> Factor
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Made with a conscience to the world
              </p>
            </div>

            {/* Auto-scrolling Product Carousel */}
            <div className="mb-16 overflow-hidden">
              <div className="flex animate-scroll-left whitespace-nowrap py-8">
                {/* First set of products */}
                {products.map((product, i) => (
                  <div key={i} className="inline-block mx-4 w-80 flex-shrink-0">
                    <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1">
                      <div className="aspect-square bg-muted rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2 whitespace-normal">
                        {product.name}
                      </h3>
                      <p className="text-glacier font-bold text-2xl mb-3">{product.price}</p>
                      <div className="space-y-2 whitespace-normal">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-glacier"></div>
                          <span className="text-sm text-muted-foreground">Premium Materials</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-glacier"></div>
                          <span className="text-sm text-muted-foreground">Sustainable Production</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-glacier"></div>
                          <span className="text-sm text-muted-foreground">Customizable Options</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-glacier"></div>
                          <span className="text-sm text-muted-foreground">Ultimate Convenience</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {products.map((product, i) => (
                  <div key={`dup-${i}`} className="inline-block mx-4 w-80 flex-shrink-0" aria-hidden="true">
                    <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1">
                      <div className="aspect-square bg-muted rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2 whitespace-normal">
                        {product.name}
                      </h3>
                      <p className="text-glacier font-bold text-2xl mb-3">{product.price}</p>
                      <div className="space-y-2 whitespace-normal">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-glacier"></div>
                          <span className="text-sm text-muted-foreground">Premium Materials</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-glacier"></div>
                          <span className="text-sm text-muted-foreground">Sustainable Production</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-glacier"></div>
                          <span className="text-sm text-muted-foreground">Customizable Options</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-glacier"></div>
                          <span className="text-sm text-muted-foreground">Ultimate Convenience</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Divider */}
            <div className="container mx-auto px-4 lg:px-8 py-8">
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            </div>

            {/* Details Section */}
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Materials</h3>
                <p className="text-muted-foreground">Premium quality materials sourced responsibly from trusted suppliers worldwide</p>
              </div>
              <div className="text-center p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Sustainability</h3>
                <p className="text-muted-foreground">Environmentally conscious production process with minimal carbon footprint</p>
              </div>
              <div className="text-center p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Customization</h3>
                <p className="text-muted-foreground">Tailored solutions designed for your unique wellness needs and lifestyle</p>
              </div>
              <div className="text-center p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Convenience</h3>
                <p className="text-muted-foreground">Simple integration into your daily routine with maximum effectiveness</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
