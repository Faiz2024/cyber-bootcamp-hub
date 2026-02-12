import { motion } from "framer-motion";
import { Shield, Users, Award, Laptop, BookOpen, Zap } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "E-Sertifikat",
    description: "Dapatkan sertifikat digital sebagai bukti kompetensi di bidang offensive security.",
  },
  {
    icon: BookOpen,
    title: "Materi & Modul",
    description: "Akses lengkap ke materi dan modul pembelajaran yang terstruktur.",
  },
  {
    icon: Laptop,
    title: "Full Praktik",
    description: "100% hands-on lab — langsung praktik teknik reconnaissance, exploitation, dan post-exploitation.",
  },
  {
    icon: Users,
    title: "Networking & Grup Diskusi",
    description: "Bergabung dengan komunitas dan grup diskusi sesama peserta serta praktisi keamanan siber.",
  },
  {
    icon: Zap,
    title: "Rekaman Ulang",
    description: "Akses rekaman semua sesi untuk dipelajari ulang kapan saja.",
  },
  {
    icon: Shield,
    title: "Free Konsultasi",
    description: "Konsultasi gratis dengan mentor seputar karir dan teknis cybersecurity.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24">
      <div className="absolute inset-0 gradient-radial-accent opacity-50" />
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-sm uppercase tracking-widest text-accent">
            Mengapa BoC-Cyber?
          </span>
          <h2 className="text-3xl font-bold md:text-5xl">
            Keunggulan <span className="text-accent glow-text-accent">Kami</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:glow-primary"
            >
              <div className="mb-4 inline-flex rounded-md bg-primary/10 p-3 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-mono text-lg font-bold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
