import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Settings2 } from "lucide-react";
import MarbleSidebar, { StoneDetail } from "./MarbleSidebar";

import atlantic from "@/assets/images/BEIGES AND CREAM/Atlantic-min.jpg";
import biancoMarfill from "@/assets/images/BEIGES AND CREAM/Bianco-Marfill-min.jpg";
import botticinoClassico from "@/assets/images/BEIGES AND CREAM/Botticino-Classico-min-min.jpeg";
import botticinoFiorito from "@/assets/images/BEIGES AND CREAM/Botticino-Fiorito-min-min.jpeg";
import bresciaAurora from "@/assets/images/BEIGES AND CREAM/Brescia-Aurora-min.jpg";
import bresicaDiana from "@/assets/images/BEIGES AND CREAM/Bresica-Diana-min.jpg";
import cloudyBeige from "@/assets/images/BEIGES AND CREAM/Cloudy-Beige-min-min.jpeg";
import cremaMiele from "@/assets/images/BEIGES AND CREAM/Crema-Miele-min-min.jpeg";
import cremaNova from "@/assets/images/BEIGES AND CREAM/Crema-Nova-min-min.jpeg";
import cremeRosso from "@/assets/images/BEIGES AND CREAM/Creme-Rosso-min.jpg";
import dianeRoyale from "@/assets/images/BEIGES AND CREAM/Diane-Royale-min.jpg";
import featherGrey from "@/assets/images/BEIGES AND CREAM/Feather-Grey-min.jpg";
import irishBeigeExtra from "@/assets/images/BEIGES AND CREAM/Irish-Beige-Extra-min.jpg";
import irishBeige from "@/assets/images/BEIGES AND CREAM/Irish-Beige-min.jpg";
import irishPearl from "@/assets/images/BEIGES AND CREAM/Irish-Pearl-min.jpg";
import lightEmpredor from "@/assets/images/BEIGES AND CREAM/Light-Empredor-min.jpg";
import limeStone from "@/assets/images/BEIGES AND CREAM/LIME-STONE-min.jpg";
import moonPearlExtra from "@/assets/images/BEIGES AND CREAM/Moon-Pearl-Extra-min-min.jpeg";
import opalBeige from "@/assets/images/BEIGES AND CREAM/Opal-Beige-min-min.jpeg";
import perlantoChips from "@/assets/images/BEIGES AND CREAM/Perlanto-Chips-min.jpg";
import perlantoRoyale from "@/assets/images/BEIGES AND CREAM/Perlanto-Royale-min.jpg";
import perlatoSicilia from "@/assets/images/BEIGES AND CREAM/Perlato-Sicilia-min.jpg";
import portugalBeige from "@/assets/images/BEIGES AND CREAM/PORTUGAL-BEIGE-min.jpg";
import royalCream from "@/assets/images/BEIGES AND CREAM/Royal-Cream-min.jpg";
import vintageCream from "@/assets/images/BEIGES AND CREAM/Vintage-Cream-min-min.jpeg";

import alaskaGrey from "@/assets/images/GREYS/Alaska-Grey-min-min-400x284.jpeg";
import arabianGrey from "@/assets/images/GREYS/Arabian-Grey-min-400x284.jpg";
import fiorDePesco from "@/assets/images/GREYS/Fior-De-Pesco-min-400x284.jpg";
import greyAmani from "@/assets/images/GREYS/Grey-Amani-min-400x284.jpg";
import greyChigani from "@/assets/images/GREYS/Grey-Chigani-min-400x284.jpg";
import greyMarfil from "@/assets/images/GREYS/Grey-Marfil-min-min-400x284.jpeg";
import oliveGrey from "@/assets/images/GREYS/Olive-Grey-min-400x284.jpg";
import silverSarpeggiante from "@/assets/images/GREYS/Silver-Sarpeggiante-min-min-400x284.jpg";

