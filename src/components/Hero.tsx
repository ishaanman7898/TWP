import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up delay-100">
            <span className="text-foreground">WELLNESS</span>
            <br />
            <span className="text-foreground">THAT </span>
            <span className="text-gradient glow-text">WORKS</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg animate-fade-in-up delay-200 leading-relaxed">
            Unlock your peak performance with premium supplements designed for those who demand more from life.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
            <Button variant="hero" size="xl" className="rounded-full">
              Shop Products
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button variant="hero-outline" size="xl" className="rounded-full group">
              <Play className="w-5 h-5 mr-1 group-hover:scale-110 transition-transform" />
              Watch Our Story
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section >
  );
}
