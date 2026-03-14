import AboutSection from "@/components/AboutSection";
import AdminPanel from "@/components/AdminPanel";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import Footer from "@/components/Footer";
import GalleryPage from "@/components/GalleryPage";
import GoldenBackground from "@/components/GoldenBackground";
import HeroSection from "@/components/HeroSection";
import LocationSection from "@/components/LocationSection";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/context/LanguageContext";
import { UserProvider } from "@/context/UserContext";
import { useEffect, useState } from "react";

type Page = "home" | "gallery";

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(() =>
    window.location.hash === "#gallery" ? "gallery" : "home",
  );

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#admin") {
        setAdminOpen(true);
      } else if (window.location.hash === "#gallery") {
        setCurrentPage("gallery");
      } else {
        setCurrentPage("home");
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const goHome = () => {
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search,
    );
    setCurrentPage("home");
  };

  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col relative">
          <GoldenBackground />
          <Navbar />
          <main className="flex-1 pt-16 lg:pt-20">
            {currentPage === "gallery" ? (
              <GalleryPage onBack={goHome} />
            ) : (
              <>
                <HeroSection />
                <AboutSection />
                <BookingSection />
                <ContactSection />
                <LocationSection />
              </>
            )}
          </main>
          {currentPage === "home" && (
            <Footer onAdminClick={() => setAdminOpen(true)} />
          )}
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
