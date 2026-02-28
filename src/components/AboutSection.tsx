import { motion } from "framer-motion";
import biancoMarfil from "@/assets/stones/bianco-marfil.webp";

const AboutSection = () => {
  return (
    <section id="about" className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Image */}
        <div className="relative overflow-hidden h-[50vh] lg:h-auto">
          <motion.img
            src={biancoMarfil}
            alt="Cosmo showroom"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="label-text text-accent mb-4">Since 1992</p>
            <h2 className="heading-section text-foreground mb-8">
              Trusted stone for<br />
              architects & designers
            </h2>
            <p className="body-text max-w-md mb-6">
              For over three decades, Cosmo has been sourcing and curating the
              world's finest natural stone. From Italian quarries to global
              showrooms, we bring timeless materials to life.
            </p>
            <p className="body-text max-w-md mb-10">
              Every slab is hand-selected for its unique character, ensuring
              that each project receives stone of uncompromising quality.
            </p>
            <a
              href="#contact"
              className="label-text text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors duration-300 inline-block"
            >
              Learn more about us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
