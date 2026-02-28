import { motion } from "framer-motion";

import cremaNova from "@/assets/stones/crema-nova.webp";
import cloudyBeige from "@/assets/stones/cloudy-beige.webp";
import bresciaDiana from "@/assets/stones/brescia-diana.webp";
import bresciaAurora from "@/assets/stones/brescia-aurora.webp";

const stones = [
  { name: "Crema Nova", type: "Polished", image: cremaNova },
  { name: "Cloudy Beige", type: "Matte", image: cloudyBeige },
  { name: "Brescia Diana", type: "Polished", image: bresciaDiana },
  { name: "Brescia Aurora", type: "Polished", image: bresciaAurora },
];

const MaterialsGrid = () => {
  return (
    <section id="materials" className="bg-stone-cream section-spacing">
      <div className="px-6 md:px-10 mb-12 md:mb-16">
        <p className="label-text text-stone-taupe mb-3">Materials</p>
        <h2 className="heading-section text-foreground">
          Trusted stone,<br />refined by nature
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
        {stones.map((stone, i) => (
          <motion.div
            key={stone.name}
            className="relative aspect-square overflow-hidden group cursor-pointer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <img
              src={stone.image}
              alt={stone.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <h4 className="font-serif text-lg md:text-xl text-primary-foreground">{stone.name}</h4>
              <p className="label-text text-primary-foreground/60 mt-1">{stone.type}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MaterialsGrid;
