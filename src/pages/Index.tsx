import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ColorFamilies from "@/components/ColorFamilies";
import CollectionExplorer from "@/components/CollectionExplorer";
import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <ColorFamilies />
      <CollectionExplorer />
      <FeaturedSection />
      <Footer />
    </div>
  );
};

export default Index;
