import { Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  productLines: [
    { label: "Water Bottles", href: "/shop/water-bottles" },
    { label: "Electrolytes", href: "/shop/electrolytes" },
    { label: "Supplements", href: "/shop/supplements" },
    { label: "Accessories", href: "/shop/accessories" },
    { label: "Bundles", href: "/shop/bundles" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: "/about#mission" },
    { label: "Team", href: "/about#team" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping Times", href: "/shipping" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <img src="/Thrive.png" alt="Thrive" className="h-12 w-auto object-contain" />
            </a>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Premium wellness supplements designed for those who demand more from life.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Lines */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Product Lines</h4>
            <ul className="space-y-3">
              {footerLinks.productLines.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Team Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Thrive Wellness. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground italic">
              Disclaimer: This Virtual Enterprise online store is for educational purposes only (Thrive 2025-2026)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
