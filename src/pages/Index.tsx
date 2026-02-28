import Navbar from "@/components/Navbar";
import ScatteredHero from "@/components/ScatteredHero";
import DragCollections from "@/components/DragCollections";
import MaterialsGrid from "@/components/MaterialsGrid";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <ScatteredHero />
      <DragCollections />
      <MaterialsGrid />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