import calacutta from "@/assets/images/WHITES/Calacutta-min-400x284.jpg";
import goldenSpider from "@/assets/images/WHITES/Golden-Spider-min-400x284.jpg";
import whiteImg0321 from "@/assets/images/WHITES/IMG_0321-min-400x284.jpg";
import lhasaBianco from "@/assets/images/WHITES/Lhasa-Bianco-min-min-400x284.jpeg";
import marmaraWhite from "@/assets/images/WHITES/Marmara-White-min-400x284.jpg";
import statuarioExtra from "@/assets/images/WHITES/Statuario-Extra-min-400x284.jpg";
import swissWhite from "@/assets/images/WHITES/Swiss-White-min-400x284.jpg";

import americanGold from "@/assets/images/BLACKS/American-Gold-Porthro-min-1-400x284.jpg";
import blackPorthro from "@/assets/images/BLACKS/Black-Porthro-min-400x284.jpg";
import bresciaNortre from "@/assets/images/BLACKS/Bresica-Nortre-min-400x284.jpg";
import oceanBlack from "@/assets/images/BLACKS/Ocean-Black-min-400x284.jpg";
import silverPorthro from "@/assets/images/BLACKS/Silver-Porthro-min-400x284.jpg";

import darkEmpredor from "@/assets/images/COLORS/Dark-Empredor-min-400x284.jpg";
import iceBrown from "@/assets/images/COLORS/Ice-Brown-min-400x284.jpg";
import redAlicante from "@/assets/images/COLORS/Red-Alicante-min-400x284.jpg";
import redLanventhe from "@/assets/images/COLORS/Red-Lanventhe-min-400x284.jpg";
import rossoPistalo from "@/assets/images/COLORS/Rosso-Pistalo-min-400x284.jpg";
import yellowPearl from "@/assets/images/COLORS/Yellow-Pearl-min-400x284.jpg";

import brownCrystalOnix from "@/assets/images/ONIX/Brown-Crystal-Onix-min-min-400x284.jpeg";
import dragonOnix from "@/assets/images/ONIX/Dragon-Onix-min-400x284.jpg";
import greenOnix1 from "@/assets/images/ONIX/Green-Onix1-min-400x284.jpg";
import honeyOnix from "@/assets/images/ONIX/Honey-Onix-min-400x284.jpg";
import mangoOnix from "@/assets/images/ONIX/Mango-Onix-min-min-400x284.jpg";
import oniceBianco from "@/assets/images/ONIX/Onice-Bianco-min-min-400x284.jpeg";
import onixFantastico from "@/assets/images/ONIX/Onix-Fantastico-min-400x284.jpg";
import tigerOnix from "@/assets/images/ONIX/TIGER-ONIX-min-400x284.jpg";
import vanillaWaveOnix from "@/assets/images/ONIX/Vanilla-Wave-Onix-min-400x284.jpg";
import vennilaOnix from "@/assets/images/ONIX/VENNILA-ONIX-min-400x284.jpg";
import whiteTigerOnix from "@/assets/images/ONIX/WHITE-TIGER-ONIX-min-400x284.jpg";

import beigeTravertino from "@/assets/images/TRAVERTINO TILES/BEIGE-TRAVERTINO-min-2-400x284.jpg";
import corkTravertino from "@/assets/images/TRAVERTINO TILES/CORK-TRAVERTINO-min-1-400x284.jpg";
import lemonYellowTravertino from "@/assets/images/TRAVERTINO TILES/LEMON-YELLOW-TRAVERTINO-min-400x284.jpg";
import redTravertino from "@/assets/images/TRAVERTINO TILES/Red-Travertino-min-400x284.jpg";
import silverTravertineDorato from "@/assets/images/TRAVERTINO TILES/Silver-travertine-Dorato-min-400x284.jpeg";
import titaniumTravertino from "@/assets/images/TRAVERTINO TILES/Titanium-Travertino-min-400x284.jpg";
import travertinoClassico from "@/assets/images/TRAVERTINO TILES/TRAVERTINO-CLASSICO-min-1-400x284.jpg";
import walnutTravertino from "@/assets/images/TRAVERTINO TILES/Walnut-Travertino-min-min-400x284.jpg";

