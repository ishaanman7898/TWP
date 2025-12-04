import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Matrix Dots Background */}
      <div className="absolute inset-0 z-0">
        <div className="matrix-dots"></div>
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/HeroVideo.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Lighter overlay for better video visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/20 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
          {/* Main Headline - Responsive sizing */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 animate-fade-in-up delay-100 leading-tight">
            <span className="text-foreground">WELLNESS</span>
            <br />
            <span className="text-foreground">THAT </span>
            <span className="text-gradient glow-text">WORKS</span>
          </h1>

          {/* Subheadline - Responsive sizing */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up delay-200 leading-relaxed">
            Unlock your peak performance with premium supplements designed for those who demand more from life.
          </p>

          {/* CTA Buttons - Stacked on mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 animate-fade-in-up delay-300 justify-center lg:justify-start">
            <Button variant="hero" size="default" className="rounded-full w-full sm:w-auto text-sm sm:text-base" asChild>
              <a href="/shop">
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </Button>
            <Button variant="hero-outline" size="default" className="rounded-full w-full sm:w-auto text-sm sm:text-base" asChild>
              <a href="#about">
                <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Our Story
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>
  );
}
