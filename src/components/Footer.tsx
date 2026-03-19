import cosmoLogo from "@/assets/cosmo-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-14">
          <div>
            <img src={cosmoLogo} alt="Cosmo" className="h-10 md:h-12 mb-5 object-contain" />
            <p className="text-sm font-sans text-primary-foreground/50 leading-relaxed max-w-xs">
              Premium natural stone, curated and trusted since 1992.
            </p>
          </div>

          <div>
            <h4 className="label-text text-primary-foreground/30 mb-5">Collections</h4>
            <ul className="space-y-2.5 font-sans text-sm">
              {["Beige & Cream", "Grey Marble", "White Marble", "Exotic Stone"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-text text-primary-foreground/30 mb-5">Company</h4>
            <ul className="space-y-2.5 font-sans text-sm">
              {["About", "Projects"].map((l) => (
                <li key={l}>
                  <a href={l === "About" ? "/about" : "#"} className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-text text-primary-foreground/30 mb-5">Contact</h4>
            <ul className="space-y-2.5 font-sans text-sm text-primary-foreground/60 leading-relaxed">
              <li>info@cosmofloor.com</li>
              <li>+91 44 48680111</li>
              <li>118, Old Mahabalipuram Road,<br />Karapakkam, Chennai-600 119</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs font-sans text-primary-foreground/30">© 2025 Cosmo. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy", "Terms"].map((l) => (
              <a key={l} href="#" className="text-xs font-sans text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
