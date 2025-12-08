import Footer from "../Components/Footer";
import Conatct from "../Components/Contact";
import Navbar from "../Components/Navbar";
import FAQ from "../Components/FAQ";
import Feature from "../Components/Feature";
import Trust from "../Components/Trust";
import WhyChoose from "../Components/WhyChoose";
import Hero from "../Components/Hero";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <WhyChoose />
        <Feature />
        <FAQ />
        <Conatct />
      </main>
      <Footer />
    </div>
  );
}
export default LandingPage;
