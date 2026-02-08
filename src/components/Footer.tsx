import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2 font-mono text-lg font-bold text-primary">
              <Shield className="h-5 w-5" />
              <span>CyberShield</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Bootcamp cybersecurity terkemuka di Indonesia. Jadilah profesional keamanan siber yang handal.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-foreground">Program</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/#curriculum" className="transition-colors hover:text-primary">Kurikulum</a></li>
              <li><a href="/#features" className="transition-colors hover:text-primary">Keunggulan</a></li>
              <li><a href="/#pricing" className="transition-colors hover:text-primary">Harga</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-foreground">Kontak</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@cybershield.id</li>
              <li>+62 812 3456 7890</li>
              <li>Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 CyberShield Bootcamp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
