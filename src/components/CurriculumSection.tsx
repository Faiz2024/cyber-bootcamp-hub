import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const modules = [
  {
    week: "Pertemuan 01",
    title: "Art of Reconnaissance",
    topics: ["Passive & Active Information Gathering"],
    goal: "Inventory Report",
  },
  {
    week: "Pertemuan 02",
    title: "Web Invasion",
    topics: ["Exploiting the Web Layer"],
    goal: "Initial Access",
  },
  {
    week: "Pertemuan 03",
    title: "Post Exploitation",
    topics: ["Privilege Escalation & Persistence"],
    goal: "Crown Jewel",
  },
];

const CurriculumSection = () => {
  return (
    <section id="curriculum" className="relative py-24">
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm uppercase tracking-widest text-primary">
            3 Pertemuan Intensif
          </span>
          <h2 className="text-3xl font-bold md:text-5xl">
            <span className="text-primary">Kurikulum</span> Kami
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
              className="rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50"
            >
              <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary">
                <Terminal className="h-3 w-3" />
                {module.week}
              </div>
              <h3 className="mb-4 text-lg font-bold">{module.title}</h3>
              <ul className="space-y-2 mb-4">
                {module.topics.map((topic) => (
                  <li key={topic} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {topic}
                  </li>
                ))}
              </ul>
              <div className="rounded-md bg-primary/10 px-3 py-2">
                <span className="text-xs text-muted-foreground">Goal: </span>
                <span className="text-xs font-bold text-primary">{module.goal}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
