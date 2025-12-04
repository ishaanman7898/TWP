import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function About() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-24">
                <h1 className="text-4xl font-bold mb-6">About Us</h1>
                <p className="text-lg text-muted-foreground">
                    At Thrive, we believe in the power of nature and science coming together.
                    Our mission is to provide premium wellness products that help you perform at your best.
                </p>
                {/* Add more content as needed */}
            </div>
            <Footer />
        </div>
    );
}
