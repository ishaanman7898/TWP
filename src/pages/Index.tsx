import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Features } from "@/components/Features";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Products />
      <Features />
      <About />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
