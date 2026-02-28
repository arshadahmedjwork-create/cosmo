import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import cremaNova from "@/assets/stones/crema-nova.webp";
import cloudyBeige from "@/assets/stones/cloudy-beige.webp";
import bresciaDiana from "@/assets/stones/brescia-diana.webp";
import bresciaAurora from "@/assets/stones/brescia-aurora.webp";
import botticino from "@/assets/stones/botticino-classico.webp";
import biancoMarfil from "@/assets/stones/bianco-marfil.webp";
import atlanticBeige from "@/assets/stones/atlantic-beige.webp";

const materials = [
  { id: "crema-nova", name: "Crema Nova", finish: "Polished", image: cremaNova, size: "lg" },
  { id: "cloudy-beige", name: "Cloudy Beige", finish: "Matte", image: cloudyBeige, size: "md" },
  { id: "brescia-diana", name: "Brescia Diana", finish: "Polished", image: bresciaDiana, size: "lg" },
  { id: "brescia-aurora", name: "Brescia Aurora", finish: "Polished", image: bresciaAurora, size: "md" },
  { id: "botticino-classico", name: "Botticino Classico", finish: "Honed", image: botticino, size: "lg" },
  { id: "bianco-marfil", name: "Bianco Marfil", finish: "Polished", image: biancoMarfil, size: "md" },
  { id: "atlantic-beige", name: "Atlantic Beige", finish: "Matte", image: atlanticBeige, size: "lg" },
];

const CollectionExplorer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="collections" className="section-spacing">
      <div className="section-padding mb-12 md:mb-16">
        <p className="label-text mb-3">Discover</p>
        <h2 className="heading-section text-foreground">Our Collection</h2>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar px-8 md:px-12 pb-4 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {materials.map((m, i) => (
          <Link
            to={`/material/${m.id}`}
            key={m.id}
            className={`group shrink-0 relative overflow-hidden rounded-sm animate-fade-up ${
              m.size === "lg"
                ? "w-[340px] md:w-[440px] lg:w-[520px] h-[420px] md:h-[520px] lg:h-[620px]"
                : "w-[280px] md:w-[360px] lg:w-[420px] h-[360px] md:h-[440px] lg:h-[520px]"
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
            draggable={false}
          >
            <img
              src={m.image}
              alt={m.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              draggable={false}
            />
            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/50 to-transparent" />
            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="font-serif text-xl md:text-2xl text-primary-foreground mb-1">
                {m.name}
              </h3>
              <p className="label-text text-primary-foreground/70">{m.finish}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionExplorer;
