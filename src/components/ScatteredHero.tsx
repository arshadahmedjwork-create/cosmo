import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Settings2, X } from "lucide-react";
import { StoneDetail, stonesData } from "@/data/stones";
import MarbleSidebar from "./MarbleSidebar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function radiusFor(size: number) {
  if (size <= 200) return 16;
  if (size <= 280) return 18;
  if (size <= 340) return 20;
  return 22;
}

export const PATTERN_WIDTH = 5800;
export const PATTERN_HEIGHT = 5400; // Taller canvas to fit alternating big/small granite tiles

// ── Virtual Grid Layout Generation ──
// Divide the canvas into a grid with enough cells for all stones.
const MIN_DISTANCE = 350; // Increased spacing

function generateScatteredLayout(numStones: number) {
  const generatedBlocks: { x: number; y: number; size: number; }[] = [];

  // Collage-style: 3 size tiers randomly assigned for an organic mix
  // ~30% big, ~40% medium, ~30% small
  const SIZE_TIERS = [
    { min: 420, max: 500 },  // BIG
    { min: 300, max: 360 },  // MEDIUM
    { min: 280, max: 340 },  // SMALL
  ];

  // Pre-assign random tiers using seeded shuffle for consistent collage feel
  const tierAssignments: number[] = [];
  for (let i = 0; i < numStones; i++) {
    const roll = Math.random();
    if (roll < 0.30) tierAssignments.push(0);       // big
    else if (roll < 0.70) tierAssignments.push(1);   // medium
    else tierAssignments.push(2);                     // small
  }

  // Compute grid dimensions to closely match numStones
  const cols = 10;
  const rows = Math.ceil(numStones / cols);
  const zoneWidth = PATTERN_WIDTH / cols;
  const zoneHeight = PATTERN_HEIGHT / rows;

  // Simple collision detection
  const isOverlapping = (x: number, y: number, size: number) => {
    return generatedBlocks.some(block => {
      const dx = block.x + block.size / 2 - (x + size / 2);
      const dy = block.y + block.size / 2 - (y + size / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < (block.size / 2 + size / 2 + MIN_DISTANCE);
    });
  };

  for (let i = 0; i < numStones; i++) {
    let placed = false;
    let attempts = 0;

    // Each stone gets its own zone cell
    const targetZoneX = i % cols;
    const targetZoneY = Math.floor(i / cols);

    // Pick size from the randomly assigned tier
    const tier = SIZE_TIERS[tierAssignments[i]];

    while (!placed && attempts < 150) {
      attempts++;

      const size = Math.floor(Math.random() * (tier.max - tier.min + 1)) + tier.min;

      // Place within zone with small random jitter for organic feel
      // Increased padding inside zones to force larger separation
      const padding = 60;
      const x = targetZoneX * zoneWidth + padding + Math.random() * Math.max(0, zoneWidth - size - padding * 2);
      const y = targetZoneY * zoneHeight + padding + Math.random() * Math.max(0, zoneHeight - size - padding * 2);

      if (x >= 0 && y >= 0 && !isOverlapping(x, y, size)) {
        generatedBlocks.push({ x, y, size });
        placed = true;
      }
    }

    // Fallback — center in zone with medium size
    if (!placed) {
      const fallbackSize = (tier.min + tier.max) / 2;
      generatedBlocks.push({
        x: targetZoneX * zoneWidth + (zoneWidth - fallbackSize) / 2,
        y: targetZoneY * zoneHeight + (zoneHeight - fallbackSize) / 2,
        size: fallbackSize
      });
    }
  }

  // Shuffle for organic stagger order
  for (let i = generatedBlocks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [generatedBlocks[i], generatedBlocks[j]] = [generatedBlocks[j], generatedBlocks[i]];
  }

  return generatedBlocks;
}
// Generate blocks to match the exact number of stones
const blocks = generateScatteredLayout(stonesData.length);

const MIN_ZOOM = 1.0;  // default view is min — can't zoom out below default
const MAX_ZOOM = 1.6;  // one click from default
const ZOOM_STEP = 0.6; // single step covers full range

const SwatchHero = () => {
  // ── Dimensions — blocks are 1:1 with stonesData, single layer
  const totalHeight = PATTERN_HEIGHT;

  const [selectedStone, setSelectedStone] = useState<StoneDetail | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ── Zoom (Starts at maximum zoom as requested)
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const zoomRef = useRef(1.0);
  zoomRef.current = zoomLevel;

  // ── Pan state (synced from drag)
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const panRef = useRef({ x: 0, y: 0 });

  // ── Drag refs (no state for perf — directly update DOM during drag)
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ mx: 0, my: 0, panX: 0, panY: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const zoomContainerRef = useRef<HTMLDivElement>(null);

  // ── Cursor label state
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredStone, setHoveredStone] = useState<StoneDetail | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Zoom level starts at 1.0 so all tiles are visible during pop-in
  // GSAP will handle the cinematic zoom after tiles finish animating

  // Zoom handlers
  const zoomIn = () => setZoomLevel(z => Math.min(+(z + ZOOM_STEP).toFixed(2), MAX_ZOOM));
  const zoomOut = () => {
    const next = Math.max(+(zoomLevel - ZOOM_STEP).toFixed(2), MIN_ZOOM);
    setZoomLevel(next);
  };

  // ── Drag-to-Pop Visibility Check ──
  const checkVisibility = useCallback(() => {
    if (!canvasRef.current || !sectionRef.current) return;

    const allTiles = canvasRef.current.querySelectorAll('.granite-tile');
    if (allTiles.length === 0) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const threshold = 150;
    const viewTop = sectionRect.top - threshold;
    const viewBottom = sectionRect.bottom + threshold;
    const viewLeft = sectionRect.left - threshold;
    const viewRight = sectionRect.right + threshold;

    const newlyVisibleTiles: HTMLElement[] = [];
    const newlyHiddenTiles: HTMLElement[] = [];

    allTiles.forEach((tile) => {
      const htmlTile = tile as HTMLElement;
      const rect = htmlTile.getBoundingClientRect();
      const isVisible = (
        rect.top < viewBottom &&
        rect.bottom > viewTop &&
        rect.left < viewRight &&
        rect.right > viewLeft
      );

      const isPopped = htmlTile.getAttribute("data-popped") === "true";

      if (isVisible && !isPopped) {
        newlyVisibleTiles.push(htmlTile);
        htmlTile.setAttribute("data-popped", "true");
      } else if (!isVisible && isPopped) {
        newlyHiddenTiles.push(htmlTile);
        htmlTile.setAttribute("data-popped", "false");
      }
    });

    if (newlyHiddenTiles.length > 0) {
      gsap.to(newlyHiddenTiles, {
        scale: 0,
        opacity: 0,
        y: 40,
        duration: 0.3,
        ease: "power2.in"
      });
    }

    if (newlyVisibleTiles.length > 0) {
      // Animate them all in with a nice stagger
      gsap.to(newlyVisibleTiles, {
        scale: isDraggingRef.current ? 1.05 : 1, // Stay slightly popped if still dragging
        opacity: 1,
        y: isDraggingRef.current ? -12 : 0,
        duration: 0.8, // Slowed down from 0.4
        stagger: {
          each: 0.08, // Slowed down stagger from 0.02
          from: "random"
        },
        ease: "back.out(1.4)" // Softened the back-out ease
      });
    }
  }, []);

  // ── GSAP Animation Sequence ──
  useGSAP(() => {
    if (!sectionRef.current || !canvasRef.current) return;

    // Select all granite tiles
    const allTiles = gsap.utils.toArray(".granite-tile") as HTMLElement[];
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const threshold = 100;

    const viewTop = sectionRect.top - threshold;
    const viewBottom = sectionRect.bottom + threshold;
    const viewLeft = sectionRect.left - threshold;
    const viewRight = sectionRect.right + threshold;

    const visibleTiles: HTMLElement[] = [];

    allTiles.forEach((tile) => {
      const rect = tile.getBoundingClientRect();
      const isVisible = (
        rect.top < viewBottom &&
        rect.bottom > viewTop &&
        rect.left < viewRight &&
        rect.right > viewLeft
      );

      if (isVisible) {
        visibleTiles.push(tile);
        tile.setAttribute("data-popped", "true");
      } else {
        // Hide off-screen tiles initially
        gsap.set(tile, { scale: 0, opacity: 0, y: 40 });
      }
    });

    // Create a timeline
    const tl = gsap.timeline({
      defaults: { ease: "back.out(1.7)" }
    });

    // 1. Staggered pop-in for initially visible tiles ONLY
    tl.fromTo(
      visibleTiles,
      {
        scale: 0,
        opacity: 0,
        y: 40
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: {
          each: 0.04,
          from: "random"
        }
      }
    )
      // 2. After initial tiles are done, zoom the entire canvas in
      .to(
        canvasRef.current,
        {
          scale: 1.5,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            // Sync React zoom state after GSAP zoom finishes
            setZoomLevel(1.5);
            zoomRef.current = 1.5;
            checkVisibility(); // Final check after zoom completes
          }
        }
      );
  }, { scope: sectionRef });

  const rafRef = useRef<number | null>(null);

  // ── Drag-to-pan handlers (direct DOM mutation — no re-renders during drag)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button,a')) return;
    isDraggingRef.current = true;
    dragStartRef.current = { mx: e.clientX, my: e.clientY, panX: panRef.current.x, panY: panRef.current.y };
    if (canvasRef.current) {
      canvasRef.current.style.transition = 'none';
      canvasRef.current.style.cursor = 'grabbing';

      // Interactive pop: slightly scale up and lift all currently popped tiles
      gsap.to('.granite-tile[data-popped="true"]', {
        scale: 1.05,
        y: -12,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
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

    // Canvas dimensions
    const baseW = window.innerWidth >= 768 ? 5800 : 3800;
    const baseH = totalHeight;
    const s = zoomRef.current;

    const minX = 35 * (baseW / 5800) * s;
    const maxX = 5757 * (baseW / 5800) * s;
    const minY = 23 * s;
    const maxY = (totalHeight - 70) * s;

    const halfW = (baseW * s) / 2;
    const halfH = (baseH * s) / 2;

    const xMax = halfW - minX - (winW / 2);
    const xMin = (winW / 2) + halfW - maxX;

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

    // Throttled visibility check during drag
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      checkVisibility();
    });
  }, [totalHeight, checkVisibility]);

  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    // Sync DOM position back to React state
    setPanX(panRef.current.x);
    setPanY(panRef.current.y);
    if (canvasRef.current) {
      canvasRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      canvasRef.current.style.cursor = '';

      // Reset the interactive pop back to normal
      gsap.to('.granite-tile[data-popped="true"]', {
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.5)",
        overwrite: "auto"
      });
    }
    checkVisibility(); // Final check
  }, [checkVisibility]);

  // Sync panX/panY state → DOM when zoom changes (smooth transition)
  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.style.transition = 'transform 1.4s cubic-bezier(0.16,1,0.3,1)';
    canvasRef.current.style.transform =
      `translate(${panRef.current.x}px, ${panRef.current.y}px) scale(${zoomLevel})`;

    // Because the zoom takes 1.4s, make sure we run check at the end to catch any new tiles
    const to = setTimeout(() => {
      checkVisibility();
    }, 1400);
    return () => clearTimeout(to);
  }, [zoomLevel, checkVisibility]);

  // Categories for filter
  const categories = ["All", ...Array.from(new Set(stonesData.map(s => s.category)))];
  const toPct = (val: number, max: number) => `${(val / max) * 100}%`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden select-none pt-24 pb-16"
      style={{
        background: "#efefec",
        cursor: "grab",
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
            ref={zoomContainerRef}
            className="relative w-[3800px] md:w-[5800px] mx-auto"
            style={{ aspectRatio: `${PATTERN_WIDTH} / ${totalHeight}` }}
          >
            {stonesData.map((stone, i) => {
              const b = blocks[i];
              if (!b) return null;
              const isFilteredOut = activeCategory !== "All" && stone.category !== activeCategory;
              const isSelected = selectedStone?.id === stone.id;

              return (
                <div
                  key={i}
                  className="absolute overflow-hidden cursor-pointer granite-tile"
                  onClick={() => setSelectedStone(stone)}
                  onMouseEnter={() => setHoveredStone(stone)}
                  onMouseLeave={() => setHoveredStone(null)}
                  style={{
                    left: toPct(b.x, PATTERN_WIDTH),
                    top: toPct(b.y, totalHeight),
                    width: toPct(b.size, PATTERN_WIDTH),
                    height: toPct(b.size, totalHeight),
                    borderRadius: `${radiusFor(b.size)}px`,
                    border: isSelected ? "none" : "1px solid rgba(200, 200, 200, 0.25)",
                    // Neomorphism: dark/black shadow on bottom-right only
                    boxShadow: isSelected
                      ? "10px 10px 20px rgba(0,0,0,0.70), 14px 14px 35px rgba(0,0,0,0.45), 0 0 0 3px #c8a47a"
                      : "8px 8px 16px rgba(0,0,0,0.55), 12px 12px 30px rgba(0,0,0,0.35)",
                    pointerEvents: isFilteredOut ? "none" : "auto",
                    willChange: "transform, opacity", // Added opacity for GSAP optimization
                    // Apply filter directly based on state
                    filter: isFilteredOut ? "grayscale(100%) blur(2px)" : "grayscale(0%) blur(0px)",
                    opacity: isFilteredOut ? 0.15 : 1, // GSAP will overwrite this initially but it's good for filter state later
                    zIndex: isSelected ? 20 : 1,
                    // hover effects will be handled by CSS or event listeners if needed, for now focusing on intro animation
                  }}
                >
                  {/* Stone image */}
                  <img
                    src={stone.image}
                    alt={stone.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
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
                </div>
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
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  aria-label="Close menu"
                >
                  <X size={15} />
                </motion.button>

                {/* Nav items with stagger */}
                {[
                  { label: "collections", href: "#collections", dot: true },
                  { label: "about", href: "/about", dot: false },
                  { label: "contact", href: "/contact", dot: false },
                ].map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-[#252525] text-white text-[13px] font-medium tracking-wide hover:bg-[#1a1a1a] transition-colors rounded-sm shadow-sm whitespace-nowrap"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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
                className="flex items-center gap-0 origin-bottom-left"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Hamburger icon — square dark button */}
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="flex items-center justify-center w-11 h-11 bg-[#252525] text-white hover:bg-[#1a1a1a] transition-colors rounded-l-sm shadow-sm"
                  aria-label="Open menu"
                >
                  <Menu size={15} />
                </button>
                {/* Spacer — 2px gap between the two */}
                <div className="w-[2px]" />
                {/* 'menu' text — separate dark button */}
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="h-11 px-5 bg-[#252525] text-white text-[13px] font-medium tracking-wide hover:bg-[#1a1a1a] transition-colors rounded-r-sm shadow-sm whitespace-nowrap"
                >
                  menu
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Right group: filter icon + filter text (two separate adjacent buttons) ── */}
        <div className="relative flex items-center gap-0 hover:scale-105 active:scale-95 transition-all duration-300 origin-bottom-right">
          {/* Filter icon — separate outlined button */}
          <button
            onClick={() => { setIsFilterOpen(!isFilterOpen); setIsMenuOpen(false); }}
            className="flex items-center justify-center w-11 h-11 bg-white text-[#252525] hover:bg-stone-50 hover:shadow-md transition-all border border-stone-200 rounded-l-sm shadow-sm"
            aria-label="Toggle filter"
          >
            <Settings2 size={15} />
          </button>
          {/* 2px gap */}
          <div className="w-[2px]" />
          {/* 'filter' text — separate outlined button */}
          <button
            onClick={() => { setIsFilterOpen(!isFilterOpen); setIsMenuOpen(false); }}
            className="h-11 px-5 bg-white text-[#252525] text-[13px] font-medium tracking-wide hover:bg-stone-50 hover:shadow-md transition-all border border-stone-200 border-l-0 rounded-r-sm shadow-sm whitespace-nowrap"
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

      {/* ── Zoom controls — bottom right ────────────── */}
      <div className="fixed bottom-8 right-8 z-20 flex items-center gap-5">
        {/* Drag to explore label with crosshair icon */}
        <span className="flex items-center gap-2 text-[13px] text-stone-400 tracking-wide hidden sm:flex select-none">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="1" x2="8" y2="5" />
            <line x1="8" y1="11" x2="8" y2="15" />
            <line x1="1" y1="8" x2="5" y2="8" />
            <line x1="11" y1="8" x2="15" y2="8" />
            <circle cx="8" cy="8" r="2" />
          </svg>
          Drag to explore
        </span>

        {/* − and + buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={zoomLevel <= MIN_ZOOM}
            aria-label="Zoom out"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-stone-300 bg-[#f5f5f2] text-stone-500 text-lg font-light transition-all duration-300 hover:scale-110 hover:shadow-md hover:border-stone-400 hover:bg-white active:scale-95 active:bg-[#252525] active:text-white active:border-[#252525] disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed"
          >
            −
          </button>
          <button
            onClick={zoomIn}
            disabled={zoomLevel >= MAX_ZOOM}
            aria-label="Zoom in"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-stone-300 bg-[#f5f5f2] text-stone-500 text-lg font-light transition-all duration-300 hover:scale-110 hover:shadow-md hover:border-stone-400 hover:bg-white active:scale-95 active:bg-[#252525] active:text-white active:border-[#252525] disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed"
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
