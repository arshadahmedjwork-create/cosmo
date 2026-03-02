import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import cosmoLogo from "@/assets/cosmo-logo.png";
import TextureSphere from "./TextureSphere";

const Navbar = () => {
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
    { label: "Collections", href: "#collections" },
    { label: "Materials", href: "#materials" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-background/95 backdrop-blur-md"
        : "bg-transparent"
        }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 h-16 md:h-20">
        <Link to="/" className="shrink-0 z-10 flex items-center gap-4">

          <img src={cosmoLogo} alt="Cosmo Stone" className="h-8 md:h-10 w-auto" />
        </Link>

        {/* Center Toggle - Experience View */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button className="flex items-center gap-3 px-4 py-2 border border-stone-200 bg-white/50 backdrop-blur-sm rounded-none hover:bg-white/80 transition-colors">
            <div className="grid grid-cols-2 gap-[2px] w-4 h-4 opacity-70">
              <div className="w-1.5 h-1.5 rounded-full border border-current"></div>
              <div className="w-1.5 h-1.5 rounded-full border border-current"></div>
              <div className="w-1.5 h-1.5 rounded-full border border-current"></div>
              <div className="w-1.5 h-1.5 rounded-full border border-current"></div>
            </div>
            <span className="text-sm font-medium tracking-wide">experience view</span>
          </button>
        </div>

        {/* Mobile toggle / Fallback right space */}
        <div className="w-10 flex justify-end">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground z-10"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-3xl text-foreground hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
