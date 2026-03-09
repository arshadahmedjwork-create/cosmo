
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { StoneDetail, stonesData } from "@/data/stones";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const StoneGrid = () => {
    const navigate = useNavigate();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Derive a dummy product count based on id length to match reference image style
    const getProductCount = (id: string) => {
        return (id.length % 5) + 3;
    };

    return (
        <section className="bg-[#f5f5f0] min-h-screen pt-32 pb-20 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stonesData.map((stone) => (
                        <motion.div
                            key={stone.id}
                            className="group relative flex flex-col"
                            onMouseEnter={() => setHoveredId(stone.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Card Thumbnail */}
                            <div className="relative aspect-square overflow-hidden rounded-xl bg-[#efefec] border border-stone-200/60 shadow-sm transition-shadow duration-500 group-hover:shadow-xl">
                                {/* Brain Icon (Top Left - matching reference) */}
                                <div className="absolute top-4 left-4 z-10 w-8 h-8 bg-[#2d3345] rounded-md flex items-center justify-center">
                                    <div className="w-4 h-4 text-white/90">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                    </div>
                                </div>

                                {/* Explore Option (Top Right - appears on hover) */}
                                <AnimatePresence>
                                    {hoveredId === stone.id && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.9, x: 10 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, x: 10 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/collection/${stone.id}`);
                                            }}
                                            className="absolute top-4 right-4 z-20 flex items-center gap-0 bg-[#252525] text-white rounded-md overflow-hidden shadow-lg"
                                        >
                                            <span className="px-4 py-2 text-[13px] font-medium tracking-wide border-r border-white/10 hover:bg-[#1a1a1a] transition-colors">
                                                explore
                                            </span>
                                            <div className="px-3 py-2 hover:bg-[#1a1a1a] transition-colors">
                                                <ArrowRight size={14} />
                                            </div>
                                        </motion.button>
                                    )}
                                </AnimatePresence>

                                {/* Stone Image */}
                                <motion.img
                                    src={stone.image}
                                    alt={stone.name}
                                    className="w-full h-full object-cover p-12 drop-shadow-2xl"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                />

                                {/* Name Badge (Floating near center right as in reference) */}
                                <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-[#1e140a]/80 backdrop-blur-md rounded-sm text-white text-[13px] font-medium tracking-wide shadow-lg">
                                    <Plus size={14} className="text-white/60" />
                                    {stone.name}
                                </div>

                                {/* Drag hint (Bottom Right) */}
                                <div className="absolute bottom-4 right-4 text-[11px] text-stone-400 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="flex items-center gap-0.5">
                                        <ArrowRight size={10} className="rotate-180" />
                                        <ArrowRight size={10} />
                                    </span>
                                    Drag for more
                                </div>
                            </div>

                            {/* Bottom Info - Name and Product Count */}
                            <div className="mt-4 flex items-center justify-between px-1">
                                <h3 className="text-[15px] font-medium text-stone-900 tracking-tight">
                                    {stone.name}
                                </h3>
                                <p className="text-[13px] text-stone-500 font-normal">
                                    {getProductCount(stone.id)} Products
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StoneGrid;
