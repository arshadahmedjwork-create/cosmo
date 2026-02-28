import biancoMarfil from "@/assets/stones/bianco-marfil.webp";
import bresciaDiana from "@/assets/stones/brescia-diana.webp";

const FeaturedSection = () => {
  return (
    <section className="section-spacing">
      {/* Full-width split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Image */}
        <div className="relative overflow-hidden h-[50vh] lg:h-auto">
          <img
            src={biancoMarfil}
            alt="Featured marble installation"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Content */}
        <div className="flex flex-col justify-center section-padding py-16 lg:py-24 lg:pl-20 bg-muted">
          <p className="label-text mb-4 text-accent">Featured Material</p>
          <h2 className="heading-section text-foreground mb-6">
            Bianco Marfil
          </h2>
          <p className="body-text max-w-lg mb-8">
            A timeless Italian marble with soft cream tones and delicate veining.
            Perfect for luxury interiors, statement walls, and refined flooring.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {["Polished", "Matte", "Leather"].map((finish) => (
              <span
                key={finish}
                className="label-text border border-border px-4 py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
              >
                {finish}
              </span>
            ))}
          </div>
          <a
            href="#contact"
            className="label-text bg-primary text-primary-foreground px-8 py-4 rounded w-fit hover:opacity-90 transition-opacity duration-300"
          >
            Request Sample
          </a>
        </div>
      </div>

      {/* Second feature — reversed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
        <div className="flex flex-col justify-center section-padding py-16 lg:py-24 lg:pr-20 order-2 lg:order-1">
          <p className="label-text mb-4 text-accent">Applications</p>
          <h2 className="heading-section text-foreground mb-6">
            Designed for<br />Every Space
          </h2>
          <p className="body-text max-w-lg mb-8">
            From kitchen countertops to grand foyer walls, our materials are selected
            for their beauty, durability, and versatility across residential and
            commercial projects.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Kitchen", "Flooring", "Wall", "Bathroom"].map((app) => (
              <span
                key={app}
                className="label-text border border-border px-5 py-2.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
              >
                {app}
              </span>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden h-[50vh] lg:h-auto order-1 lg:order-2">
          <img
            src={bresciaDiana}
            alt="Stone wall application"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