import greenOnixIndian from "@/assets/images/INDIAN MARBLE/GREEN-ONIX-min-400x284.jpg";
import jaisalmar from "@/assets/images/INDIAN MARBLE/Jaisalmar-min-min-400x284.jpg";
import udaipurGreen from "@/assets/images/INDIAN MARBLE/Udaipur-Green-min-min-400x284.jpg";

const stonesData: StoneDetail[] = [
  { id: "atlantic", name: "Atlantic", image: atlantic, category: "Beige & Cream", finish: "Matte", origin: "Portugal", description: "A warm sandy stone with linear patterns running across its surface." },
  { id: "bianco-marfill", name: "Bianco Marfill", image: biancoMarfill, category: "White & Cream", finish: "Polished", origin: "Spain", description: "A light cream marble with subtle golden veining." },
  { id: "botticino-classico", name: "Botticino Classico", image: botticinoClassico, category: "Beige & Cream", finish: "Honed", origin: "Italy", description: "Fine, uniform beige tones with delicate white veining throughout." },
  { id: "botticino-fiorito", name: "Botticino Fiorito", image: botticinoFiorito, category: "Beige & Cream", finish: "Polished", origin: "Italy", description: "Lively pronounced fossil-rich patterns and warm cream tones." },
  { id: "brescia-aurora", name: "Brescia Aurora", image: bresciaAurora, category: "Beige & Cream", finish: "Polished", origin: "Italy", description: "Warm beige marble with a faint pink hue and crystalline patterns." },
  { id: "bresica-diana", name: "Brescia Diana", image: bresicaDiana, category: "Beige & Cream", finish: "Polished", origin: "Italy", description: "Classic Italian beige marble with subtle horizontal veining." },
  { id: "cloudy-beige", name: "Cloudy Beige", image: cloudyBeige, category: "Beige & Cream", finish: "Matte", origin: "Turkey", description: "Soft, cloud-like patterns in warm beige tones." },
  { id: "crema-miele", name: "Crema Miele", image: cremaMiele, category: "Beige & Cream", finish: "Polished", origin: "Spain", description: "Honey-toned cream marble with fine, flowing veins." },
  { id: "crema-nova", name: "Crema Nova", image: cremaNova, category: "Beige & Cream", finish: "Polished", origin: "Portugal", description: "Classic cream marble with subtle, elegant veining." },
  { id: "creme-rosso", name: "Crème Rosso", image: cremeRosso, category: "Beige & Cream", finish: "Polished", origin: "Turkey", description: "Warm cream tones bisected by bold brecciated red and brown veins." },
  { id: "diane-royale", name: "Diane Royale", image: dianeRoyale, category: "Beige & Cream", finish: "Polished", origin: "France", description: "Elegant soft cream stone with refined grey-beige patterning." },
  { id: "feather-grey", name: "Feather Grey", image: featherGrey, category: "Grey", finish: "Polished", origin: "Italy", description: "Delicate feathered grey veins float across a soft cream-white base." },
  { id: "irish-beige", name: "Irish Beige", image: irishBeige, category: "Beige & Cream", finish: "Honed", origin: "Ireland", description: "Premium Irish limestone offering a warm beige tone with fossil character." },
  { id: "irish-pearl", name: "Irish Pearl", image: irishPearl, category: "Beige & Cream", finish: "Polished", origin: "Ireland", description: "Luminous limestone with pearlescent cream tones and a distinctive sheen." },
  { id: "light-empredor", name: "Light Empredor", image: lightEmpredor, category: "Beige & Cream", finish: "Polished", origin: "Turkey", description: "Warm golden-beige with soft brown veining throughout." },
  { id: "lime-stone", name: "Lime Stone", image: limeStone, category: "Limestone", finish: "Honed", origin: "France", description: "Refined French limestone with a clean, matte surface." },
  { id: "moon-pearl", name: "Moon Pearl Extra", image: moonPearlExtra, category: "White & Cream", finish: "Polished", origin: "Turkey", description: "Pearlescent white-cream marble with faint soft grey veining." },
  { id: "opal-beige", name: "Opal Beige", image: opalBeige, category: "Beige & Cream", finish: "Polished", origin: "Turkey", description: "Translucent, opalescent cream stone with gentle swirling patterns." },
  { id: "perlanto-chips", name: "Perlanto Chips", image: perlantoChips, category: "Beige & Cream", finish: "Polished", origin: "Sicily", description: "Featuring distinctive shell and fossil chip patterns in a warm cream base." },
  { id: "perlanto-royale", name: "Perlanto Royale", image: perlantoRoyale, category: "Beige & Cream", finish: "Polished", origin: "Sicily", description: "Refined Sicilian marble with a creamy base and striking fossil details." },
  { id: "perlato-sicilia", name: "Perlato Sicilia", image: perlatoSicilia, category: "Beige & Cream", finish: "Polished", origin: "Sicily", description: "Warm ivory marble rich with organic veins and fossil inclusions." },
  { id: "portugal-beige", name: "Portugal Beige", image: portugalBeige, category: "Beige & Cream", finish: "Honed", origin: "Portugal", description: "Consistent, warm-toned Portuguese limestone with a gentle matte finish." },
  { id: "royal-cream", name: "Royal Cream", image: royalCream, category: "Beige & Cream", finish: "Polished", origin: "Turkey", description: "Distinguished cream marble dressed in flowing beige and gold veins." },
  { id: "vintage-cream", name: "Vintage Cream", image: vintageCream, category: "Beige & Cream", finish: "Honed", origin: "Turkey", description: "Characterful aged-cream stone with a soft, vintage patina." },
  { id: "alaska-grey", name: "Alaska Grey", image: alaskaGrey, category: "Greys", finish: "Polished", origin: "Turkey", description: "A striking grey marble with intense, dramatic white veining patterns resembling icy landscapes." },
  { id: "arabian-grey", name: "Arabian Grey", image: arabianGrey, category: "Greys", finish: "Polished", origin: "Oman", description: "Rich, deep grey tones interwoven with subtle lighter veins for a sophisticated, modern aesthetic." },
  { id: "fior-de-pesco", name: "Fior De Pesco", image: fiorDePesco, category: "Greys", finish: "Polished", origin: "Italy", description: "A complex Italian marble featuring a grey base layered with hints of peach, white, and subtle green." },
  { id: "grey-amani", name: "Grey Amani", image: greyAmani, category: "Greys", finish: "Polished", origin: "Italy", description: "Elegant bronze-grey marble characterized by fine, golden-white veining and a warm, luxurious depth." },
  { id: "grey-chigani", name: "Grey Chigani", image: greyChigani, category: "Greys", finish: "Polished", origin: "Turkey", description: "A consistent, mid-tone grey marble with tight, delicate veining perfect for large modern surfaces." },
  { id: "grey-marfil", name: "Grey Marfil", image: greyMarfil, category: "Greys", finish: "Polished", origin: "Spain", description: "A cool grey interpretation of classic Marfil, offering subtle, uniform patterning and a sleek finish." },
  { id: "olive-grey", name: "Olive Grey", image: oliveGrey, category: "Greys", finish: "Honed", origin: "Turkey", description: "Deep grey limestone with subtle olive-green undertones and occasional marine fossils." },
  { id: "silver-sarpeggiante", name: "Silver Sarpeggiante", image: silverSarpeggiante, category: "Greys", finish: "Polished", origin: "Italy", description: "A highly linear grey marble featuring horizontal, wood-like bands in alternating silver and charcoal." },
  { id: "calacutta", name: "Calacutta", image: calacutta, category: "White & Cream", finish: "Polished", origin: "Italy", description: "The definitive luxury marble. Crisp white background with bold, dramatic grey and gold veining." },
  { id: "golden-spider", name: "Golden Spider", image: goldenSpider, category: "White & Cream", finish: "Polished", origin: "Greece", description: "A unique white marble featuring a striking web of fine golden-yellow and orange veins." },
  { id: "white-img0321", name: "Classic White", image: whiteImg0321, category: "White & Cream", finish: "Polished", origin: "Unknown", description: "A pristine white marble with subtle, misty grey movements." },
  { id: "lhasa-bianco", name: "Lhasa Bianco", image: lhasaBianco, category: "White & Cream", finish: "Polished", origin: "Brazil", description: "A dynamic white quartzite with sweeping linear patterns in sharp grey tones." },
  { id: "marmara-white", name: "Marmara White", image: marmaraWhite, category: "White & Cream", finish: "Polished", origin: "Turkey", description: "Distinctive linear marble featuring perfectly straight, parallel grey veins on a stark white base." },
  { id: "statuario-extra", name: "Statuario Extra", image: statuarioExtra, category: "White & Cream", finish: "Polished", origin: "Italy", description: "The sculptor's choice. Purest white with thick, bold grey veining, offering unmatched elegance." },
  { id: "swiss-white", name: "Swiss White", image: swissWhite, category: "White & Cream", finish: "Honed", origin: "Switzerland", description: "A cool, brilliant white stone with a delicate crystalline structure and a soft matte finish." },
  { id: "american-gold", name: "American Gold Porthro", image: americanGold, category: "Blacks", finish: "Polished", origin: "Unknown", description: "A dramatic black marble intensely fractured by striking golden and copper veining." },
  { id: "black-porthro", name: "Black Porthro", image: blackPorthro, category: "Blacks", finish: "Polished", origin: "Unknown", description: "Deepest black marble with sharp, electric white veins cutting abstract geometry across the absolute dark." },
  { id: "brescia-nortre", name: "Brescia Nortre", image: bresciaNortre, category: "Blacks", finish: "Polished", origin: "Unknown", description: "A sophisticated dark charcoal surface swirled with organic, silver-white movement." },
  { id: "ocean-black", name: "Ocean Black", image: oceanBlack, category: "Blacks", finish: "Honed", origin: "Unknown", description: "A textured, oceanic deep grey-black stone with subtle rippled patterns that catch the light." },
  { id: "silver-porthro", name: "Silver Porthro", image: silverPorthro, category: "Blacks", finish: "Polished", origin: "Unknown", description: "Intense black background illuminated by intricate, spiderweb-like silver veining." },

  { id: "dark-empredor", name: "Dark Empredor", image: darkEmpredor, category: "Colors", finish: "Polished", origin: "Spain", description: "A classic dark brown marble fractured by stunning spider webs of bright crystalline veins." },
  { id: "ice-brown", name: "Ice Brown", image: iceBrown, category: "Colors", finish: "Polished", origin: "Brazil", description: "An exotic stone featuring sharp, shattered patterns of cool grey and warm brown." },
  { id: "red-alicante", name: "Red Alicante", image: redAlicante, category: "Colors", finish: "Polished", origin: "Spain", description: "A rich, vibrant earthy red marble laced with sudden white calcite veins." },
  { id: "red-lanventhe", name: "Red Lanventhe", image: redLanventhe, category: "Colors", finish: "Polished", origin: "Unknown", description: "A deeply saturated crimson and burgundy marble offering an ornate, dramatic presence." },
  { id: "rosso-pistalo", name: "Rosso Pistalo", image: rossoPistalo, category: "Colors", finish: "Polished", origin: "Unknown", description: "A complex, brecciated red stone peppered with multicoloured pebble-like inclusions." },
  { id: "yellow-pearl", name: "Yellow Pearl", image: yellowPearl, category: "Colors", finish: "Polished", origin: "Unknown", description: "A luminous, golden-yellow stone with pearlescent qualities and a warm, sunny disposition." },

  { id: "brown-crystal-onix", name: "Brown Crystal Onix", image: brownCrystalOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "A highly translucent onyx featuring layered bands of rich caramel, amber, and deep brown." },
  { id: "dragon-onix", name: "Dragon Onix", image: dragonOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "Fierce, dynamic patterns in green, gold, and amber that resemble the scales and fire of myth." },
  { id: "green-onix1", name: "Green Onix", image: greenOnix1, category: "Onyx", finish: "Polished", origin: "Pakistan", description: "A breathtaking emerald and jade-toned translucent stone, perfect for backlighting." },
  { id: "honey-onix", name: "Honey Onix", image: honeyOnix, category: "Onyx", finish: "Polished", origin: "Iran", description: "Warm, glowing amber and golden tones characterized by cloudy, translucent depths." },
  { id: "mango-onix", name: "Mango Onix", image: mangoOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "Vibrant yellow-orange onyx displaying soft, fruity tones and flowing water-like layers." },
  { id: "onice-bianco", name: "Onice Bianco", image: oniceBianco, category: "Onyx", finish: "Polished", origin: "Unknown", description: "A rare white onyx offering milky translucence and incredibly delicate, pale veining." },
  { id: "onix-fantastico", name: "Onix Fantastico", image: onixFantastico, category: "Onyx", finish: "Polished", origin: "Mexico", description: "An explosion of layered colors ranging from deep red to pale yellow in stunning concentric bands." },
  { id: "tiger-onix", name: "Tiger Onix", image: tigerOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "Striking parallel bands of contrasting gold, brown, and cream resembling a tiger's coat." },
  { id: "vanilla-wave-onix", name: "Vanilla Wave Onix", image: vanillaWaveOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "Soft, undulating waves of cream and pale yellow creating a serene, luminous surface." },
  { id: "vennila-onix", name: "Vennila Onix", image: vennilaOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "A pale, creamy onyx perfect for creating soft, glowing, backlit installations." },
  { id: "white-tiger-onix", name: "White Tiger Onix", image: whiteTigerOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "High-contrast horizontal striping in stark whites, greys, and creams." },

  { id: "beige-travertino", name: "Beige Travertino", image: beigeTravertino, category: "Travertine", finish: "Honed", origin: "Turkey", description: "Classic warm beige travertine with gentle linear movement and natural porosity." },
  { id: "cork-travertino", name: "Cork Travertino", image: corkTravertino, category: "Travertine", finish: "Honed", origin: "Unknown", description: "A textured, highly porous travertine resembling natural cork in both color and feel." },
  { id: "lemon-yellow-travertino", name: "Lemon Yellow Travertino", image: lemonYellowTravertino, category: "Travertine", finish: "Honed", origin: "Unknown", description: "A uniquely vibrant, sunny yellow travertine bringing warmth to rustic and modern spaces alike." },
  { id: "red-travertino", name: "Red Travertino", image: redTravertino, category: "Travertine", finish: "Honed", origin: "Iran", description: "A bold, saturated red travertine featuring strongly defined parallel striations in varying tones." },
  { id: "silver-travertine-dorato", name: "Silver Travertine Dorato", image: silverTravertineDorato, category: "Travertine", finish: "Honed", origin: "Italy", description: "Sophisticated grey and silver tones layered with warm golden-brown accents." },
  { id: "titanium-travertino", name: "Titanium Travertino", image: titaniumTravertino, category: "Travertine", finish: "Honed", origin: "Unknown", description: "A dramatic, dark-toned travertine with deep silver, charcoal, and cool grey banding." },
  { id: "travertino-classico", name: "Travertino Classico", image: travertinoClassico, category: "Travertine", finish: "Honed", origin: "Italy", description: "The definitive Roman stone. Warm beige with signature porous texture and parallel veining." },
  { id: "walnut-travertino", name: "Walnut Travertino", image: walnutTravertino, category: "Travertine", finish: "Honed", origin: "Turkey", description: "A rich, medium-brown travertine with layers of cream and dark chocolate tones." },

  { id: "green-onix-indian", name: "Indian Green Onix", image: greenOnixIndian, category: "Indian Marble", finish: "Polished", origin: "India", description: "A vibrant, translucent green onyx from India characterized by rolling clouds of emerald and jade." },
  { id: "jaisalmar", name: "Jaisalmer Yellow", image: jaisalmar, category: "Indian Marble", finish: "Polished", origin: "India", description: "A famous historic Indian stone boasting a deep, rich golden-yellow tone with subtle textural variations." },
  { id: "udaipur-green", name: "Udaipur Green", image: udaipurGreen, category: "Indian Marble", finish: "Polished", origin: "India", description: "Also known as Verde Guatemala, this classic deep forest-green marble features bold striking white and light green veins." },
];

