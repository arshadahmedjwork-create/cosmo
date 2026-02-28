import cosmoLogo from "@/assets/cosmo-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="section-padding py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={cosmoLogo} alt="Cosmo" className="h-10 mb-6 brightness-0 invert" />
            <p className="text-sm font-sans text-primary-foreground/60 leading-relaxed max-w-xs">
              Premium natural stone, curated and trusted since 1992. Serving architects,
              designers, and builders worldwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="label-text text-primary-foreground/40 mb-6">Collections</h4>
            <ul className="space-y-3 font-sans text-sm">
              {["Beige & Cream", "Grey Marble", "White Marble", "Exotic Stone", "Black Granite"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-text text-primary-foreground/40 mb-6">Company</h4>
            <ul className="space-y-3 font-sans text-sm">
              {["About Us", "Projects", "Sustainability", "Careers", "Press"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-text text-primary-foreground/40 mb-6">Contact</h4>
            <ul className="space-y-3 font-sans text-sm text-primary-foreground/70">
              <li>info@cosmostone.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-sans text-primary-foreground/40">
            © 2025 Cosmo. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Sitemap"].map((l) => (
              <a key={l} href="#" className="text-xs font-sans text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
