import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Stories() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-24">
                <h1 className="text-4xl font-bold mb-6">Our Stories</h1>
                <p className="text-lg text-muted-foreground">
                    Real stories from real people who have transformed their lives with Thrive.
                </p>
                {/* Add more content as needed */}
            </div>
            <Footer />
        </div>
    );
}