function radiusFor(size: number) {
  if (size <= 28) return 4;
  if (size <= 44) return 6;
  if (size <= 74) return 8;
  if (size <= 110) return 12;
  return 16;
}

export const PATTERN_WIDTH = 892;
export const PATTERN_HEIGHT = 567;

// Non-overlapping rounded-square layout inspired by the provided reference.
const blocks = [
  // Row 1
  { x: 20, y: 30, size: 44 },
  { x: 76, y: 18, size: 72 },
  { x: 160, y: 18, size: 40 },
  { x: 228, y: 24, size: 38 },
  { x: 278, y: 44, size: 24 },
  { x: 312, y: 44, size: 70 },
  { x: 396, y: 14, size: 94 },
  { x: 506, y: 18, size: 70 },
  { x: 602, y: 16, size: 58 },
  { x: 676, y: 16, size: 76 },
  { x: 790, y: 24, size: 44 },

  // Row 2
  { x: 26, y: 102, size: 34 },
  { x: 90, y: 104, size: 28 },
  { x: 164, y: 76, size: 50 },
  { x: 240, y: 102, size: 64 },
  { x: 322, y: 140, size: 50 },
  { x: 414, y: 132, size: 28 },
  { x: 502, y: 124, size: 28 },
  { x: 538, y: 140, size: 72 },
  { x: 646, y: 110, size: 72 },
  { x: 728, y: 132, size: 38 },
  { x: 776, y: 124, size: 54 },

  // Row 3
  { x: 16, y: 152, size: 56 },
  { x: 90, y: 146, size: 72 },
  { x: 176, y: 162, size: 56 },
  { x: 240, y: 208, size: 106 },
  { x: 364, y: 202, size: 38 },
  { x: 418, y: 172, size: 96 },
  { x: 530, y: 246, size: 24 },
  { x: 562, y: 230, size: 56 },
  { x: 638, y: 230, size: 40 },
  { x: 714, y: 204, size: 162 },

  // Row 4
  { x: 20, y: 286, size: 54 },
  { x: 92, y: 298, size: 38 },
  { x: 162, y: 308, size: 72 },
  { x: 252, y: 344, size: 56 },
  { x: 320, y: 354, size: 32 },
  { x: 380, y: 328, size: 40 },
  { x: 456, y: 298, size: 64 },
  { x: 540, y: 298, size: 38 },
  { x: 610, y: 306, size: 74 },

  // Row 5
  { x: 30, y: 418, size: 24 },
  { x: 62, y: 400, size: 58 },
  { x: 134, y: 412, size: 54 },
  { x: 194, y: 460, size: 28 },
  { x: 230, y: 414, size: 110 },
  { x: 356, y: 386, size: 44 },
  { x: 428, y: 372, size: 58 },
  { x: 510, y: 412, size: 28 },
  { x: 582, y: 412, size: 54 },
  { x: 676, y: 392, size: 72 },
  { x: 818, y: 408, size: 40 },

  // Row 6
  { x: 32, y: 476, size: 40 },
  { x: 86, y: 476, size: 40 },
  { x: 140, y: 484, size: 42 },
  { x: 356, y: 444, size: 56 },
  { x: 430, y: 468, size: 54 },
  { x: 520, y: 468, size: 56 },
  { x: 588, y: 484, size: 42 },
  { x: 676, y: 466, size: 42 },
  { x: 818, y: 474, size: 44 },
];

