import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MobileCallBar } from "./components/MobileCallBar";
import { Bandeau } from "./components/Bandeau";
import { Hero } from "./sections/Hero";
import { Atouts } from "./sections/Atouts";
import { NosPizzas } from "./sections/NosPizzas";
import { Carte } from "./sections/Carte";
import { PizzaDuMoment } from "./sections/PizzaDuMoment";
import { Avis } from "./sections/Avis";
import { Histoire } from "./sections/Histoire";
import { OuNousTrouver } from "./sections/OuNousTrouver";
import { Appel } from "./sections/Appel";
import { Legal } from "./sections/Legal";
import { siteConfig } from "./config/site";

function App() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-tomato-500 focus:px-5 focus:py-3 focus:font-semibold focus:text-cream"
      >
        Aller au contenu principal
      </a>

      <Header />

      <main id="contenu">
        <Hero />

        {/* Bandeau défilant : la transition entre le héros sombre et la suite */}
        <div className="filet-tricolore h-1.5" />
        <div className="bg-tomato-500 py-3 text-cream">
          <Bandeau mots={siteConfig.bandeau} />
        </div>

        <Atouts />
        <NosPizzas />
        <Carte />
        <PizzaDuMoment />
        <Avis />
        <Histoire />
        <OuNousTrouver />
        <Appel />
        <Legal />
      </main>

      <Footer />
      <MobileCallBar />
    </>
  );
}

export default App;
