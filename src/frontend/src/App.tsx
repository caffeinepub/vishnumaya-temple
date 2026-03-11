import AboutSection from "@/components/AboutSection";
import AdminPanel from "@/components/AdminPanel";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import Footer from "@/components/Footer";
import GoldenBackground from "@/components/GoldenBackground";
import HeroSection from "@/components/HeroSection";
import LocationSection from "@/components/LocationSection";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/context/LanguageContext";
import { UserProvider } from "@/context/UserContext";
import { useEffect, useState } from "react";

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#admin") {
        setAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col relative">
          <GoldenBackground />
          <Navbar />
          <main className="flex-1 pt-16 lg:pt-20">
            <HeroSection />
            <AboutSection />
            <BookingSection />
            <ContactSection />
            <LocationSection />
          </main>
          <Footer onAdminClick={() => setAdminOpen(true)} />
          <FloatingContactButton />
        </div>
        <Toaster />
        <AdminPanel
          open={adminOpen}
          onClose={() => {
            setAdminOpen(false);
            if (window.location.hash === "#admin") {
              history.pushState(
                "",
                document.title,
                window.location.pathname + window.location.search,
              );
            }
          }}
        />
      </UserProvider>
    </LanguageProvider>
  );
}
