import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const image1 = "/images/about-building.jpg"; 
const image2 = "/images/about-map.jpg";
const image3 = "/images/about-stockyard.jpg";

// Staggered text reveal animation component
const RevealText = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.h1 
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.08 } },
        hidden: {}
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom pb-1">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0, rotateZ: 5 },
              visible: { 
                y: 0, 
                opacity: 1, 
                rotateZ: 0,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
              }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
};

const About = () => {
  // Parallax setup for the hero image and the map
  const heroRef = useRef<HTMLDivElement>(null);
  const sourcingRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });
  
  const { scrollYProgress: mapProgress } = useScroll({
    target: sourcingRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax transform values
  const y1 = useTransform(heroProgress, [0, 1], ["-12%", "12%"]);
  // Rotate map image slightly on scroll
  const y2 = useTransform(mapProgress, [0, 1], [30, -30]);
  const rotateMap = useTransform(mapProgress, [0, 1], [-2, 2]);

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-stone-900 flex flex-col pt-24 overflow-x-hidden">
      <Navbar view="grid" onViewChange={() => {}} hideViewSwitcher={true} />

      <main className="flex-1">
        {/* Intro */}
        <section className="px-6 md:px-10 lg:px-20 pt-10 pb-20 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl mb-12">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="w-16 h-px bg-[#c8a47a] mb-8"
            />
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#c8a47a] uppercase tracking-widest text-sm font-bold mb-6 flex items-center gap-3"
            >
              Our Story
            </motion.p>
            <RevealText 
              text="Setting high standards in quality and range since 1992" 
              className="text-4xl md:text-5xl lg:text-7xl font-serif mb-8 leading-[1.15] text-stone-900"
            />
            <motion.p 
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg md:text-xl text-stone-600 font-light max-w-2xl leading-relaxed"
            >
              Cosmo Granites Private Limited primarily deals with the import and retail of Granites, Marble, Engineered marble, and Wooden flooring. We take immense pride in being one of the largest retailers for natural stone in the country.
            </motion.p>
          </div>
        </section>

        {/* First Image - Showroom (with Parallax & Advanced Hover) */}
        <section ref={heroRef} className="px-6 md:px-10 lg:px-20 pb-24 md:pb-40 max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-xl overflow-hidden shadow-2xl relative group"
          >
            {/* Image Container */}
            <motion.div className="w-full relative origin-center">
              <img 
                src={image1} 
                alt="Cosmo Flagship Show Gallery" 
                className="w-full h-auto block object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]" 
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition-colors duration-700" />
            </motion.div>

            {/* Floating Glass Card */}
            <motion.div 
              className="absolute bottom-4 left-4 right-4 md:bottom-12 md:left-12 md:right-auto bg-white/80 dark:bg-black/80 backdrop-blur-xl p-5 md:p-10 rounded-lg shadow-2xl md:max-w-md border border-white/40 transform transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-hover:bg-white/95"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <div className="w-8 h-8 rounded-full bg-[#c8a47a]/20 flex items-center justify-center mb-4">
                <div className="w-2 h-2 rounded-full bg-[#c8a47a]" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif mb-3 text-stone-900 leading-snug">Flagship Show Gallery</h3>
              <p className="text-sm md:text-base text-stone-500 font-light">Karapakkam (OMR) | 16,000 sq. metres for imported exclusive marble.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Global Sourcing - Asymmetrical Layout */}
        <section ref={sourcingRef} className="px-6 md:px-10 lg:px-20 py-24 md:py-32 bg-white rounded-t-[40px] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.05)] relative z-10">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
                hidden: {}
              }}
            >
              <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 }}} className="w-16 h-px bg-[#c8a47a] mb-8 origin-left" transition={{ duration: 1 }} />
              
              <motion.h2 
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl md:text-5xl font-serif mb-8 text-stone-900"
              >
                Global Sourcing
              </motion.h2>

              <motion.p 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8 }}
                className="text-lg text-stone-600 mb-6 leading-relaxed font-light"
              >
                With a constant endeavour to exceed expectations, we curate natural stone from the finest quarries worldwide. Quality and transparency have been the fundamental pillars on which we base our growth over the past three decades.
              </motion.p>

              <motion.p 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8 }}
                className="text-lg text-stone-600 leading-relaxed font-light mb-12"
              >
                We strive hard to maintain the trust of our esteemed clientele in all respects; be it providing appropriate solutions or dedicated after-sales support. We ensure that the aesthetic and functional outlook of your space is uncompromised.
              </motion.p>
              
              <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
                <Link to="/#collections" className="inline-flex items-center gap-3 text-stone-900 font-medium pb-1.5 border-b-2 border-stone-200 hover:border-[#c8a47a] hover:text-[#c8a47a] transition-all duration-300 group">
                  Explore our Collections
                  <ArrowRight size={18} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: y2, rotate: rotateMap }}
              initial={{ opacity: 0, x: 50, filter: "brightness(0.9) blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "brightness(1) blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="rounded-2xl shadow-xl relative group bg-[#f8f8f6] p-4 md:p-8 border border-stone-200"
            >
               {/* Decorative background blur inside the frame */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#c8a47a]/10 rounded-full blur-3xl group-hover:bg-[#c8a47a]/20 transition-colors duration-1000" />
               
               <img 
                 src={image2} 
                 alt="Global Sourcing Map" 
                 className="relative z-10 w-full h-auto block object-cover transform transition-transform duration-[1.5s] group-hover:scale-[1.02]" 
               />
            </motion.div>

          </div>
        </section>

        {/* Third Section - Stockyard & Innovations */}
        <section className="px-6 md:px-10 lg:px-20 py-24 md:py-32 bg-[#1a1a1a] text-white overflow-hidden relative">
          {/* Subtle animated background shapes */}
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" 
          />
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1]
            }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-[#c8a47a]/5 rounded-full blur-3xl pointer-events-none" 
          />

          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
            
            {/* Image (Takes 7 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 rounded-2xl overflow-hidden shadow-2xl relative order-2 lg:order-1 border border-white/10 group bg-stone-900"
            >
              <img src={image3} alt="Shozinganallur Stockyard" className="w-full h-auto block object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
              
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="w-12 h-px bg-[#c8a47a] mb-4" />
                <p className="text-[#c8a47a] font-medium tracking-widest text-xs mb-1 uppercase">Shozinganallur Yard</p>
                <p className="text-3xl md:text-5xl font-serif text-white">12,000 m²</p>
                <p className="text-white/60 font-light mt-2 text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">Our massive stockyard ensures we carry a breathtaking variety of granite ready for deployment.</p>
              </div>
            </motion.div>

            {/* Text (Takes 5 cols) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } },
                hidden: {}
              }}
              className="lg:col-span-5 order-1 lg:order-2"
            >
              <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 }}} className="text-3xl md:text-5xl font-serif mb-8 text-white leading-tight">
                Beyond Natural Stone
              </motion.h2>
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}
                className="space-y-8"
              >
                <p className="text-lg md:text-xl text-stone-300 font-light leading-relaxed">
                  We have recently added a ceramic and vitrified tiles division, enabling the customer to satisfy all their flooring needs under one roof.
                </p>
                <motion.div 
                  whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                  transition={{ duration: 0.3 }}
                  className="relative p-6 border-l-2 border-[#c8a47a] bg-white/5 rounded-r-xl backdrop-blur-sm cursor-default"
                >
                  <p className="text-base text-stone-200 font-light leading-relaxed italic">
                    "Furthermore, Cosmo is extremely proud to present an innovative and exclusive range of state of the art aluminium door and window solutions with a dedicated experience centre at Karapakkam."
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
