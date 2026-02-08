import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/#features", label: "Keunggulan" },
    { href: "/#curriculum", label: "Kurikulum" },
    { href: "/#pricing", label: "Harga" },
    { href: "/daftar", label: "Daftar" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-mono text-lg font-bold text-primary">
          <Shield className="h-6 w-6" />
          <span className="glow-text-primary">Cyber015</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <Link to="/daftar">
            <Button variant="hero" size="sm">
              Daftar Sekarang
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link to="/daftar" onClick={() => setIsOpen(false)}>
              <Button variant="hero" size="sm" className="w-full">
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
