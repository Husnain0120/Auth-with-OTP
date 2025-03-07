import Benefits from "@/components/homePage/Benefits";
import CTA from "@/components/homePage/CTA";
import Footer from "@/components/homePage/Footer";
import Hero from "@/components/homePage/Hero";
import HowItWorks from "@/components/homePage/HowitWorks";
import Implementation from "@/components/homePage/implementation";
import Navbar from "@/components/homePage/Navbar";
import UseCases from "@/components/homePage/UseCases";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <Hero />
        <HowItWorks />
        <Benefits />
        <Implementation />
        <UseCases />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
