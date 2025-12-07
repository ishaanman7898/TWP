import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, Leaf, Target, Users, ChevronDown } from "lucide-react";

const missionPillars = [
    {
        icon: Heart,
        title: "Health First",
        description: "Every product we create is designed with your health and wellness at the forefront. No compromises, no shortcuts."
    },
    {
        icon: Leaf,
        title: "Sustainability",
        description: "We're committed to reducing our environmental impact through sustainable materials, packaging, and practices."
    },
    {
        icon: Target,
        title: "Quality",
        description: "From sourcing to manufacturing, we maintain the highest standards to deliver products you can trust."
    },
    {
        icon: Users,
        title: "Community",
        description: "We believe in building a community of wellness-minded individuals who support and inspire each other."
    }
];

export default function Mission() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background"></div>
          <div className="absolute inset-0 matrix-dots opacity-10" aria-hidden="true"></div>
        </div>
        
        {/* Darker overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-20">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            Our <span className="text-gradient">Mission</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
            At Thrive, we believe that wellness should be simple, accessible, and sustainable.
            Our mission is to create innovative products that empower you to live your best life
            while caring for the planet we all share.
          </p>
        </div>
      </section>

      {/* Scroll Indicator */}
      <button
        type="button"
        aria-label="Scroll down"
        onClick={() => window.scrollTo({ behavior: 'smooth', top: window.innerHeight })}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce z-20 hover:opacity-90 focus:outline-none"
      >
        <ChevronDown className="w-8 h-8 text-white/80" />
      </button>

      <main className="flex-1 pt-20 pb-20">
        <div className="container mx-auto px-4 lg:px-8">

                    {/* Vision Statement */}
                    <div className="glass rounded-2xl p-8 md:p-12 border border-border mb-20 max-w-4xl mx-auto">
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-center">
                            Our Vision
                        </h2>
                        <p className="text-lg text-muted-foreground text-center leading-relaxed">
                            We envision a world where everyone has access to the tools they need to thrive—
                            physically, mentally, and environmentally. Through thoughtful design and
                            sustainable practices, we're working to make that vision a reality, one product at a time.
                        </p>
                    </div>

                    {/* Mission Pillars */}
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
                            What Drives Us
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {missionPillars.map((pillar) => (
                                <div key={pillar.title} className="glass rounded-xl p-8 border border-border">
                                    <pillar.icon className="w-12 h-12 text-glacier mb-6" />
                                    <h3 className="font-display text-2xl font-bold mb-4">{pillar.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-20 text-center">
                        <p className="text-muted-foreground mb-6">Ready to start your wellness journey?</p>
                        <a
                            href="/shop"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-glacier to-primary text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
                        >
                            Explore Our Products →
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
