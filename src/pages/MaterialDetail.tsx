import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import cremaNova from "@/assets/stones/crema-nova.webp";
import cloudyBeige from "@/assets/stones/cloudy-beige.webp";
import bresciaDiana from "@/assets/stones/brescia-diana.webp";
import bresciaAurora from "@/assets/stones/brescia-aurora.webp";
import botticino from "@/assets/stones/botticino-classico.webp";
import biancoMarfil from "@/assets/stones/bianco-marfil.webp";
import atlanticBeige from "@/assets/stones/atlantic-beige.webp";

const materialsData: Record<string, { name: string; finish: string; category: string; image: string; description: string }> = {
  "crema-nova": { name: "Crema Nova", finish: "Polished", category: "Beige & Cream", image: cremaNova, description: "A classic cream marble with subtle, elegant veining. Its warm undertones make it ideal for creating bright, inviting interiors." },
  "cloudy-beige": { name: "Cloudy Beige", finish: "Matte", category: "Beige & Cream", image: cloudyBeige, description: "Soft, cloud-like patterns in warm beige tones. This marble brings an organic, calming quality to any space." },
  "brescia-diana": { name: "Brescia Diana", finish: "Polished", category: "Beige & Cream", image: bresciaDiana, description: "Classic Italian beige marble with subtle horizontal veining. A timeless choice for walls and flooring." },
  "brescia-aurora": { name: "Brescia Aurora", finish: "Polished", category: "Beige & Cream", image: bresciaAurora, description: "Warm beige marble with a faint pink hue and natural crystalline patterns. Exudes quiet luxury." },
  "botticino-classico": { name: "Botticino Classico", finish: "Honed", category: "Beige & Cream", image: botticino, description: "One of Italy's most beloved marbles, featuring fine, uniform beige tones with delicate white veining." },
  "bianco-marfil": { name: "Bianco Marfil", finish: "Polished", category: "White", image: biancoMarfil, description: "A light cream marble slab with faint golden veining. Perfect for luxury interiors and statement surfaces." },
  "atlantic-beige": { name: "Atlantic Beige", finish: "Matte", category: "Beige & Cream", image: atlanticBeige, description: "A photoreal beige marble with warm sandy tones and natural linear patterns. Versatile and refined." },
};

const finishes = ["Polished", "Matte", "Leather"];
const thicknesses = ["16 mm", "20 mm", "30 mm"];
const applications = ["Kitchen", "Flooring", "Wall", "Bathroom"];

const MaterialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const material = materialsData[id || ""];
  const [activeFinish, setActiveFinish] = useState(material?.finish || "Polished");
  const [activeThickness, setActiveThickness] = useState("20 mm");
  const [activeApp, setActiveApp] = useState("Kitchen");

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

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        <img src={material.image} alt={material.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-12 md:pb-20">
          <Link to="/" className="inline-flex items-center gap-2 label-text text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Collection
          </Link>
          <p className="label-text text-accent mb-3">{material.category}</p>
          <h1 className="heading-editorial text-primary-foreground mb-4">{material.name}</h1>
          <a href="#contact" className="label-text bg-primary-foreground text-primary px-8 py-4 rounded inline-block hover:opacity-90 transition-opacity duration-300 mt-4">
            Request Sample
          </a>
        </div>
      </section>

      {/* Details */}
      <section className="section-spacing section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="label-text mb-3">About</p>
            <h2 className="heading-section text-foreground mb-6">{material.name}</h2>
            <p className="body-text">{material.description}</p>
          </div>
          <div className="space-y-10">
            {/* Finish selector */}
            <div>
              <p className="label-text mb-4">Finish</p>
              <div className="flex flex-wrap gap-3">
                {finishes.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFinish(f)}
                    className={`label-text px-5 py-2.5 rounded-full border transition-all duration-300 ${
                      activeFinish === f
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            {/* Thickness selector */}
            <div>
              <p className="label-text mb-4">Thickness</p>
              <div className="flex flex-wrap gap-3">
                {thicknesses.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveThickness(t)}
                    className={`label-text px-5 py-2.5 rounded-full border transition-all duration-300 ${
                      activeThickness === t
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section-spacing bg-muted">
        <div className="section-padding">
          <p className="label-text mb-3">Ideal For</p>
          <h2 className="heading-section text-foreground mb-10">Applications</h2>
          <div className="flex flex-wrap gap-3">
            {applications.map((app) => (
              <button
                key={app}
                onClick={() => setActiveApp(app)}
                className={`label-text px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeApp === app
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-foreground/30"
                }`}
              >
                {app}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MaterialDetail;
