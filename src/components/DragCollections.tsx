import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveHorizontal } from "lucide-react";

import cremaNova from "@/assets/stones/crema-nova.webp";
import cloudyBeige from "@/assets/stones/cloudy-beige.webp";
import bresciaDiana from "@/assets/stones/brescia-diana.webp";
import bresciaAurora from "@/assets/stones/brescia-aurora.webp";
import botticino from "@/assets/stones/botticino-classico.webp";
import biancoMarfil from "@/assets/stones/bianco-marfil.webp";
import atlanticBeige from "@/assets/stones/atlantic-beige.webp";

const collections = [
  {
    id: "crema-nova",
    name: "Crema",
    variant: "Nova",
    image: cremaNova,
    products: 6,
    color: "Polished cream marble",
  },
  {
    id: "cloudy-beige",
    name: "Cloudy",
    variant: "Beige",
    image: cloudyBeige,
    products: 4,
    color: "Soft matte marble",
  },
  {
    id: "brescia-diana",
    name: "Brescia",
    variant: "Diana",
    image: bresciaDiana,
    products: 5,
    color: "Classic beige stone",
  },
  {
    id: "brescia-aurora",
    name: "Brescia",
    variant: "Aurora",
    image: bresciaAurora,
    products: 7,
    color: "Warm pink-hue marble",
  },
  {
    id: "botticino-classico",
    name: "Botticino",
    variant: "Classico",
    image: botticino,
    products: 4,
    color: "Italian beige marble",
  },
  {
    id: "bianco-marfil",
    name: "Bianco",
    variant: "Marfil",
    image: biancoMarfil,
    products: 8,
    color: "Light cream marble",
  },
  {
    id: "atlantic-beige",
    name: "Atlantic",
    variant: "Beige",
    image: atlanticBeige,
    products: 5,
    color: "Warm sandy marble",
  },
];

const DragCollections = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPos = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.scrollWidth / collections.length;
    setActiveIndex(Math.round(scrollPos / cardWidth));
  };

  return (
    <section id="collections" className="bg-background section-spacing">
      {/* Collection cards - horizontal drag */}
      <div
        ref={scrollRef}
        className="flex gap-0 overflow-x-auto no-scrollbar select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onScroll={handleScroll}
      >
        {collections.map((col, i) => (
          <div
            key={col.id}
            className="shrink-0 w-[85vw] md:w-[50vw] lg:w-[35vw] h-[80vh] relative group"
          >
            {/* Full image background */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                draggable={false}
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>

            {/* Card content */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
              {/* Top: explore button */}
              <div className="flex justify-end">
                <Link
                  to={`/material/${col.id}`}
                  className="label-text bg-background/90 backdrop-blur-sm text-foreground px-5 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-background"
                >
                  explore
                </Link>
              </div>

              {/* Bottom: info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MoveHorizontal size={14} className="text-primary-foreground/60" />
                  <span className="label-text text-primary-foreground/60">Drag for more</span>
                </div>

                <h3 className="font-serif text-4xl md:text-5xl text-primary-foreground leading-none mb-1">
                  {col.name}
                </h3>
                <h3 className="font-serif text-4xl md:text-5xl text-primary-foreground/70 leading-none mb-6">
                  {col.variant}
                </h3>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-sans text-primary-foreground/60">
                    {col.products}
                  </span>
                  <span className="label-text text-primary-foreground/50">
                    Products
                  </span>
                </div>
              </div>
            </div>

            {/* Right border separator */}
            {i < collections.length - 1 && (
              <div className="absolute right-0 top-0 bottom-0 w-px bg-primary-foreground/10" />
            )}
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-8">
        {collections.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === activeIndex ? "w-8 bg-foreground" : "w-2 bg-foreground/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default DragCollections;
