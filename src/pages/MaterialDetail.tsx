import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MoveHorizontal } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import cremaNova from "@/assets/images/BEIGES AND CREAM/Crema-Nova-min-min.jpeg";
import cloudyBeige from "@/assets/images/BEIGES AND CREAM/Cloudy-Beige-min-min.jpeg";
import bresciaDiana from "@/assets/images/BEIGES AND CREAM/Bresica-Diana-min.jpg";
import bresciaAurora from "@/assets/images/BEIGES AND CREAM/Brescia-Aurora-min.jpg";
import botticino from "@/assets/images/BEIGES AND CREAM/Botticino-Classico-min-min.jpeg";
import biancoMarfil from "@/assets/images/BEIGES AND CREAM/Bianco-Marfill-min.jpg";
import atlanticBeige from "@/assets/images/BEIGES AND CREAM/Atlantic-min.jpg";

const materialsData: Record<string, { name: string; variant: string; finish: string; category: string; image: string; description: string; products: number }> = {
  "crema-nova": { name: "Crema", variant: "Nova", finish: "Polished", category: "Beige & Cream", image: cremaNova, description: "A classic cream marble with subtle, elegant veining. Its warm undertones create bright, inviting interiors that feel both luxurious and welcoming.", products: 6 },
  "cloudy-beige": { name: "Cloudy", variant: "Beige", finish: "Matte", category: "Beige & Cream", image: cloudyBeige, description: "Soft, cloud-like patterns in warm beige tones. This marble brings an organic, calming quality to any architectural space.", products: 4 },
  "brescia-diana": { name: "Brescia", variant: "Diana", finish: "Polished", category: "Beige & Cream", image: bresciaDiana, description: "Classic Italian beige marble with subtle horizontal veining. A timeless choice for walls and flooring in premium projects.", products: 5 },
  "brescia-aurora": { name: "Brescia", variant: "Aurora", finish: "Polished", category: "Beige & Cream", image: bresciaAurora, description: "Warm beige marble with a faint pink hue and natural crystalline patterns. Exudes quiet luxury and refined elegance.", products: 7 },
  "botticino-classico": { name: "Botticino", variant: "Classico", finish: "Honed", category: "Beige & Cream", image: botticino, description: "One of Italy's most beloved marbles, featuring fine, uniform beige tones with delicate white veining throughout.", products: 4 },
  "bianco-marfil": { name: "Bianco", variant: "Marfil", finish: "Polished", category: "White", image: biancoMarfil, description: "A light cream marble slab with faint golden veining. Perfect for luxury interiors and statement surfaces.", products: 8 },
  "atlantic-beige": { name: "Atlantic", variant: "Beige", finish: "Matte", category: "Beige & Cream", image: atlanticBeige, description: "A warm beige marble with sandy tones and natural linear patterns. Versatile and refined for any application.", products: 5 },
};

const finishes = ["Polished", "Matte", "Leather"];
const thicknesses = ["16 mm", "20 mm", "30 mm"];

const MaterialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const material = materialsData[id || ""];
  const [activeFinish, setActiveFinish] = useState(material?.finish || "Polished");
  const [activeThickness, setActiveThickness] = useState("20 mm");

  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="heading-section mb-4">Material Not Found</h1>
          <Link to="/" className="label-text text-accent hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  // Get similar materials
  const similarIds = Object.keys(materialsData).filter((k) => k !== id).slice(0, 3);

  return (
    <div className="bg-background min-h-screen">
      <Navbar view="grid" onViewChange={() => {}} hideViewSwitcher={true} />

      {/* Hero - full width image */}
      <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
        <motion.img
          src={material.image}
          alt={`${material.name} ${material.variant}`}
          className="w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-foreground/10" />

        <motion.div
          className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-10 md:pb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 label-text text-primary-foreground/60 hover:text-primary-foreground mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back
          </Link>
          <p className="label-text text-accent mb-3">{material.category}</p>
          <h1 className="font-serif text-5xl md:text-7xl text-primary-foreground leading-none mb-1">
            {material.name}
          </h1>
          <h1 className="font-serif text-5xl md:text-7xl text-primary-foreground/60 leading-none">
            {material.variant}
          </h1>
        </motion.div>
      </section>

      {/* Details */}
      <section className="px-6 md:px-10 section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl">
          <div>
            <p className="body-text">{material.description}</p>
          </div>
          <div className="space-y-10">
            <div>
              <p className="label-text mb-4">Finish</p>
              <div className="flex flex-wrap gap-3">
                {finishes.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFinish(f)}
                    className={`label-text px-5 py-2.5 rounded-full border transition-all duration-300 ${activeFinish === f
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-foreground/30"
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="label-text mb-4">Thickness</p>
              <div className="flex flex-wrap gap-3">
                {thicknesses.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveThickness(t)}
                    className={`label-text px-5 py-2.5 rounded-full border transition-all duration-300 ${activeThickness === t
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-foreground/30"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <Link
              to="/contact"
              className="label-text bg-primary text-primary-foreground px-7 py-3.5 rounded-sm inline-block hover:opacity-90 transition-opacity duration-300"
            >
              Request Sample
            </Link>
          </div>
        </div>
      </section>

      {/* Similar */}
      <section className="px-6 md:px-10 section-spacing bg-stone-cream">
        <p className="label-text text-stone-taupe mb-3">Similar</p>
        <h2 className="heading-section text-foreground mb-12">More to explore</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {similarIds.map((sid) => {
            const s = materialsData[sid];
            return (
              <Link
                key={sid}
                to={`/material/${sid}`}
                className="relative aspect-[4/3] overflow-hidden group"
              >
                <img src={s.image} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="font-serif text-2xl text-primary-foreground">{s.name}</h4>
                  <p className="font-serif text-2xl text-primary-foreground/60">{s.variant}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MaterialDetail;
