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
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <Hero />

      {/* Tagline Section - Navy split layout */}
      <section id="tagline" className="relative bg-navy-medium py-16 md:py-24">
        <div className="absolute inset-0 matrix-dots opacity-20" aria-hidden="true" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-10">
            {/* Left: stacked text */}
            <div className="text-left">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight space-y-2">
                <div>WE CREATE</div>
                <div>INNOVATIVE</div>
                <div>PRODUCTS THAT</div>
                <div>MAKE WELLNESS</div>
                <div><span className="text-glacier">SIMPLE.</span></div>
              </h2>
            </div>
            {/* Right: product card mock */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-gradient-to-br from-navy-medium via-navy-medium/60 to-white/10 p-6 shadow-2xl">
                <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-navy-medium/40 via-ocean/30 to-white/40 flex items-center justify-center overflow-hidden">
                  <img src="/placeholder.svg" alt="Peak Protein" className="w-3/4 h-3/4 object-contain drop-shadow" />
                </div>
                <div className="text-center mt-6">
                  <div className="font-display text-3xl sm:text-4xl font-extrabold text-white">PEAK PROTEIN</div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white/90">CHOCOLATE</div>
                  <div className="mt-6 text-white/70 tracking-wider">WELLNESS THAT WORKS.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Section Divider */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>

        {/* Wavy Scrolling Text */}
        <section className="py-8 md:py-10 overflow-hidden bg-navy-medium relative z-10">
          <div className="flex animate-scroll-right whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div className="flex items-center gap-10 px-6" key={dup} aria-hidden={dup === 1}>
                {[
                  "Elegant","〰️","Beautiful","〰️","Innovative","〰️","Sustainable","〰️","Elegant","〰️",
                  "Beautiful","〰️","Innovative","〰️","Sustainable","〰️","Elegant","〰️"
                ].map((word, i) => (
                  <span
                    key={i}
                    className={
                      word === "〰️"
                        ? "text-2xl md:text-3xl text-glacier/60"
                        : "font-display text-2xl md:text-3xl font-extrabold text-white inline-block animate-wave"
                    }
                    style={{ animationDelay: `${(i % 8) * 120}ms` }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Section Divider */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>

        {/* The Thrive Factor - split layout */}
        <section className="py-16 md:py-24 bg-navy-medium relative overflow-hidden">
          <div className="absolute inset-0 matrix-dots opacity-10" aria-hidden="true" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 items-start gap-12">
              {/* Left: Heading + list */}
              <div>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-3">
                  THE THRIVE <span className="text-glacier">FACTOR</span>
                </h2>
                <p className="font-display text-xl sm:text-2xl font-extrabold text-white/90 tracking-wide mb-10">
                  MADE WITH A CONSCIENCE TO THE WORLD
                </p>

                <div className="divide-y divide-white/20 max-w-xl">
                  {["MATERIALS","SUSTAINABILITY","CUSTOMIZATION","CONVENIENCE"].map((item) => (
                    <div key={item} className="flex items-center justify-between py-4 text-white/90">
                      <span className="font-display text-xl font-bold tracking-wide">{item}</span>
                      <span className="text-2xl font-bold">+</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Product card */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-gradient-to-br from-navy-medium via-navy-medium/60 to-white/10 p-6 shadow-2xl">
                  <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-navy-medium/40 via-ocean/30 to-white/40 flex items-center justify-center overflow-hidden">
                    <img src="/placeholder.svg" alt="Thrive Bottle" className="w-4/5 h-4/5 object-contain drop-shadow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      <Footer />
    </div>
  );
};

export default Index;
