import { useState } from "react";
import Navbar from "@/components/Navbar";
import ScatteredHero from "@/components/ScatteredHero";
import StoneGrid from "@/components/StoneGrid";

const Index = () => {
  const [view, setView] = useState<"experience" | "grid">("experience");
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <div className="bg-[#f5f5f0] min-h-screen">
      <Navbar view={view} onViewChange={setView} animationComplete={animationComplete || view === "grid"} />
      {view === "experience" ? (
        <ScatteredHero onAnimationComplete={() => setAnimationComplete(true)} />
      ) : (
        <StoneGrid />
      )}
    </div>
  );
};

export default Index;