const SwatchHero = () => {
  const [selectedStone, setSelectedStone] = useState<StoneDetail | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique categories for the filter dropdown
  const categories = ["All", ...Array.from(new Set(stonesData.map(s => s.category)))];

  // Function to convert SVG coordinates to responsive percentages
  const toPct = (val: number, max: number) => `${(val / max) * 100}%`;

  // Calculate total height needed based on number of stones to tile the pattern downwards
  const numRows = Math.ceil(stonesData.length / blocks.length);
  const totalHeight = PATTERN_HEIGHT * numRows;

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-auto bg-[#e5e5e5] select-none pt-24 pb-16">
      <div className="flex w-full items-center justify-center min-h-full">
        {/* Container maintaining the dynamically tiled aspect ratio */}
        <div
          className="relative w-[95%] max-w-7xl mx-auto"
          style={{ aspectRatio: `${PATTERN_WIDTH} / ${totalHeight}` }}
        >
          {stonesData.map((stone, i) => {
            const b = blocks[i % blocks.length];
            const rowOffset = Math.floor(i / blocks.length) * PATTERN_HEIGHT;
            const isFilteredOut = activeCategory !== "All" && stone.category !== activeCategory;

            return (
              <motion.div
                key={i}
                className="absolute overflow-hidden cursor-pointer bg-stone-200 group"
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                  zIndex: 10
                }}
                onClick={() => setSelectedStone(stone)}
                animate={{
                  opacity: isFilteredOut ? 0.15 : 1,
                  scale: 1,
                  y: 0,
                  // Apply a grayscale filter if excluded for better visual hierarchy
                  filter: isFilteredOut ? "grayscale(100%) blur(2px)" : "grayscale(0%) blur(0px)"
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.02,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  left: toPct(b.x, PATTERN_WIDTH),
                  top: toPct(b.y + rowOffset, totalHeight),
                  width: toPct(b.size, PATTERN_WIDTH),
                  height: toPct(b.size, totalHeight),
                  borderRadius: `${radiusFor(b.size)}px`,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  pointerEvents: isFilteredOut ? "none" : "auto", // prevent clicking filtered out items
                }}
              >
                <motion.img
                  src={stone.image}
                  alt={stone.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                  whileHover={{ scale: 1.15 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Center Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center shadow-sm z-20">
        <button className="flex items-center gap-2 px-6 py-3 bg-[#252525] text-white hover:bg-[#1a1a1a] transition-colors border-r border-[#3a3a3a] rounded-l-md">
          <Menu size={16} />
          <span className="text-sm font-medium tracking-wide">menu</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#252525] hover:bg-stone-50 transition-colors border border-stone-200 border-l-0 rounded-r-md"
          >
            <Settings2 size={16} />
            <span className="text-sm font-medium tracking-wide whitespace-nowrap">
              {activeCategory === "All" ? "filter" : activeCategory}
            </span>
          </button>

          {/* Filter Dropdown */}
          <motion.div
            initial={false}
            animate={{
              opacity: isFilterOpen ? 1 : 0,
              y: isFilterOpen ? -8 : 0,
              pointerEvents: isFilterOpen ? "auto" : "none"
            }}
            className="absolute bottom-full left-0 mb-2 min-w-[220px] bg-white border border-stone-100 shadow-xl rounded-md py-2 overflow-hidden"
          >
            <div className="px-4 py-2 mt-1 mb-1 text-[11px] font-bold text-stone-400 tracking-widest uppercase flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
              Marble
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

      <MarbleSidebar stone={selectedStone} onClose={() => setSelectedStone(null)} />
    </section>
  );
};

export default SwatchHero;
