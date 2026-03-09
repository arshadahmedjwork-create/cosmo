import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Settings2, X } from "lucide-react";
import { StoneDetail, stonesData } from "@/data/stones";
import MarbleSidebar from "./MarbleSidebar";

function radiusFor(size: number) {
  if (size <= 130) return 14;
  if (size <= 180) return 18;
  if (size <= 230) return 20;
  return 22;
}

export const PATTERN_WIDTH = 5800; // Increased for much wider horizontal scattering
export const PATTERN_HEIGHT = 2200; // Increased for more vertical scattering space

// Spread out pattern - 14 columns, 5 rows (70 total)
const blocks = [
  // Row 1
  { x: 56, y: 83, size: 217 },
  { x: 620, y: 72, size: 201 },
  { x: 1021, y: 123, size: 225 },
  { x: 1337, y: 46, size: 174 },
  { x: 1833, y: 160, size: 213 },
  { x: 2235, y: 156, size: 215 },
  { x: 2610, y: 40, size: 215 },
  { x: 3041, y: 161, size: 162 },
  { x: 3501, y: 63, size: 228 },
  { x: 3833, y: 97, size: 155 },
  { x: 4283, y: 152, size: 208 },
  { x: 4746, y: 23, size: 201 },
  { x: 5038, y: 112, size: 166 },
  { x: 5586, y: 34, size: 171 },
  // Row 2
  { x: 35, y: 569, size: 193 },
  { x: 528, y: 482, size: 217 },
  { x: 945, y: 594, size: 238 },
  { x: 1402, y: 637, size: 188 },
  { x: 1833, y: 513, size: 151 },
  { x: 2257, y: 519, size: 203 },
  { x: 2558, y: 607, size: 237 },
  { x: 2995, y: 497, size: 189 },
  { x: 3429, y: 594, size: 237 },
  { x: 3851, y: 501, size: 180 },
  { x: 4315, y: 530, size: 221 },
  { x: 4727, y: 598, size: 200 },
  { x: 5082, y: 491, size: 167 },
  { x: 5474, y: 604, size: 202 },
  // Row 3
  { x: 101, y: 1021, size: 194 },
  { x: 454, y: 1046, size: 172 },
  { x: 946, y: 1043, size: 150 },
  { x: 1293, y: 998, size: 183 },
  { x: 1679, y: 990, size: 221 },
  { x: 2168, y: 1090, size: 218 },
  { x: 2578, y: 953, size: 231 },
  { x: 2939, y: 1090, size: 228 },
  { x: 3369, y: 962, size: 187 },
  { x: 3750, y: 1061, size: 176 },
  { x: 4328, y: 999, size: 179 },
  { x: 4750, y: 1012, size: 200 },
  { x: 5140, y: 983, size: 208 },
  { x: 5412, y: 986, size: 193 },
  // Row 4
  { x: 185, y: 1441, size: 199 },
  { x: 475, y: 1487, size: 148 },
  { x: 1006, y: 1425, size: 195 },
  { x: 1281, y: 1383, size: 175 },
  { x: 1746, y: 1379, size: 221 },
  { x: 2134, y: 1402, size: 219 },
  { x: 2615, y: 1445, size: 168 },
  { x: 3102, y: 1456, size: 193 },
  { x: 3409, y: 1373, size: 235 },
  { x: 3929, y: 1487, size: 217 },
  { x: 4267, y: 1413, size: 192 },
  { x: 4673, y: 1493, size: 214 },
  { x: 5167, y: 1455, size: 226 },
  { x: 5419, y: 1513, size: 145 },
  // Row 5
  { x: 176, y: 1965, size: 165 },
  { x: 465, y: 1955, size: 208 },
  { x: 1027, y: 1935, size: 196 },
  { x: 1365, y: 1909, size: 191 },
  { x: 1784, y: 1892, size: 195 },
  { x: 2131, y: 1932, size: 205 },
  { x: 2619, y: 1977, size: 165 },
  { x: 3082, y: 1960, size: 150 },
  { x: 3507, y: 1911, size: 160 },
  { x: 3915, y: 1897, size: 228 },
  { x: 4186, y: 1783, size: 163 },
  { x: 4703, y: 1838, size: 239 },
  { x: 5166, y: 1959, size: 146 },
  { x: 5412, y: 1785, size: 219 },
];

const MIN_ZOOM = 1.0;  // default view is min — can't zoom out below default
const MAX_ZOOM = 1.6;  // one click from default
const ZOOM_STEP = 0.6; // single step covers full range

