import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import cosmoLogo from "@/assets/cosmo-logo.png";
import TextureSphere from "./TextureSphere";

// 7-dot Hexagon Icon for Mobile View Switcher (matches Palmer reference)
const HexagonGridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="12" cy="5.5" r="1.8" />
    <circle cx="12" cy="18.5" r="1.8" />
    <circle cx="17.6" cy="8.75" r="1.8" />
    <circle cx="17.6" cy="15.25" r="1.8" />
    <circle cx="6.4" cy="8.75" r="1.8" />
    <circle cx="6.4" cy="15.25" r="1.8" />
  </svg>
);

interface NavbarProps {
  view: "experience" | "grid";
  onViewChange: (view: "experience" | "grid") => void;
  hideViewSwitcher?: boolean;
  animationComplete?: boolean;
}

const Navbar = ({ view, onViewChange, hideViewSwitcher = false, animationComplete = true }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Collections", href: "/#collections" },
    { label: "Materials", href: "/#materials" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
        ? "bg-background/95 backdrop-blur-md"
        : "bg-transparent pointer-events-none"
        }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 h-16 md:h-20 pointer-events-auto">
        <Link to="/" className="shrink-0 z-[110] flex items-center gap-4">
          <img
            src={cosmoLogo}
            alt="Cosmo Stone"
            className="h-10 md:h-[50px] w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          />
        </Link>

        {/* --- Desktop Center Toggle - View Switcher --- */}
        {!hideViewSwitcher && (
          <motion.div
            className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={animationComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={() => onViewChange(view === "experience" ? "grid" : "experience")}
              className="group flex items-center bg-[#fdfdfc] border border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg text-stone-800 transition-all duration-300 active:scale-95 h-[42px] overflow-hidden"
              aria-label="Toggle View"
            >
              <div className="w-[42px] h-full flex shrink-0 items-center justify-center bg-[#fdfdfc] z-10 transition-colors">
                {/* Default Icon */}
                <span className="block group-hover:hidden">
                  {view === "experience" ? (
                    <HexagonGridIcon />
                  ) : (
                    <div className="grid grid-cols-2 gap-[2px] w-[15px] h-[15px]">
                      <div className="w-full h-full rounded-[1.5px] border-[1.5px] border-current"></div>
                      <div className="w-full h-full rounded-[1.5px] border-[1.5px] border-current"></div>
                      <div className="w-full h-full rounded-[1.5px] border-[1.5px] border-current"></div>
                      <div className="w-full h-full rounded-[1.5px] border-[1.5px] border-current"></div>
                    </div>
                  )}
                </span>
                {/* Hover Icon */}
                <span className="hidden group-hover:block">
                  {view === "experience" ? (
                    <div className="grid grid-cols-2 gap-[2px] w-[15px] h-[15px]">
                      <div className="w-full h-full rounded-[1.5px] border-[1.5px] border-current"></div>
                      <div className="w-full h-full rounded-[1.5px] border-[1.5px] border-current"></div>
                      <div className="w-full h-full rounded-[1.5px] border-[1.5px] border-current"></div>
                      <div className="w-full h-full rounded-[1.5px] border-[1.5px] border-current"></div>
                    </div>
                  ) : (
                    <HexagonGridIcon />
                  )}
                </span>
              </div>
              <div className="h-full border-l border-stone-200/80 bg-stone-50/50 flex items-center px-4 w-[130px] justify-center transition-colors">
                <span className="text-[13px] font-medium tracking-wide whitespace-nowrap block group-hover:hidden">
                  {view === "experience" ? "experience view" : "grid view"}
                </span>
                <span className="text-[13px] font-medium tracking-wide whitespace-nowrap hidden group-hover:block">
                  {view === "experience" ? "grid view" : "experience view"}
                </span>
              </div>
            </button>
          </motion.div>
        )}

        {/* --- Mobile Right Actions (View Switcher) --- */}
        <div className="flex items-center justify-end gap-2 md:w-10">
          
          {/* Mobile View Switcher (Right Corner) */}
          {!hideViewSwitcher && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0 }}
              animate={animationComplete ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => onViewChange(view === "experience" ? "grid" : "experience")}
                className="w-10 h-10 flex items-center justify-center bg-white border border-stone-200 shadow-sm rounded-lg text-stone-800 transition-transform active:scale-95"
                aria-label="Toggle View"
              >
                {view === "experience" ? (
                  <div className="grid grid-cols-2 gap-[2px] w-[15px] h-[15px]">
                    <div className="w-full h-full rounded-[1.5px] border-[1.5px] border-current"></div>
                    <div className="w-full h-full rounded-[1.5px] border-[1.5px] border-current"></div>
                    <div className="w-full h-full rounded-[1.5px] border-[1.5px] border-current"></div>
                    <div className="w-full h-full rounded-[1.5px] border-[1.5px] border-current"></div>
                  </div>
                ) : (
                  <HexagonGridIcon />
                )}
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-3xl text-foreground hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
