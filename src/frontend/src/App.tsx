import AboutSection from "@/components/AboutSection";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 lg:pt-20">
          <HeroSection />
          <BookingSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <Toaster />
    </LanguageProvider>
  );
}
