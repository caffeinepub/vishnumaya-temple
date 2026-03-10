import RegisterModal from "@/components/RegisterModal";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { key: "navHome", href: "#home" },
  { key: "navBookNow", href: "#booking" },
  { key: "navAbout", href: "#about" },
  { key: "navContact", href: "#contact" },
] as const;

const ocids = [
  "nav.home.link",
  "nav.book.link",
  "nav.about.link",
  "nav.contact.link",
] as const;

export default function Navbar() {
  const { t, toggleLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-sm border-b border-temple-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo / Name */}
            <div className="flex items-center gap-3">
              <span className="text-temple-gold text-2xl">🪔</span>
              <div>
                <h1 className="font-display text-temple-gold text-sm sm:text-base lg:text-lg leading-tight font-bold">
                  {t("heroTitle")}
                </h1>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item, i) => (
                <a
                  key={item.key}
                  href={item.href}
                  data-ocid={ocids[i]}
                  className="text-white hover:text-temple-gold transition-colors font-body text-base tracking-wide"
                >
                  {t(item.key)}
                </a>
              ))}
              <Button
                data-ocid="nav.register.button"
                onClick={() => setRegisterOpen(true)}
                variant="outline"
                size="sm"
                className="border-temple-gold text-temple-gold hover:bg-temple-gold hover:text-black bg-transparent font-body text-sm ml-1"
              >
                {t("navRegister")}
              </Button>
              <Button
                data-ocid="nav.language.toggle"
                onClick={toggleLanguage}
                variant="outline"
                size="sm"
                className="border-temple-gold/50 text-temple-gold hover:bg-temple-gold/10 hover:text-temple-gold bg-transparent font-body text-sm"
              >
                {t("langToggle")}
              </Button>
            </nav>

            {/* Mobile controls */}
            <div className="flex lg:hidden items-center gap-2">
              <Button
                data-ocid="nav.register.button"
                onClick={() => setRegisterOpen(true)}
                variant="outline"
                size="sm"
                className="border-temple-gold text-temple-gold hover:bg-temple-gold hover:text-black bg-transparent font-body text-xs"
              >
                {t("navRegister")}
              </Button>
              <Button
                data-ocid="nav.language.toggle"
                onClick={toggleLanguage}
                variant="outline"
                size="sm"
                className="border-temple-gold/50 text-temple-gold hover:bg-temple-gold/10 hover:text-temple-gold bg-transparent font-body text-xs"
              >
                {t("langToggle")}
              </Button>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="text-white p-2"
                aria-label="Toggle menu"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-black border-t border-temple-gold/20 px-4 py-4">
            <nav className="flex flex-col gap-3">
              {navItems.map((item, i) => (
                <a
                  key={item.key}
                  href={item.href}
                  data-ocid={ocids[i]}
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-temple-gold transition-colors font-body text-lg py-1"
                >
                  {t(item.key)}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </>
  );
}
