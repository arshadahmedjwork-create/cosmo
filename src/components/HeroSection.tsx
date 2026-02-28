import { useEffect, useRef, useState } from "react";
import cremaNova from "@/assets/stones/crema-nova.webp";
import cloudyBeige from "@/assets/stones/cloudy-beige.webp";
import bresciaDiana from "@/assets/stones/brescia-diana.webp";

const heroSlides = [
  { image: cremaNova, name: "Crema Nova", subtitle: "Polished Cream Marble" },
  { image: cloudyBeige, name: "Cloudy Beige", subtitle: "Soft Matte Marble" },
  { image: bresciaDiana, name: "Brescia Diana", subtitle: "Classic Beige Stone" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {heroSlides.map((s, i) => (
        <div
          key={s.name}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={s.image}
            alt={s.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 section-padding pb-16 md:pb-24">
        <div className="max-w-3xl">
          <p className="label-text text-secondary mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Trusted Stone Since 1992
          </p>
          <h1
            className="heading-editorial text-primary-foreground mb-6 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {slide.name}
          </h1>
          <p
            className="body-text text-secondary/80 mb-10 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            {slide.subtitle}
          </p>
          <div className="flex gap-4 animate-fade-up" style={{ animationDelay: "0.7s" }}>
            <a
              href="#collections"
              className="label-text bg-primary-foreground text-primary px-8 py-4 rounded hover:opacity-90 transition-opacity duration-300"
            >
              Explore Collection
            </a>
            <a
              href="#contact"
              className="label-text border border-primary-foreground/40 text-primary-foreground px-8 py-4 rounded hover:bg-primary-foreground/10 transition-all duration-300"
            >
              Request Sample
            </a>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-3 mt-12">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-0.5 rounded-full transition-all duration-500 ${
                i === current
                  ? "w-12 bg-primary-foreground"
                  : "w-6 bg-primary-foreground/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
