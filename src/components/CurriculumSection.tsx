import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const modules = [
  {
    week: "Hari 1",
    title: "Fundamentals & Networking",
    topics: ["Dasar Keamanan Siber", "TCP/IP & Networking", "Linux Administration", "Command Line Mastery"],
  },
  {
    week: "Hari 2",
    title: "Ethical Hacking",
    topics: ["Reconnaissance & Scanning", "Vulnerability Assessment", "Metasploit Framework", "Web Application Security"],
  },
  {
    week: "Hari 3",
    title: "Defense & Blue Team",
    topics: ["SIEM & Log Analysis", "Intrusion Detection Systems", "Firewall Configuration", "Incident Response"],
  },
];

const CurriculumSection = () => {
  return (
    <section id="curriculum" className="relative py-24">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-sm uppercase tracking-widest text-primary">
            12 Minggu Intensif
          </span>
          <h2 className="text-3xl font-bold md:text-5xl">
            <span className="text-primary glow-text-primary">Kurikulum</span> Kami
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-accent/50"
            >
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                <Terminal className="h-3 w-3" />
                {module.week}
              </div>
              <h3 className="mb-4 font-mono text-lg font-bold">{module.title}</h3>
              <ul className="space-y-2">
                {module.topics.map((topic) => (
                  <li key={topic} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {topic}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
