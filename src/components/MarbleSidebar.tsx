import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronRight } from "lucide-react";

export interface StoneDetail {
    id: string;
    name: string;
    image: string;
    category: string;
    finish: string;
    origin: string;
    description: string;
}

interface MarbleSidebarProps {
    stone: StoneDetail | null;
    onClose: () => void;
}

const MarbleSidebar = ({ stone, onClose }: MarbleSidebarProps) => {
    return (
        <AnimatePresence>
            {stone && (
                <>
                    {/* Dim backdrop */}
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Sidebar */}
                    <motion.aside
                        className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 flex flex-col shadow-2xl overflow-hidden"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 220 }}
                    >
                        {/* Hero image — sphere morphs into flat image */}
                        <motion.div
                            className="relative overflow-hidden shrink-0"
                            style={{ height: "52%" }}
                            initial={{ borderRadius: "50%", scale: 0.4, margin: "auto" }}
                            animate={{ borderRadius: "0%", scale: 1, margin: 0 }}
                            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <img
                                src={stone.image}
                                alt={stone.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:bg-white transition-colors shadow-sm"
                            >
                                <X size={18} />
                            </button>

                            {/* Category badge */}
                            <motion.div
                                className="absolute bottom-4 left-4"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <span className="text-[10px] uppercase tracking-[0.18em] font-medium bg-white/80 backdrop-blur-sm text-stone-600 px-3 py-1.5">
                                    {stone.category}
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            className="flex-1 overflow-y-auto px-8 py-7 flex flex-col gap-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.5 }}
                        >
                            <h2 className="font-serif text-4xl text-stone-900 leading-tight">
                                {stone.name}
                            </h2>

                            <p className="text-sm text-stone-500 leading-relaxed">
                                {stone.description}
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-stone-50 border border-stone-100 px-4 py-3">
                                    <p className="text-[10px] uppercase tracking-[0.15em] text-stone-400 mb-1">Finish</p>
                                    <p className="text-sm font-medium text-stone-700">{stone.finish}</p>
                                </div>
                                <div className="bg-stone-50 border border-stone-100 px-4 py-3">
                                    <p className="text-[10px] uppercase tracking-[0.15em] text-stone-400 mb-1">Origin</p>
                                    <p className="text-sm font-medium text-stone-700">{stone.origin}</p>
                                </div>
                            </div>

                            <a
                                href="#contact"
                                onClick={onClose}
                                className="mt-auto flex items-center justify-between px-6 py-4 bg-stone-900 text-white hover:bg-stone-800 transition-colors text-sm font-medium tracking-wide"
                            >
                                Request a Sample
                                <ChevronRight size={16} />
                            </a>
                        </motion.div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

export default MarbleSidebar;
