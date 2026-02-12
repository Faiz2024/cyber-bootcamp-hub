import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Paket Reguler",
    price: "Rp 50.000",
    period: "sekali bayar",
    description: "Akses materi dan rekaman sesi",
    features: [
      "E-Sertifikat",
      "Materi & Modul",
      "Full Praktik",
      "Rekaman Ulang",
      "Free Konsultasi",
      "Akses Grup Diskusi",
      "Knowledge & Networking",
    ],
    featured: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24">
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm uppercase tracking-widest text-primary">
            Investasi Karirmu
          </span>
          <h2 className="text-3xl font-bold md:text-5xl">
            Pilih <span className="text-primary">Paket</span>mu
          </h2>
        </motion.div>

        <div className="mx-auto flex flex-wrap justify-center gap-6 max-w-5xl">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative w-full md:w-[350px] rounded-lg border p-8 transition-all duration-300 ${
                plan.featured
                  ? "border-primary bg-card glow-primary scale-105"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    <Star className="h-3 w-3" /> Populer
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-extrabold text-primary">{plan.price}</span>
                <span className="ml-2 text-sm text-muted-foreground">/{plan.period}</span>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-secondary-foreground">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to="/daftar">
                <Button className="w-full">
                  Daftar Sekarang
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
