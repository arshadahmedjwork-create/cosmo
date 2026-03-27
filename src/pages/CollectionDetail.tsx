import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Menu, Maximize2 } from "lucide-react";

// ─── Stone data ────────────────────────────────────────────────────────────────
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

// ─── Types ─────────────────────────────────────────────────────────────────────
interface StoneEntry {
    id: string;
    name: string;
    image: string;
    category: string;
    finish: string;
    origin: string;
    description: string;
    atmosphere: string; // evocative one-liner for panel 2
    colorPalette: string;
}

// ─── All stones ────────────────────────────────────────────────────────────────
const allStones: StoneEntry[] = [
    { id: "atlantic", name: "Atlantic", image: atlantic, category: "Beige & Cream", finish: "Matte", origin: "Portugal", description: "A warm, sandy-toned limestone with subtly linear movement across its surface. Atlantic brings a calming Mediterranean warmth to any floor or wall application.", atmosphere: "The tones blend gently together, drawing you in for a closer look.", colorPalette: "Sandy Beige" },
    { id: "bianco-marfill", name: "Bianco Marfill", image: biancoMarfill, category: "White & Cream", finish: "Polished", origin: "Spain", description: "A light cream marble with subtle golden veining. Its pristine surface catches light beautifully, creating a luminous quality in any interior.", atmosphere: "Light gathers in every vein, filling the room with quiet gold.", colorPalette: "Ivory White" },
    { id: "botticino-classico", name: "Botticino Classico", image: botticinoClassico, category: "Beige & Cream", finish: "Honed", origin: "Italy", description: "Fine, uniform beige tones with delicate white veining throughout — one of Italy's most beloved marbles for premium interiors.", atmosphere: "Italian craftsmanship distilled into stone and silence.", colorPalette: "Classic Beige" },
    { id: "botticino-fiorito", name: "Botticino Fiorito", image: botticinoFiorito, category: "Beige & Cream", finish: "Polished", origin: "Italy", description: "Lively, pronounced fossil-rich patterns and warm cream tones make this a visually engaging choice for statement surfaces.", atmosphere: "Ancient fossils surface through centuries of patient stone.", colorPalette: "Warm Cream" },
    { id: "brescia-aurora", name: "Brescia Aurora", image: bresciaAurora, category: "Beige & Cream", finish: "Polished", origin: "Italy", description: "Warm beige marble with a faint pink hue and natural crystalline patterns. Exudes quiet luxury and refined elegance for sophisticated spaces.", atmosphere: "Dawn colours held still in the heart of Italian stone.", colorPalette: "Rose Beige" },
    { id: "bresica-diana", name: "Brescia Diana", image: bresicaDiana, category: "Beige & Cream", finish: "Polished", origin: "Italy", description: "Classic Italian beige marble with subtle horizontal veining. A timeless choice for walls and flooring in premium architectural projects.", atmosphere: "Horizontal lines recall the stillness of a classic Italian gallery.", colorPalette: "Classic Beige" },
    { id: "cloudy-beige", name: "Cloudy Beige", image: cloudyBeige, category: "Beige & Cream", finish: "Matte", origin: "Turkey", description: "Soft, cloud-like patterns in warm beige tones. This marble brings an organic, calming quality to any architectural space.", atmosphere: "Like early morning mist settled permanently into stone.", colorPalette: "Soft Beige" },
    { id: "crema-miele", name: "Crema Miele", image: cremaMiele, category: "Beige & Cream", finish: "Polished", origin: "Spain", description: "Honey-toned cream marble with fine, flowing veins. A warm, inviting surface that adds richness to kitchens, bathrooms, and living areas.", atmosphere: "Warm as sunlight pouring through amber glass.", colorPalette: "Honey Cream" },
    { id: "crema-nova", name: "Crema Nova", image: cremaNova, category: "Beige & Cream", finish: "Polished", origin: "Portugal", description: "Classic cream marble with subtle, elegant veining. Its warm undertones create bright, inviting interiors that feel both luxurious and welcoming.", atmosphere: "Each vein a quiet story told in gold and cream.", colorPalette: "Polished Cream" },
    { id: "creme-rosso", name: "Crème Rosso", image: cremeRosso, category: "Beige & Cream", finish: "Polished", origin: "Turkey", description: "Warm cream tones bisected by bold brecciated red and brown veins — a dramatic, characterful stone for statement applications.", atmosphere: "Fire and earth reconciled in a single surface.", colorPalette: "Cream & Red" },
    { id: "diane-royale", name: "Diane Royale", image: dianeRoyale, category: "Beige & Cream", finish: "Polished", origin: "France", description: "Elegant soft cream stone with refined grey-beige patterning. A French classic that pairs understated luxury with architectural grace.", atmosphere: "Understated French elegance held in every pale grey sweep.", colorPalette: "Grey Beige" },
    { id: "feather-grey", name: "Feather Grey", image: featherGrey, category: "Greys", finish: "Polished", origin: "Italy", description: "Delicate feathered grey veins float across a soft cream-white base. Light and airy, perfect for creating a serene, contemporary atmosphere.", atmosphere: "A feather's touch traced across an ivory morning.", colorPalette: "Feather Grey" },
    { id: "irish-beige", name: "Irish Beige", image: irishBeige, category: "Beige & Cream", finish: "Honed", origin: "Ireland", description: "Premium Irish limestone offering a warm beige tone with fossil character — a natural and authentic material for refined interiors.", atmosphere: "Ancient coastlines traced in warm limestone light.", colorPalette: "Warm Beige" },
    { id: "irish-pearl", name: "Irish Pearl", image: irishPearl, category: "Beige & Cream", finish: "Polished", origin: "Ireland", description: "Luminous limestone with pearlescent cream tones and a distinctive sheen that catches light from every angle.", atmosphere: "Pearlescent light caught mid-morning in Irish stone.", colorPalette: "Pearl Cream" },
    { id: "light-empredor", name: "Light Empredor", image: lightEmpredor, category: "Beige & Cream", finish: "Polished", origin: "Turkey", description: "Warm golden-beige with soft brown veining throughout — a refined, warm stone that creates depth and richness in any interior.", atmosphere: "Golden warmth diffused through amber and soft brown grain.", colorPalette: "Golden Beige" },
    { id: "lime-stone", name: "Lime Stone", image: limeStone, category: "Beige & Cream", finish: "Honed", origin: "France", description: "Refined French limestone with a clean, matte surface. Simple, honest, and beautifully textured for floors and feature walls.", atmosphere: "French restraint perfected in clean, matte stone.", colorPalette: "Pale Stone" },
    { id: "moon-pearl", name: "Moon Pearl Extra", image: moonPearlExtra, category: "White & Cream", finish: "Polished", origin: "Turkey", description: "Pearlescent white-cream marble with faint soft grey veining — an ethereal, moonlit surface for luxury interiors.", atmosphere: "Moonlight frozen at its brightest point.", colorPalette: "Pearl White" },
    { id: "opal-beige", name: "Opal Beige", image: opalBeige, category: "Beige & Cream", finish: "Polished", origin: "Turkey", description: "Translucent, opalescent cream stone with gentle swirling patterns. Otherworldly and beautiful, ideal as a centerpiece surface.", atmosphere: "Swirling light caught within a shell of ancient stone.", colorPalette: "Opal Cream" },
    { id: "perlanto-chips", name: "Perlanto Chips", image: perlantoChips, category: "Beige & Cream", finish: "Polished", origin: "Sicily", description: "Featuring distinctive shell and fossil chip patterns in a warm cream base — nature's artistry preserved in Sicilian stone.", atmosphere: "The sea floor fossilised, polished, and brought indoors.", colorPalette: "Cream Fossil" },
    { id: "perlanto-royale", name: "Perlanto Royale", image: perlantoRoyale, category: "Beige & Cream", finish: "Polished", origin: "Sicily", description: "Refined Sicilian marble with a creamy base and striking fossil details — regal in character and rich in natural history.", atmosphere: "Regal and ancient in equal stillness.", colorPalette: "Ivory Cream" },
    { id: "perlato-sicilia", name: "Perlato Sicilia", image: perlatoSicilia, category: "Beige & Cream", finish: "Polished", origin: "Sicily", description: "Warm ivory marble rich with organic veins and fossil inclusions. A beautifully layered surface, full of natural storytelling.", atmosphere: "Layers of time revealed in warm Sicilian ivory.", colorPalette: "Warm Ivory" },
    { id: "portugal-beige", name: "Portugal Beige", image: portugalBeige, category: "Beige & Cream", finish: "Honed", origin: "Portugal", description: "Consistent, warm-toned Portuguese limestone with a gentle matte finish. Versatile, durable, and timelessly appealing.", atmosphere: "Atlantic warmth held still in consistent, honest stone.", colorPalette: "Warm Beige" },
    { id: "royal-cream", name: "Royal Cream", image: royalCream, category: "Beige & Cream", finish: "Polished", origin: "Turkey", description: "Distinguished cream marble dressed in flowing beige and gold veins — an assured, regal choice for statement interiors.", atmosphere: "The quiet confidence of royalty in every gold-flecked vein.", colorPalette: "Gold Cream" },
    { id: "vintage-cream", name: "Vintage Cream", image: vintageCream, category: "Beige & Cream", finish: "Honed", origin: "Turkey", description: "Characterful aged-cream stone with a soft, vintage patina that brings warmth and heritage feel to contemporary spaces.", atmosphere: "Time softened into cream, patina into character.", colorPalette: "Aged Cream" },
    { id: "alaska-grey", name: "Alaska Grey", image: alaskaGrey, category: "Greys", finish: "Polished", origin: "Turkey", description: "A striking grey marble with intense, dramatic white veining patterns resembling icy landscapes — powerful and dramatic.", atmosphere: "Arctic light fractured across charcoal stone.", colorPalette: "Arctic Grey" },
    { id: "arabian-grey", name: "Arabian Grey", image: arabianGrey, category: "Greys", finish: "Polished", origin: "Oman", description: "Rich, deep grey tones interwoven with subtle lighter veins for a sophisticated, modern aesthetic.", atmosphere: "Desert dusk distilled into a field of deep, refined grey.", colorPalette: "Deep Grey" },
    { id: "fior-de-pesco", name: "Fior De Pesco", image: fiorDePesco, category: "Greys", finish: "Polished", origin: "Italy", description: "A complex Italian marble featuring a grey base layered with hints of peach, white, and subtle green — a collector's stone.", atmosphere: "Italian orchards in stone: peach, white, and grey entwined.", colorPalette: "Peach Grey" },
    { id: "grey-amani", name: "Grey Amani", image: greyAmani, category: "Greys", finish: "Polished", origin: "Italy", description: "Elegant bronze-grey marble characterized by fine, golden-white veining and a warm, luxurious depth.", atmosphere: "Warm gold threads through a field of deep Italian grey.", colorPalette: "Bronze Grey" },
    { id: "grey-chigani", name: "Grey Chigani", image: greyChigani, category: "Greys", finish: "Polished", origin: "Turkey", description: "A consistent, mid-tone grey marble with tight, delicate veining perfect for large modern surfaces.", atmosphere: "Minimal, consistent, and quietly confident.", colorPalette: "Mid Grey" },
    { id: "grey-marfil", name: "Grey Marfil", image: greyMarfil, category: "Greys", finish: "Polished", origin: "Spain", description: "A cool grey interpretation of classic Marfil, offering subtle, uniform patterning and a sleek finish.", atmosphere: "Cool stillness refined to its most eloquent form.", colorPalette: "Cool Grey" },
    { id: "olive-grey", name: "Olive Grey", image: oliveGrey, category: "Greys", finish: "Honed", origin: "Turkey", description: "Deep grey limestone with subtle olive-green undertones and occasional marine fossils — earthy and organic.", atmosphere: "The quiet depth of an olive grove in grey morning light.", colorPalette: "Olive Grey" },
    { id: "silver-sarpeggiante", name: "Silver Sarpeggiante", image: silverSarpeggiante, category: "Greys", finish: "Polished", origin: "Italy", description: "A highly linear grey marble featuring horizontal, wood-like bands in alternating silver and charcoal — architectural and refined.", atmosphere: "Silver layers still as the surface of a mountain lake.", colorPalette: "Silver Grey" },
    { id: "calacutta", name: "Calacutta", image: calacutta, category: "White & Cream", finish: "Polished", origin: "Italy", description: "The definitive luxury marble. Crisp white background with bold, dramatic grey and gold veining — the pinnacle of natural stone.", atmosphere: "Bold drama in white. The stone that defines a room.", colorPalette: "Brilliant White" },
    { id: "golden-spider", name: "Golden Spider", image: goldenSpider, category: "White & Cream", finish: "Polished", origin: "Greece", description: "A unique white marble featuring a striking web of fine golden-yellow and orange veins — rare and deeply captivating.", atmosphere: "Golden silk spun through a field of perfect white.", colorPalette: "White & Gold" },
    { id: "white-img0321", name: "Classic White", image: whiteImg0321, category: "White & Cream", finish: "Polished", origin: "Unknown", description: "A pristine white marble with subtle, misty grey movements — simply beautiful in every application.", atmosphere: "Pure white, endlessly refined.", colorPalette: "Pure White" },
    { id: "lhasa-bianco", name: "Lhasa Bianco", image: lhasaBianco, category: "White & Cream", finish: "Polished", origin: "Brazil", description: "A dynamic white quartzite with sweeping linear patterns in sharp grey tones. Dramatic and unmistakable.", atmosphere: "Himalayan winds traced in grey across Brazilian quartzite.", colorPalette: "White & Grey" },
    { id: "marmara-white", name: "Marmara White", image: marmaraWhite, category: "White & Cream", finish: "Polished", origin: "Turkey", description: "Distinctive linear marble featuring perfectly straight, parallel grey veins on a stark white base — clean and architectural.", atmosphere: "Order and clarity in perfectly parallel grey lines.", colorPalette: "Linear White" },
    { id: "statuario-extra", name: "Statuario Extra", image: statuarioExtra, category: "White & Cream", finish: "Polished", origin: "Italy", description: "The sculptor's choice. Purest white with thick, bold grey veining, offering unmatched elegance and a classical presence.", atmosphere: "Carved from the same mountain as Renaissance masterpieces.", colorPalette: "Statuario White" },
    { id: "swiss-white", name: "Swiss White", image: swissWhite, category: "White & Cream", finish: "Honed", origin: "Switzerland", description: "A cool, brilliant white stone with a delicate crystalline structure and a soft matte finish — precision and purity.", atmosphere: "Alpine clarity held in every crystalline grain.", colorPalette: "Alpine White" },
    { id: "american-gold", name: "American Gold Porthro", image: americanGold, category: "Blacks", finish: "Polished", origin: "Unknown", description: "A dramatic black marble intensely fractured by striking golden and copper veining. Bold, unmistakable, and luxurious.", atmosphere: "Gold fractures through the absolute dark like lightning.", colorPalette: "Black & Gold" },
    { id: "black-porthro", name: "Black Porthro", image: blackPorthro, category: "Blacks", finish: "Polished", origin: "Unknown", description: "Deepest black marble with sharp, electric white veins cutting abstract geometry across an absolute dark field.", atmosphere: "Electric white geometry against the deepest black.", colorPalette: "Absolute Black" },
    { id: "brescia-nortre", name: "Brescia Nortre", image: bresciaNortre, category: "Blacks", finish: "Polished", origin: "Unknown", description: "A sophisticated dark charcoal surface swirled with organic, silver-white movement. Quietly powerful.", atmosphere: "Silver movement through a field of deep charcoal and quiet power.", colorPalette: "Charcoal Silver" },
    { id: "ocean-black", name: "Ocean Black", image: oceanBlack, category: "Blacks", finish: "Honed", origin: "Unknown", description: "A textured, oceanic deep grey-black stone with subtle rippled patterns — mysterious and deeply atmospheric.", atmosphere: "The ocean floor after midnight, textured and still.", colorPalette: "Ocean Black" },
    { id: "silver-porthro", name: "Silver Porthro", image: silverPorthro, category: "Blacks", finish: "Polished", origin: "Unknown", description: "Intense black background illuminated by intricate, spiderweb-like silver veining. Theatrical and extraordinary.", atmosphere: "Spiderweb silver illuminating the deepest black.", colorPalette: "Silver Black" },
    { id: "dark-empredor", name: "Dark Empredor", image: darkEmpredor, category: "Colors", finish: "Polished", origin: "Spain", description: "A classic dark brown marble fractured by stunning spider webs of bright crystalline veins. Rich and distinctive.", atmosphere: "Crystalline webs spun through a field of deep Spanish brown.", colorPalette: "Dark Brown" },
    { id: "ice-brown", name: "Ice Brown", image: iceBrown, category: "Colors", finish: "Polished", origin: "Brazil", description: "An exotic stone featuring sharp, shattered patterns of cool grey and warm brown — geological drama in every slab.", atmosphere: "Ice and earth in collision, suspended in Brazilian stone.", colorPalette: "Grey Brown" },
    { id: "red-alicante", name: "Red Alicante", image: redAlicante, category: "Colors", finish: "Polished", origin: "Spain", description: "A rich, vibrant earthy red marble laced with sudden white calcite veins — passionate and boldly architectural.", atmosphere: "Spanish earth, sun-baked and veined white by the heat.", colorPalette: "Earthy Red" },
    { id: "red-lanventhe", name: "Red Lanventhe", image: redLanventhe, category: "Colors", finish: "Polished", origin: "Unknown", description: "A deeply saturated crimson and burgundy marble offering an ornate, dramatic presence for collector interiors.", atmosphere: "Crimson and burgundy — the most dramatic stone available.", colorPalette: "Crimson" },
    { id: "rosso-pistalo", name: "Rosso Pistalo", image: rossoPistalo, category: "Colors", finish: "Polished", origin: "Unknown", description: "A complex, brecciated red stone peppered with multicoloured pebble-like inclusions — rich and always engaging.", atmosphere: "A mosaic of colour set in a field of passionate red.", colorPalette: "Multi Red" },
    { id: "yellow-pearl", name: "Yellow Pearl", image: yellowPearl, category: "Colors", finish: "Polished", origin: "Unknown", description: "A luminous, golden-yellow stone with pearlescent qualities and a warm, sunny disposition — joyful and rare.", atmosphere: "Sunlight crystallised and polished to a golden sheen.", colorPalette: "Sunlit Gold" },
    { id: "brown-crystal-onix", name: "Brown Crystal Onix", image: brownCrystalOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "A highly translucent onyx featuring layered bands of rich caramel, amber, and deep brown. Backlit, it is extraordinary.", atmosphere: "Caramel light glows through every translucent layer.", colorPalette: "Amber Brown" },
    { id: "dragon-onix", name: "Dragon Onix", image: dragonOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "Fierce, dynamic patterns in green, gold, and amber that resemble the scales and fire of myth. Unforgettable.", atmosphere: "Ancient and fierce: myth preserved in translucent stone.", colorPalette: "Gold & Green" },
    { id: "green-onix1", name: "Green Onix", image: greenOnix1, category: "Onyx", finish: "Polished", origin: "Pakistan", description: "A breathtaking emerald and jade-toned translucent stone, perfect for backlighting in luxury installations.", atmosphere: "Emerald depths glowing beneath the surface.", colorPalette: "Emerald Green" },
    { id: "honey-onix", name: "Honey Onix", image: honeyOnix, category: "Onyx", finish: "Polished", origin: "Iran", description: "Warm, glowing amber and golden tones characterized by cloudy, translucent depths — liquid warmth in stone form.", atmosphere: "Warm amber honey, still and luminous.", colorPalette: "Honey Amber" },
    { id: "mango-onix", name: "Mango Onix", image: mangoOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "Vibrant yellow-orange onyx displaying soft, fruity tones and flowing water-like layers. Bright and exotic.", atmosphere: "Tropical warmth flowing in golden, translucent waves.", colorPalette: "Mango Orange" },
    { id: "onice-bianco", name: "Onice Bianco", image: oniceBianco, category: "Onyx", finish: "Polished", origin: "Unknown", description: "A rare white onyx offering milky translucence and incredibly delicate, pale veining. Ethereal and precious.", atmosphere: "White light diffused through the palest, most delicate stone.", colorPalette: "Milky White" },
    { id: "onix-fantastico", name: "Onix Fantastico", image: onixFantastico, category: "Onyx", finish: "Polished", origin: "Mexico", description: "An explosion of layered colors ranging from deep red to pale yellow in stunning concentric bands. Mexican provenance.", atmosphere: "A geological explosion of colour, layer after luminous layer.", colorPalette: "Multi Color" },
    { id: "tiger-onix", name: "Tiger Onix", image: tigerOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "Striking parallel bands of contrasting gold, brown, and cream resembling a tiger's coat. Bold and unmistakable.", atmosphere: "The tiger's coat in gold and brown, perfectly parallel.", colorPalette: "Tiger Gold" },
    { id: "vanilla-wave-onix", name: "Vanilla Wave Onix", image: vanillaWaveOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "Soft, undulating waves of cream and pale yellow creating a serene, luminous surface. Calm and beautiful.", atmosphere: "Soft waves of cream and pale yellow, endlessly calm.", colorPalette: "Vanilla Cream" },
    { id: "vennila-onix", name: "Vennila Onix", image: vennilaOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "A pale, creamy onyx perfect for creating soft, glowing, backlit installations in luxury spaces.", atmosphere: "Pale and creamy, glowing softly from within.", colorPalette: "Pale Cream" },
    { id: "white-tiger-onix", name: "White Tiger Onix", image: whiteTigerOnix, category: "Onyx", finish: "Polished", origin: "Unknown", description: "High-contrast horizontal striping in stark whites, greys, and creams — the most architectural of the onyx family.", atmosphere: "Stark white and grey stripes, bold and unapologetic.", colorPalette: "White & Grey" },
    { id: "beige-travertino", name: "Beige Travertino", image: beigeTravertino, category: "Travertine", finish: "Honed", origin: "Turkey", description: "Classic warm beige travertine with gentle linear movement and natural porosity — the Roman Empire's favourite stone.", atmosphere: "Roman sun still warm in every pore of the stone.", colorPalette: "Warm Beige" },
    { id: "cork-travertino", name: "Cork Travertino", image: corkTravertino, category: "Travertine", finish: "Honed", origin: "Unknown", description: "A textured, highly porous travertine resembling natural cork in both colour and feel. Organic and grounding.", atmosphere: "Cork and stone: nature's two most honest materials.", colorPalette: "Cork Brown" },
    { id: "lemon-yellow-travertino", name: "Lemon Yellow Travertino", image: lemonYellowTravertino, category: "Travertine", finish: "Honed", origin: "Unknown", description: "A uniquely vibrant, sunny yellow travertine bringing warmth to rustic and modern spaces alike. Rare and cheerful.", atmosphere: "Citrus warmth radiated from every pore of the stone.", colorPalette: "Lemon Yellow" },
    { id: "red-travertino", name: "Red Travertino", image: redTravertino, category: "Travertine", finish: "Honed", origin: "Iran", description: "A bold, saturated red travertine featuring strongly defined parallel striations in varying tones. Iranian, powerful.", atmosphere: "Persian fire striped in bold, parallel red bands.", colorPalette: "Persian Red" },
    { id: "silver-travertine-dorato", name: "Silver Travertine Dorato", image: silverTravertineDorato, category: "Travertine", finish: "Honed", origin: "Italy", description: "Sophisticated grey and silver tones layered with warm golden-brown accents. Italian refinement at its best.", atmosphere: "Silver and gold layered with the patience of Italian craft.", colorPalette: "Silver & Gold" },
    { id: "titanium-travertino", name: "Titanium Travertino", image: titaniumTravertino, category: "Travertine", finish: "Honed", origin: "Unknown", description: "A dramatic, dark-toned travertine with deep silver, charcoal, and cool grey banding. Modern and powerful.", atmosphere: "The weight of charcoal silver, raw and architectural.", colorPalette: "Titanium Grey" },
    { id: "travertino-classico", name: "Travertino Classico", image: travertinoClassico, category: "Travertine", finish: "Honed", origin: "Italy", description: "The definitive Roman stone. Warm beige with signature porous texture and parallel veining — the foundation of architectural history.", atmosphere: "The Colosseum's stone, brought to your interior.", colorPalette: "Roman Beige" },
    { id: "walnut-travertino", name: "Walnut Travertino", image: walnutTravertino, category: "Travertine", finish: "Honed", origin: "Turkey", description: "A rich, medium-brown travertine with layers of cream and dark chocolate tones. Warm, rich, and deeply inviting.", atmosphere: "Chocolate and cream, warm and endlessly inviting.", colorPalette: "Walnut Brown" },
    { id: "green-onix-indian", name: "Indian Green Onix", image: greenOnixIndian, category: "Indian Marble", finish: "Polished", origin: "India", description: "A vibrant, translucent green onyx from India characterized by rolling clouds of emerald and jade. Rare and captivating.", atmosphere: "Emerald clouds rolling through Indian stone.", colorPalette: "Emerald Green" },
    { id: "jaisalmar", name: "Jaisalmer Yellow", image: jaisalmar, category: "Indian Marble", finish: "Polished", origin: "India", description: "A famous historic Indian stone boasting a deep, rich golden-yellow tone with subtle textural variations. Heritage material.", atmosphere: "Golden desert light captured in Rajasthani stone.", colorPalette: "Jaisalmer Gold" },
    { id: "udaipur-green", name: "Udaipur Green", image: udaipurGreen, category: "Indian Marble", finish: "Polished", origin: "India", description: "Also known as Verde Guatemala, this classic deep forest-green marble features bold striking white and light green veins.", atmosphere: "Forest green veined with the white light of India.", colorPalette: "Forest Green" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const stoneMap: Record<string, StoneEntry> = Object.fromEntries(allStones.map((s) => [s.id, s]));

function getSiblings(stone: StoneEntry): StoneEntry[] {
    return allStones.filter((s) => s.category === stone.category && s.id !== stone.id).slice(0, 7);
}

// ─── Panel components ──────────────────────────────────────────────────────────

// Panel 1: Hero + Specs
const HeroPanel = ({
    stone,
    siblings,
    currentPanel,
    totalPanels,
    onNext,
    onBack,
}: {
    stone: StoneEntry;
    siblings: StoneEntry[];
    currentPanel: number;
    totalPanels: number;
    onNext: () => void;
    onBack: () => void;
}) => {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-screen flex-shrink-0 flex flex-col md:flex-row overflow-hidden" style={{ background: "#d6d6d6" }}>
            {/* Top/Left – large image */}
            <div className="w-full md:w-[50%] h-[40vh] md:h-full relative overflow-hidden flex-shrink-0">
                <motion.img
                    src={stone.image}
                    alt={stone.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>

            {/* Bottom/Right – info */}
            <div className="w-full md:w-[50%] flex-1 md:h-full flex flex-col justify-between px-5 py-5 md:px-12 md:py-12 relative overflow-y-auto">
                {/* Logo */}
                <button
                    onClick={() => navigate("/")}
                    className="self-start text-[13px] font-semibold tracking-[0.12em] text-[#3b2a1a] uppercase hover:opacity-70 transition-opacity mb-3 md:mb-0"
                >
                    Cosmo
                </button>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Name */}
                    <h1
                        className="leading-none mb-3 md:mb-5"
                        style={{
                            fontFamily: "Georgia, 'Times New Roman', serif",
                            fontSize: "clamp(32px, 7vw, 96px)",
                            color: "#3b2a1a",
                            fontWeight: 400,
                        }}
                    >
                        {stone.name}
                    </h1>

                    {/* Description */}
                    <p className="text-sm text-[#3b2a1a]/70 leading-relaxed mb-5 md:mb-10 max-w-[420px]">
                        {stone.description}
                    </p>

                    {/* Specifications table */}
                    <div className="mb-5 md:mb-10">
                        <p
                            className="text-[11px] uppercase tracking-[0.18em] text-[#3b2a1a]/50 mb-3 md:mb-4"
                            style={{ fontFamily: "system-ui, sans-serif" }}
                        >
                            Specifications
                        </p>
                        <div className="flex flex-col gap-0 border-t border-[#3b2a1a]/15">
                            {[
                                { label: "Products", value: siblings.length + 1 },
                                { label: "Materials", value: "Natural Stone" },
                                { label: "Color palette", value: stone.colorPalette },
                                { label: "Finish", value: stone.finish },
                                { label: "Origin", value: stone.origin },
                            ].map(({ label, value }) => (
                                <div
                                    key={label}
                                    className="flex justify-between items-center py-2 md:py-3 border-b border-[#3b2a1a]/15"
                                >
                                    <span className="text-[12px] text-[#3b2a1a]/50">{label}</span>
                                    <span className="text-[12px] font-medium text-[#3b2a1a]">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nav arrows + scroll hint */}
                    <div className="flex items-center gap-3 md:gap-4">
                        <button
                            onClick={onBack}
                            disabled={currentPanel === 0}
                            className="w-8 h-8 md:w-9 md:h-9 border border-[#3b2a1a]/30 flex items-center justify-center hover:border-[#3b2a1a]/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Previous panel"
                        >
                            <ArrowLeft size={14} color="#3b2a1a" />
                        </button>
                        <button
                            onClick={onNext}
                            disabled={currentPanel === totalPanels - 1}
                            className="w-8 h-8 md:w-9 md:h-9 border border-[#3b2a1a]/30 flex items-center justify-center hover:border-[#3b2a1a]/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Next panel"
                        >
                            <ArrowRight size={14} color="#3b2a1a" />
                        </button>
                        <span className="text-[11px] text-[#3b2a1a]/40 tracking-wide ml-1 md:ml-2 hidden sm:inline">
                            Scroll to explore
                        </span>
                    </div>
                </motion.div>

                {/* Category badge */}
                <div className="self-start mt-3 md:mt-0">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#3b2a1a]/40">
                        {stone.category}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Panel 2: Atmosphere
const AtmospherePanel = ({ stone }: { stone: StoneEntry }) => (
    <div className="w-screen h-screen flex-shrink-0 flex overflow-hidden relative" style={{ background: "#c8c8c8" }}>
        {/* Mobile: full-bleed image with text overlay */}
        {/* Desktop: side-by-side layout */}

        {/* Left – text area (hidden on mobile, shown as overlay instead) */}
        <div className="hidden md:flex w-[30%] h-full items-center justify-start px-12 py-16">
            <motion.p
                className="text-sm leading-relaxed max-w-[240px]"
                style={{ color: "#3b2a1a", fontFamily: "Georgia, serif", fontStyle: "italic" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
                {stone.atmosphere}
            </motion.p>
        </div>

        {/* Image – full width on mobile, 70% on desktop */}
        <div className="w-full md:w-[70%] h-full overflow-hidden relative">
            <motion.img
                src={stone.image}
                alt={`${stone.name} atmosphere`}
                className="w-full h-full object-cover"
                style={{ objectPosition: "center" }}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#c8c8c8]/30 via-transparent to-transparent pointer-events-none hidden md:block" />
            {/* Mobile text overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none md:hidden" />
        </div>

        {/* Mobile-only text overlay */}
        <motion.div
            className="absolute bottom-12 left-5 right-5 md:hidden"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
            <p
                className="text-sm leading-relaxed text-white/90 max-w-[280px]"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
                {stone.atmosphere}
            </p>
        </motion.div>
    </div>
);

// Panel 3: Products Grid
const ProductsPanel = ({
    stone,
    siblings,
    onSelectStone,
}: {
    stone: StoneEntry;
    siblings: StoneEntry[];
    onSelectStone: (s: StoneEntry) => void;
}) => {
    const products = [stone, ...siblings];

    return (
        <div
            className="w-screen h-screen flex-shrink-0 overflow-hidden flex flex-col md:flex-row"
            style={{ background: "#c8c8c8" }}
        >
            {/* Top/Left label */}
            <div className="w-full md:w-[28%] flex-shrink-0 md:h-full flex items-center px-5 pt-5 pb-3 md:px-12 md:py-0">
                <motion.h2
                    className="leading-snug"
                    style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontSize: "clamp(20px, 3vw, 38px)",
                        color: "#3b2a1a",
                        fontWeight: 400,
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    Products from<br />this collection
                </motion.h2>
            </div>

            {/* Bottom/Right grid */}
            <div className="flex-1 h-full overflow-y-auto px-4 md:pr-8 md:pl-4 py-4 md:py-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-fr">
                    {products.map((p, i) => (
                        <motion.button
                            key={p.id}
                            className="relative group aspect-square overflow-hidden bg-stone-200 cursor-pointer text-left"
                            style={{ borderRadius: 2 }}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            onClick={() => onSelectStone(p)}
                        >
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Expand icon */}
                            <div className="absolute top-2 right-2 w-6 h-6 md:w-7 md:h-7 bg-white/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 md:transition-opacity md:duration-300">
                                <Maximize2 size={12} color="#3b2a1a" />
                            </div>
                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 px-2 md:px-3 py-1.5 md:py-2 bg-gradient-to-t from-black/30 to-transparent">
                                <p className="text-[10px] md:text-[11px] text-white/90 tracking-wide truncate">{p.name}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── Main page ─────────────────────────────────────────────────────────────────
const CollectionDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [currentPanel, setCurrentPanel] = useState(0);
    const [viewedStone, setViewedStone] = useState<StoneEntry | null>(null);
    const totalPanels = 3;
    const isScrolling = useRef(false);
    const touchStartY = useRef(0);

    const stone = id ? stoneMap[id] : null;

    // Redirect if stone not found
    useEffect(() => {
        if (id && !stone) navigate("/", { replace: true });
    }, [id, stone, navigate]);

    // Reset panel on ID change
    useEffect(() => {
        setCurrentPanel(0);
    }, [id]);

    // Disable body scroll while on this page
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const goNext = useCallback(() => {
        setCurrentPanel((p) => Math.min(p + 1, totalPanels - 1));
    }, []);

    const goPrev = useCallback(() => {
        setCurrentPanel((p) => Math.max(p - 1, 0));
    }, []);

    // Wheel scroll
    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (isScrolling.current) return;
            isScrolling.current = true;
            if (e.deltaY > 0) goNext();
            else goPrev();
            setTimeout(() => { isScrolling.current = false; }, 900);
        };
        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel);
    }, [goNext, goPrev]);

    // Touch swipe
    useEffect(() => {
        const onTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };
        const onTouchEnd = (e: TouchEvent) => {
            const delta = touchStartY.current - e.changedTouches[0].clientY;
            if (Math.abs(delta) < 40) return;
            if (delta > 0) goNext();
            else goPrev();
        };
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => {
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [goNext, goPrev]);

    // Keyboard
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [goNext, goPrev]);

    if (!stone) return null;

    const siblings = getSiblings(stone);
    const activeStone = viewedStone ?? stone;
    const activeSiblings = getSiblings(activeStone);

    return (
        <div className="fixed inset-0 overflow-hidden" style={{ background: "#d6d6d6" }}>
            {/* Horizontal track */}
            <div
                className="flex h-full"
                style={{
                    width: `${totalPanels * 100}vw`,
                    transform: `translateX(-${currentPanel * 100}vw)`,
                    transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                    willChange: "transform",
                }}
            >
                <HeroPanel
                    stone={activeStone}
                    siblings={activeSiblings}
                    currentPanel={currentPanel}
                    totalPanels={totalPanels}
                    onNext={goNext}
                    onBack={goPrev}
                />
                <AtmospherePanel stone={activeStone} />
                <ProductsPanel
                    stone={activeStone}
                    siblings={activeSiblings}
                    onSelectStone={(s) => {
                        setViewedStone(s);
                        setCurrentPanel(0);
                    }}
                />
            </div>

            {/* Fixed bottom bar — Menu (always visible) */}
            <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center shadow-lg">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-[#252525] text-white hover:bg-[#1a1a1a] transition-colors rounded-sm"
                >
                    <Menu size={15} />
                    <span className="text-[12px] md:text-[13px] font-medium tracking-wide">menu</span>
                </button>
            </div>

            {/* Panel progress indicator */}
            <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50 flex items-center gap-1.5 md:gap-2">
                {Array.from({ length: totalPanels }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPanel(i)}
                        className="transition-all duration-500 rounded-full"
                        style={{
                            width: i === currentPanel ? 22 : 7,
                            height: 5,
                            background: i === currentPanel ? "#3b2a1a" : "rgba(59,42,26,0.25)",
                        }}
                        aria-label={`Go to panel ${i + 1}`}
                    />
                ))}
            </div>

            {/* Viewing a product from the grid – lightbox preview */}
            <AnimatePresence>
                {viewedStone && viewedStone.id !== stone.id && currentPanel < 2 && (
                    <motion.div
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm shadow-md rounded-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <span className="text-[12px] text-stone-600">Viewing:</span>
                        <span className="text-[12px] font-semibold text-stone-900">{viewedStone.name}</span>
                        <button
                            onClick={() => { setViewedStone(null); setCurrentPanel(0); }}
                            className="ml-2 text-[11px] text-stone-400 hover:text-stone-700 underline"
                        >
                            Reset
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CollectionDetail;
