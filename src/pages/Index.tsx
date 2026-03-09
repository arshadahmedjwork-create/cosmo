import { useState } from "react";
import Navbar from "@/components/Navbar";
import ScatteredHero from "@/components/ScatteredHero";
import StoneGrid from "@/components/StoneGrid";

const Index = () => {
  const [view, setView] = useState<"experience" | "grid">("experience");

  return (
    <div className="bg-[#f5f5f0] min-h-screen">
      <Navbar view={view} onViewChange={setView} />
      {view === "experience" ? <ScatteredHero /> : <StoneGrid />}
    </div>
  );
};

export default Index;
