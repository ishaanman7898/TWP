import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import WaveMarquee from "@/components/WaveMarquee";
import { ChevronDown } from "lucide-react";
import { HeroProductSlideshow } from "@/components/HeroProductSlideshow";
import { FlippingText } from "@/components/FlippingText";

const Index = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const thriveFactors = [
    {
      title: "Premium Materials",
      content: "Crafted with the finest materials for durability and performance"
    },
    {
      title: "Sustainability",
      content: "Eco-friendly practices in every step of our production"
    },
    {
      title: "Customization",
      content: "Personalize your wellness journey with our flexible options"
    },
    {
      title: "Convenience",
      content: "Everything you need for wellness in one place"
    },
  ];

  const toggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <Hero />

      {/* Tagline Section - Navy split layout */}
      <section id="tagline" className="relative bg-[#020410] py-12 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-10">
            {/* Left: stacked text */}
            <div className="text-left lg:text-left text-center">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight space-y-2">
                <div className="hidden lg:block">We Create</div>
                <div className="hidden lg:block">Innovative</div>
                <div className="hidden lg:block">Products That</div>
                <div className="hidden lg:block">Make Wellness</div>
                {/* Mobile: Simplified text */}
                <div className="lg:hidden text-6xl sm:text-7xl mb-4">THRIVE</div>
                <div className="lg:hidden text-2xl sm:text-3xl text-white/80 font-light">Premium Wellness Solutions</div>
                {/* Desktop: FlippingText */}
                <div className="hidden lg:block"><FlippingText /></div>
              </h2>
            </div>
            {/* Right: product card slideshow */}
            <div className="flex justify-center w-full">
              <HeroProductSlideshow />
            </div>
          </div>
        </div>
      </section>

      {/* Wavy Scrolling Text */}
      <section className="py-8 overflow-hidden bg-[#020410] relative z-10 -mt-4">

        <WaveMarquee speedSeconds={12} amplitudePx={24} tightnessSeconds={-0.04} repeats={4} />
      </section>

      {/* Full-width divider */}
      <div className="w-full h-1 bg-white" />

      {/* The Thrive Factor - split layout with accordions */}
      <section className="py-16 md:py-24 bg-[#020410] relative overflow-hidden">

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 items-start gap-12">
            {/* Left: Heading + accordion list */}
            <div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-3 text-center lg:text-left">
                The Thrive <span className="text-glacier">Factor</span>
              </h2>
              <p className="font-display text-xl sm:text-2xl font-extrabold text-white/90 tracking-wide mb-10 text-center lg:text-left">
                Made with Purpose
              </p>

              <div className="divide-y divide-white/20 max-w-xl">
                {thriveFactors.map((item) => (
                  <div key={item.title} className="py-4">
                    <button
                      onClick={() => toggleAccordion(item.title)}
                      className="flex items-center justify-between w-full text-white/90 hover:text-white transition-colors"
                    >
                      <span className="font-display text-xl font-bold tracking-wide">{item.title}</span>
                      <ChevronDown
                        className={`w-6 h-6 transition-transform duration-300 ${openAccordion === item.title ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-700 ease-in-out ${openAccordion === item.title ? "max-h-96 mt-6" : "max-h-0"
                        }`}
                    >
                      <p className="text-white/70 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product card */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-gradient-to-br from-navy-medium via-navy-medium/60 to-white/10 p-6 shadow-2xl overflow-hidden">
                <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-navy-medium/40 via-ocean/30 to-white/40 flex items-center justify-center overflow-hidden">
                  <img src="https://quygevwkhlggdifdqqto.supabase.co/storage/v1/object/public/products/product-images/BO-43.png" alt="Thrive Bottle" className="w-full h-full object-contain" />
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
