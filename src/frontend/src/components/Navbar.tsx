import RegisterModal from "@/components/RegisterModal";
import TokenModal from "@/components/TokenModal";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { LogOut, Menu, Ticket, X } from "lucide-react";
import { useState } from "react";

const navItems: Array<{
  key: string;
  href: string;
  ocid: string;
  isGallery: boolean;
}> = [
  { key: "navHome", href: "#home", ocid: "nav.home.link", isGallery: false },
  { key: "navAbout", href: "#about", ocid: "nav.about.link", isGallery: false },
  {
    key: "navGallery",
    href: "#gallery",
    ocid: "nav.gallery.link",
    isGallery: true,
  },
  {
    key: "navContact",
    href: "#contact",
    ocid: "nav.contact.link",
    isGallery: false,
  },
  {
    key: "navLocation",
    href: "#location",
    ocid: "nav.location.link",
    isGallery: false,
  },
  {
    key: "navBookNow",
    href: "#booking",
    ocid: "nav.book.link",
    isGallery: false,
  },
];

export default function Navbar() {
  const { t, toggleLanguage } = useLanguage();
  const { user, clearUser } = useUser();
  const [open, setOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);

  const displayName = user
    ? user.name.length > 12
      ? `${user.name.slice(0, 12)}…`
      : user.name
    : null;

  const handleLogout = () => {
    clearUser();
    setOpen(false);
  };

  const handleNavClick = (href: string, isGallery: boolean) => {
    if (isGallery) {
      window.location.hash = "gallery";
    } else {
      window.location.hash = href.replace("#", "");
    }
    setOpen(false);
  };

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
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  data-ocid={item.ocid}
                  className="text-white hover:text-temple-gold transition-colors font-body text-base tracking-wide"
                  onClick={(e) => {
                    if (item.isGallery) {
                      e.preventDefault();
                      window.location.hash = "gallery";
                    }
                  }}
                >
                  {t(item.key)}
                </a>
              ))}

              {/* Token button — only for registered users */}
              {user && (
                <button
                  type="button"
                  data-ocid="nav.token.open_modal_button"
                  onClick={() => setTokenOpen(true)}
                  title={t("navToken")}
                  aria-label={t("navToken")}
                  className="flex items-center gap-1.5 text-temple-gold hover:bg-temple-gold/10 border border-temple-gold/50 rounded-md px-2.5 py-1 transition-colors text-sm font-body"
                >
                  <Ticket size={15} />
                  {t("navToken")}
                </button>
              )}

              {user ? (
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  <span className="text-white font-body text-sm">
                    {displayName}
                  </span>
                  <button
                    type="button"
                    data-ocid="nav.logout.button"
                    onClick={handleLogout}
                    title="Logout"
                    aria-label="Logout"
                    className="flex items-center justify-center w-7 h-7 rounded-full text-red-400 hover:bg-red-400/10 transition-colors ml-1"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <Button
                  data-ocid="nav.register.button"
                  onClick={() => setRegisterOpen(true)}
                  variant="outline"
                  size="sm"
                  className="border-temple-gold text-temple-gold hover:bg-temple-gold hover:text-black bg-transparent font-body text-sm ml-1"
                >
                  {t("navRegister")}
                </Button>
              )}

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
              {user && (
                <button
                  type="button"
                  data-ocid="nav.token.open_modal_button"
                  onClick={() => setTokenOpen(true)}
                  title={t("navToken")}
                  aria-label={t("navToken")}
                  className="flex items-center justify-center w-8 h-8 rounded-full text-temple-gold hover:bg-temple-gold/10 transition-colors"
                >
                  <Ticket size={18} />
                </button>
              )}

              {user ? (
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  <span className="text-white font-body text-xs">
                    {displayName}
                  </span>
                  <button
                    type="button"
                    data-ocid="nav.logout.button"
                    onClick={handleLogout}
                    title="Logout"
                    aria-label="Logout"
                    className="flex items-center justify-center w-7 h-7 rounded-full text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <Button
                  data-ocid="nav.register.button"
                  onClick={() => setRegisterOpen(true)}
                  variant="outline"
                  size="sm"
                  className="border-temple-gold text-temple-gold hover:bg-temple-gold hover:text-black bg-transparent font-body text-xs"
                >
                  {t("navRegister")}
                </Button>
              )}

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
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  data-ocid={item.ocid}
                  onClick={() => handleNavClick(item.href, item.isGallery)}
                  className="text-white hover:text-temple-gold transition-colors font-body text-lg py-1 text-left"
                >
                  {t(item.key)}
                </button>
              ))}
              {user && (
                <button
                  type="button"
                  data-ocid="nav.logout.menu_button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 font-body text-lg py-1 transition-colors text-left"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
      <TokenModal open={tokenOpen} onClose={() => setTokenOpen(false)} />
    </>
  );
}
