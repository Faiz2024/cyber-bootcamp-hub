import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 gradient-radial-primary" />
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Siap Memulai Karir di{" "}
            <span className="text-primary glow-text-primary">Cybersecurity</span>?
          </h2>
          <p className="mb-10 text-lg text-muted-foreground">
            Bergabunglah dengan 500+ alumni yang telah berhasil berkarir di bidang keamanan siber. 
            Batch berikutnya dimulai Maret 2026.
          </p>
          <Link to="/daftar">
            <Button variant="hero" size="lg" className="text-base px-10 py-6">
              <ShieldCheck className="mr-2 h-5 w-5" />
              Daftar Batch #12
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
