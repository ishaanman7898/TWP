import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";

export default function Admin() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin) {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        navigate("/login");
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="container mx-auto px-4 py-24 flex-grow">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Product Manifest</h1>
                    <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </div>

                <div className="mb-6">
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md"
                    />
                </div>

                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">SKU</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Group</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Color</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{product.sku}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{product.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{product.groupName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {product.color && (
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="w-4 h-4 rounded-full border border-border"
                                                        style={{ backgroundColor: product.hexColor }}
                                                    />
                                                    {product.color}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">${product.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <Button variant="ghost" size="sm">Edit</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