const SwatchHero = () => {
  // ── Dimensions and Tiling
  const numRows = Math.ceil(stonesData.length / blocks.length);
  const totalHeight = PATTERN_HEIGHT * numRows;

  const [selectedStone, setSelectedStone] = useState<StoneDetail | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ── Zoom (Starts at maximum zoom as requested)
  const [zoomLevel, setZoomLevel] = useState(1.6);
  const zoomRef = useRef(1.6);
  zoomRef.current = zoomLevel;

  // ── Pan state (synced from drag)
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const panRef = useRef({ x: 0, y: 0 });

  // ── Drag refs (no state for perf — directly update DOM during drag)
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ mx: 0, my: 0, panX: 0, panY: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // ── Cursor label state
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredStone, setHoveredStone] = useState<StoneDetail | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Load at MAX_ZOOM immediately
  useEffect(() => {
    setZoomLevel(1.6);
  }, []);

  // Zoom handlers
  const zoomIn = () => setZoomLevel(z => Math.min(+(z + ZOOM_STEP).toFixed(2), MAX_ZOOM));
  const zoomOut = () => {
    const next = Math.max(+(zoomLevel - ZOOM_STEP).toFixed(2), MIN_ZOOM);
    setZoomLevel(next);
  };

  // ── Drag-to-pan handlers (direct DOM mutation — no re-renders during drag)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Zoom requirement removed so users can pan immediately across the large canvas
    if ((e.target as HTMLElement).closest('button,a')) return;
    isDraggingRef.current = true;
    dragStartRef.current = { mx: e.clientX, my: e.clientY, panX: panRef.current.x, panY: panRef.current.y };
    if (canvasRef.current) {
      canvasRef.current.style.transition = 'none';
      canvasRef.current.style.cursor = 'grabbing';
    }
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.mx;
    const dy = e.clientY - dragStartRef.current.my;

    // Calculate raw new position
    let newX = dragStartRef.current.panX + dx;
    let newY = dragStartRef.current.panY + dy;

    // Get actual dimensions
    const winW = sectionRef.current?.clientWidth || window.innerWidth;
    const winH = sectionRef.current?.clientHeight || window.innerHeight;

    // Canvas dimensions (5800px width, totalHeight accounts for multiple rows)
    const baseW = window.innerWidth >= 768 ? 5800 : 3800;
    const baseH = totalHeight;
    const s = zoomRef.current;

    // Strict stone boundaries from 106 stones across multiple rows
    const minX = 35 * (baseW / 5800) * s;
    const maxX = 5757 * (baseW / 5800) * s;
    const minY = 23 * s;
    const maxY = (totalHeight - 70) * s;

    const halfW = (baseW * s) / 2;
    const halfH = (baseH * s) / 2;

    // x-pan: ensures viewport never drifts beyond the outermost stones
    const xMax = halfW - minX - (winW / 2);
    const xMin = (winW / 2) + halfW - maxX;

    // y-pan: accounts for total multi-row height
    const yMax = halfH - minY - (winH / 2);
    const yMin = (winH / 2) + halfH - maxY;

    // Final strict clamp
    newX = Math.max(xMin, Math.min(xMax, newX));
    newY = Math.max(yMin, Math.min(yMax, newY));

    panRef.current = { x: newX, y: newY };
    if (canvasRef.current) {
      canvasRef.current.style.transform =
        `translate(${newX}px, ${newY}px) scale(${zoomRef.current})`;
    }
  }, [totalHeight]);

  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    // Sync DOM position back to React state
    setPanX(panRef.current.x);
    setPanY(panRef.current.y);
    if (canvasRef.current) {
      canvasRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      canvasRef.current.style.cursor = '';
    }
  }, []);

  // Sync panX/panY state → DOM when zoom changes (smooth transition)
  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.style.transition = 'transform 1.4s cubic-bezier(0.16,1,0.3,1)';
    canvasRef.current.style.transform =
      `translate(${panRef.current.x}px, ${panRef.current.y}px) scale(${zoomLevel})`;
  }, [zoomLevel]);

  // Categories for filter
  const categories = ["All", ...Array.from(new Set(stonesData.map(s => s.category)))];
  const toPct = (val: number, max: number) => `${(val / max) * 100}%`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden select-none pt-24 pb-16"
      style={{
        background: "#efefec",
        cursor: "grab", // Always grabbable so panning the large canvas is obvious
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* ── Cursor-following stone name label ─────────────────────── */}
      <AnimatePresence>
        {hoveredStone && (
          <motion.div
            key="cursor-label"
            className="fixed pointer-events-none z-[100]"
            style={{ left: cursorPos.x + 18, top: cursorPos.y - 14 }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <span
              className="flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium tracking-wide text-white"
              style={{
                background: "rgba(30,20,10,0.82)",
                backdropFilter: "blur(6px)",
                borderRadius: 3,
                whiteSpace: "nowrap",
                letterSpacing: "0.03em",
              }}
            >
              <span className="text-white/60 mr-0.5">+</span>
              {hoveredStone.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex w-full items-center justify-center min-h-full">
        {/* Zoom + pan wrapper — controlled directly via canvasRef for performance */}
        <div
          ref={canvasRef}
          style={{
            transform: `translate(${panX}px, ${panY}px) scale(${zoomLevel})`,
            transformOrigin: "center center",
            transition: "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            willChange: "transform",
          }}
        >
          {/* Container maintaining the dynamically tiled aspect ratio - Now hugely expanded */}
          <div
            className="relative w-[3800px] md:w-[5800px] mx-auto"
            style={{ aspectRatio: `${PATTERN_WIDTH} / ${totalHeight}` }}
          >
            {stonesData.map((stone, i) => {
              const b = blocks[i % blocks.length];
              const rowOffset = Math.floor(i / blocks.length) * PATTERN_HEIGHT;
              const isFilteredOut = activeCategory !== "All" && stone.category !== activeCategory;
              const isSelected = selectedStone?.id === stone.id;

              const stoneVariants = {
                hidden: { scale: 0.3, opacity: 0 },
                visible: {
                  scale: isSelected ? 1.05 : 1,
                  opacity: isFilteredOut ? 0.15 : 1,
                  y: isSelected ? -5 : 0,
                  filter: isFilteredOut ? "grayscale(100%) blur(2px)" : "grayscale(0%) blur(0px)",
                  zIndex: isSelected ? 20 : 1
                },
                hover: {
                  scale: 1.02,
                  y: -5,
                  boxShadow: "12px 12px 28px rgba(0,0,0,0.60), 20px 20px 40px rgba(0,0,0,0.30)",
                  zIndex: 10
                }
              };

              return (
                <motion.div
                  key={i}
                  className="absolute overflow-hidden cursor-pointer"
                  variants={stoneVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  whileHover="hover"
                  onClick={() => setSelectedStone(stone)}
                  onMouseEnter={() => setHoveredStone(stone)}
                  onMouseLeave={() => setHoveredStone(null)}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.005,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  style={{
                    left: toPct(b.x, PATTERN_WIDTH),
                    top: toPct(b.y + rowOffset, totalHeight),
                    width: toPct(b.size, PATTERN_WIDTH),
                    height: toPct(b.size, totalHeight),
                    borderRadius: `${radiusFor(b.size)}px`,
                    // Brighter high-opacity white border
                    border: isSelected ? "none" : "2px solid rgba(255, 255, 255, 0.82)",
                    // Enhanced elevation glow + directional shadow + inner glow
                    boxShadow: isSelected
                      ? "12px 12px 28px rgba(0,0,0,0.60), 20px 20px 40px rgba(0,0,0,0.30), 0 0 0 3px #c8a47a"
                      : "6px 6px 14px rgba(0,0,0,0.40), 0 0 20px rgba(255,255,255,0.22), inset 0 0 15px rgba(255,255,255,0.12)",
                    pointerEvents: isFilteredOut ? "none" : "auto",
                    willChange: "transform",
                  }}
                >
                  {/* Stone image */}
                  <motion.img
                    src={stone.image}
                    alt={stone.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Enhanced glass sheen overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.00) 50%, rgba(255,255,255,0.05) 100%)",
                      pointerEvents: "none",
                      borderRadius: "inherit",
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom Center Controls (Palmer-style expandable menu) ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">

        {/* ── Left group: menu toggle ─────────────────────────────── */}
        <div className="flex items-center">
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              /* OPEN STATE ─ X + nav links */
              <motion.div
                key="menu-open"
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {/* X close button */}
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-[#252525] text-white hover:bg-[#111] transition-colors shadow-sm"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  aria-label="Close menu"
                >
                  <X size={15} />
                </motion.button>

                {/* Nav items with stagger */}
                {[
                  { label: "collections", href: "#collections", dot: true },
                  { label: "about", href: "#about", dot: false },
                  { label: "contact", href: "#contact", dot: false },
                ].map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-[#252525] text-white text-[13px] font-medium tracking-wide hover:bg-[#1a1a1a] transition-colors rounded-sm shadow-sm whitespace-nowrap"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.075, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.dot && (
                      <span className="text-[#c8a47a] font-bold leading-none">•</span>
                    )}
                    {item.label}
                  </motion.a>
                ))}
              </motion.div>
            ) : (
              /* CLOSED STATE ─ ≡ icon  +  menu text  (two separate adjacent buttons) */
              <motion.div
                key="menu-closed"
                className="flex items-center gap-0"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Hamburger icon — square dark button */}
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="flex items-center justify-center w-11 h-11 bg-[#252525] text-white hover:bg-[#1a1a1a] transition-colors rounded-sm shadow-sm"
                  aria-label="Open menu"
                >
                  <Menu size={15} />
                </button>
                {/* Spacer — 2px gap between the two */}
                <div className="w-[2px]" />
                {/* 'menu' text — separate dark button */}
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="h-11 px-5 bg-[#252525] text-white text-[13px] font-medium tracking-wide hover:bg-[#1a1a1a] transition-colors rounded-sm shadow-sm whitespace-nowrap"
                >
                  menu
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Right group: filter icon + filter text (two separate adjacent buttons) ── */}
        <div className="relative flex items-center gap-0">
          {/* Filter icon — separate outlined button */}
          <button
            onClick={() => { setIsFilterOpen(!isFilterOpen); setIsMenuOpen(false); }}
            className="flex items-center justify-center w-11 h-11 bg-white text-[#252525] hover:bg-stone-50 transition-colors border border-stone-200 rounded-sm shadow-sm"
            aria-label="Toggle filter"
          >
            <Settings2 size={15} />
          </button>
          {/* 2px gap */}
          <div className="w-[2px]" />
          {/* 'filter' text — separate outlined button */}
          <button
            onClick={() => { setIsFilterOpen(!isFilterOpen); setIsMenuOpen(false); }}
            className="h-11 px-5 bg-white text-[#252525] text-[13px] font-medium tracking-wide hover:bg-stone-50 transition-colors border border-stone-200 border-l-0 rounded-sm shadow-sm whitespace-nowrap"
          >
            {activeCategory === "All" ? "filter" : activeCategory}
          </button>

          {/* Filter Dropdown */}
          <motion.div
            initial={false}
            animate={{
              opacity: isFilterOpen ? 1 : 0,
              y: isFilterOpen ? -8 : 0,
              pointerEvents: isFilterOpen ? "auto" : "none"
            }}
            className="absolute bottom-full right-0 mb-2 min-w-[220px] bg-white border border-stone-100 shadow-xl rounded-md py-2 overflow-hidden"
          >
            <div className="px-4 py-2 mt-1 mb-1 text-[11px] font-bold text-stone-400 tracking-widest uppercase flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
              Stone Category
            </div>
            <div className="flex flex-col">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left pl-8 pr-4 py-2 text-sm transition-colors ${activeCategory === cat
                    ? "bg-stone-900 text-white font-medium"
                    : "text-stone-600 hover:bg-stone-50"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Zoom controls — bottom right (Palmer style) ────────────── */}
      <div className="fixed bottom-8 right-8 z-20 flex items-center gap-4">
        <span className="text-[12px] text-stone-400 tracking-wide hidden sm:block select-none">
          ✦ Drag to explore
        </span>
        <div className="flex items-center gap-2">
          {/* − button: white circle, turns dark on press */}
          <button
            onClick={zoomOut}
            disabled={zoomLevel <= MIN_ZOOM}
            aria-label="Zoom out"
            className="w-12 h-12 flex items-center justify-center rounded-full border border-stone-300 bg-white text-stone-600 text-xl font-light transition-all duration-150 hover:border-stone-400 active:bg-[#252525] active:text-white active:border-[#252525] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            −
          </button>
          {/* + button: white circle, turns dark on press */}
          <button
            onClick={zoomIn}
            disabled={zoomLevel >= MAX_ZOOM}
            aria-label="Zoom in"
            className="w-12 h-12 flex items-center justify-center rounded-full border border-stone-300 bg-white text-stone-600 text-xl font-light transition-all duration-150 hover:border-stone-400 active:bg-[#252525] active:text-white active:border-[#252525] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      <MarbleSidebar stone={selectedStone} onClose={() => setSelectedStone(null)} />
    </section>
  );
};

export default SwatchHero;
