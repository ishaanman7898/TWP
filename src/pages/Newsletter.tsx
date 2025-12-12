import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
        }
    };

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
            Stay in the <span className="text-gradient">Loop</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
            Subscribe to our newsletter for exclusive offers, wellness tips, and be the first to know about new product launches.
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
          <div className="max-w-2xl mx-auto text-center">
                        {!submitted ? (
                            <>
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-glacier to-primary flex items-center justify-center mx-auto mb-8">
                                    <Mail className="w-10 h-10 text-white" />
                                </div>

                                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                    Stay in the <span className="text-glacier">Loop</span>
                                </h1>

                                <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
                                    Subscribe to our newsletter for exclusive offers, wellness tips, and be the first to know about new product launches.
                                </p>

                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 px-6 py-4 rounded-full bg-muted border border-border focus:border-glacier focus:outline-none transition-colors"
                                        required
                                    />
                                    <Button type="submit" variant="hero" className="rounded-full px-8">
                                        Subscribe
                                    </Button>
                                </form>

                                <p className="text-xs text-muted-foreground mt-6">
                                    No spam, ever. Unsubscribe anytime.
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-glacier flex items-center justify-center mx-auto mb-8">
                                    <Check className="w-10 h-10 text-white" />
                                </div>

                                <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-emerald-500">
                                    You're In!
                                </h1>

                                <p className="text-muted-foreground text-lg mb-10">
                                    Thanks for subscribing! Check your inbox for a welcome email.
                                </p>

                                <Button variant="outline" onClick={() => { setSubmitted(false); setEmail(""); }} className="rounded-full">
                                    Subscribe Another Email
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
