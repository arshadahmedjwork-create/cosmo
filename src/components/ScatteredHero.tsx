import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import cremaNova from "@/assets/stones/crema-nova.webp";
import cloudyBeige from "@/assets/stones/cloudy-beige.webp";
import bresciaDiana from "@/assets/stones/brescia-diana.webp";
import bresciaAurora from "@/assets/stones/brescia-aurora.webp";
import botticino from "@/assets/stones/botticino-classico.webp";
import biancoMarfil from "@/assets/stones/bianco-marfil.webp";
import atlanticBeige from "@/assets/stones/atlantic-beige.webp";

interface StoneOrb {
  id: string;
  name: string;
  image: string;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const stoneOrbs: StoneOrb[] = [
  { id: "crema-nova", name: "Crema Nova", image: cremaNova, x: 14, y: 12, size: 160, delay: 0 },
  { id: "cloudy-beige", name: "Cloudy Beige", image: cloudyBeige, x: 38, y: 8, size: 110, delay: 0.1 },
  { id: "brescia-diana", name: "Brescia Diana", image: bresciaDiana, x: 62, y: 18, size: 190, delay: 0.15 },
  { id: "brescia-aurora", name: "Brescia Aurora", image: bresciaAurora, x: 85, y: 8, size: 130, delay: 0.2 },
  { id: "atlantic-beige", name: "Atlantic Beige", image: atlanticBeige, x: 5, y: 42, size: 200, delay: 0.05 },
  { id: "bianco-marfil", name: "Bianco Marfil", image: biancoMarfil, x: 30, y: 38, size: 80, delay: 0.25 },
  { id: "botticino-classico", name: "Botticino Classico", image: botticino, x: 50, y: 45, size: 150, delay: 0.12 },
  { id: "crema-nova", name: "Crema Nova", image: cremaNova, x: 75, y: 40, size: 100, delay: 0.3 },
  { id: "cloudy-beige", name: "Cloudy Beige", image: cloudyBeige, x: 92, y: 35, size: 170, delay: 0.08 },
  { id: "brescia-aurora", name: "Brescia Aurora", image: bresciaAurora, x: 20, y: 68, size: 140, delay: 0.18 },
  { id: "brescia-diana", name: "Brescia Diana", image: bresciaDiana, x: 45, y: 72, size: 90, delay: 0.22 },
  { id: "atlantic-beige", name: "Atlantic Beige", image: atlanticBeige, x: 68, y: 65, size: 180, delay: 0.13 },
  { id: "bianco-marfil", name: "Bianco Marfil", image: biancoMarfil, x: 88, y: 70, size: 120, delay: 0.28 },
  { id: "botticino-classico", name: "Botticino Classico", image: botticino, x: 8, y: 88, size: 100, delay: 0.16 },
  { id: "crema-nova", name: "Crema Nova", image: cremaNova, x: 35, y: 90, size: 70, delay: 0.35 },
  { id: "cloudy-beige", name: "Cloudy Beige", image: cloudyBeige, x: 55, y: 88, size: 130, delay: 0.1 },
  { id: "brescia-diana", name: "Brescia Diana", image: bresciaDiana, x: 78, y: 85, size: 160, delay: 0.2 },
];

const ScatteredHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startOffset, setStartOffset] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setStartOffset({ ...offset });
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = (e.clientX - dragStart.x) * 0.4;
    const dy = (e.clientY - dragStart.y) * 0.4;
    setOffset({ x: startOffset.x + dx, y: startOffset.y + dy });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-stone-cream select-none"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Scattered stone spheres */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        {stoneOrbs.map((orb, i) => (
          <motion.div
            key={`${orb.id}-${i}`}
            className="absolute"
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: orb.size,
              height: orb.size,
              marginLeft: -orb.size / 2,
              marginTop: -orb.size / 2,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: orb.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="w-full h-full rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 group"
              style={{
                boxShadow: `0 ${orb.size * 0.06}px ${orb.size * 0.15}px rgba(0,0,0,0.12)`,
              }}
            >
              <img
                src={orb.image}
                alt={orb.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                draggable={false}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Center content overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          className="text-center pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="label-text text-stone-taupe mb-4">collection</p>
          <h1 className="heading-editorial text-foreground mb-6 max-w-2xl mx-auto">
            Explore Cosmo<br />stone collections
          </h1>
          <p className="body-text max-w-lg mx-auto mb-10">
            Our collection is curated for architects and designers. Rich textures
            and natural finishes transform every space into a masterpiece.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="label-text bg-primary text-primary-foreground px-7 py-3.5 rounded-sm hover:opacity-90 transition-opacity duration-300"
            >
              request sample
            </Link>
            <a
              href="#collections"
              className="label-text border border-foreground/20 text-foreground px-7 py-3.5 rounded-sm hover:bg-foreground/5 transition-all duration-300"
            >
              explore collection
            </a>
          </div>
        </motion.div>
      </div>

      {/* Drag hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <svg width="20" height="20" viewBox="0 0 15 15" fill="none" className="text-muted-foreground">
          <path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" />
        </svg>
        <span className="label-text text-muted-foreground">Drag to explore</span>
      </motion.div>
    </section>
  );
};

export default ScatteredHero;
