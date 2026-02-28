import cremaNova from "@/assets/stones/crema-nova.webp";
import cloudyBeige from "@/assets/stones/cloudy-beige.webp";
import bresciaAurora from "@/assets/stones/brescia-aurora.webp";
import atlanticBeige from "@/assets/stones/atlantic-beige.webp";
import biancoMarfil from "@/assets/stones/bianco-marfil.webp";

const families = [
  { name: "Beige & Cream", image: cremaNova },
  { name: "Grey", image: cloudyBeige },
  { name: "White", image: biancoMarfil },
  { name: "Exotic", image: bresciaAurora },
  { name: "Black", image: atlanticBeige },
];

const ColorFamilies = () => {
  return (
    <section className="section-spacing section-padding">
      <div className="mb-12 md:mb-16">
        <p className="label-text mb-3">Browse By</p>
        <h2 className="heading-section text-foreground">Color Families</h2>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-5 gap-8">
        {families.map((f, i) => (
          <button
            key={f.name}
            className="group flex flex-col items-center gap-5 animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-2 border-transparent group-hover:border-accent transition-all duration-500">
              <img
                src={f.image}
                alt={f.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <span className="label-text group-hover:text-foreground transition-colors duration-300">
              {f.name}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile horizontal scroll */}
      <div className="md:hidden flex gap-6 overflow-x-auto no-scrollbar pb-4">
        {families.map((f) => (
          <button
            key={f.name}
            className="group flex flex-col items-center gap-4 shrink-0"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-accent transition-all duration-500">
              <img
                src={f.image}
                alt={f.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="label-text">{f.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ColorFamilies;
