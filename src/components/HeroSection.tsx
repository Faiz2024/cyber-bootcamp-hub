import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, Terminal } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-40" />

      {/* Radial glow */}
      <div className="absolute inset-0 gradient-radial-primary" />

      {/* Content */}
      <div className="relative z-10 container mx-auto flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-sm text-primary">
            <Terminal className="h-4 w-4" />
            <span>Mulai Maret 2026</span>
          </div> 

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-primary glow-text-primary">MAN BEHIND</span>
            <br />
            <span className="text-primary glow-text-primary">THE HAT</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Bootcamp online intensif 3 hari bertema ofensif. Kuasai teknik reconnaissance, 
            web exploitation, hingga post exploitation langsung dari praktisi keamanan siber.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/daftar">
              <Button variant="hero" size="lg" className="text-base px-8 py-6">
                <ShieldCheck className="mr-2 h-5 w-5" />
                Daftar Sekarang
              </Button>
            </Link>
            <a href="#curriculum">
              <Button variant="hero-outline" size="lg" className="text-base px-8 py-6">
                Lihat Kurikulum
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {[
            { value: "3", label: "Hari Intensif" },
            { value: "95%", label: "Menguasai" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-3xl font-bold text-primary glow-text-primary md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
