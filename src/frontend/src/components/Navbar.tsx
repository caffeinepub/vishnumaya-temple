import GalleryModal from "@/components/GalleryModal";
import NotificationPanel from "@/components/NotificationPanel";
import RegisterModal from "@/components/RegisterModal";
import TokenModal from "@/components/TokenModal";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { Bell, BellOff, Images, Menu, Ticket, X } from "lucide-react";
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
  const { user, notificationsEnabled, toggleNotifications } = useUser();
  const [open, setOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const displayName = user
    ? user.name.length > 12
      ? `${user.name.slice(0, 12)}…`
      : user.name
    : null;

  const handleBellClick = () => {
    if (notificationsEnabled) {
      setNotifPanelOpen((v) => !v);
    }
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

              {/* Gallery button */}
              <button
                type="button"
                data-ocid="nav.gallery.open_modal_button"
                onClick={() => setGalleryOpen(true)}
                title={t("navGallery")}
                aria-label={t("navGallery")}
                className="flex items-center gap-1.5 text-temple-gold hover:bg-temple-gold/10 border border-temple-gold/50 rounded-md px-2.5 py-1 transition-colors text-sm font-body"
              >
                <Images size={15} />
                {t("navGallery")}
              </button>

              {/* Token button */}
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

              {/* Registered user name or Register button */}
              {user ? (
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  <span className="text-white font-body text-sm">
                    {displayName}
                  </span>
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

              {/* Bell */}
              {user && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    data-ocid="nav.notifications.open_modal_button"
                    onClick={handleBellClick}
                    title={
                      notificationsEnabled
                        ? t("notificationsOn")
                        : t("notificationsOff")
                    }
                    aria-label={
                      notificationsEnabled
                        ? t("notificationsOn")
                        : t("notificationsOff")
                    }
                    className="relative flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-temple-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-gold"
                  >
                    {notificationsEnabled ? (
                      <Bell
                        size={20}
                        className="text-temple-gold fill-temple-gold/30"
                      />
                    ) : (
                      <BellOff size={20} className="text-gray-500" />
                    )}
                  </button>
                  <button
                    type="button"
                    data-ocid="nav.notifications.toggle"
                    onClick={toggleNotifications}
                    title={
                      notificationsEnabled
                        ? "Turn off notifications"
                        : "Turn on notifications"
                    }
                    aria-label={
                      notificationsEnabled
                        ? "Turn off notifications"
                        : "Turn on notifications"
                    }
                    className="text-xs px-1.5 py-0.5 rounded border transition-colors"
                    style={{
                      borderColor: notificationsEnabled ? "#b8860b" : "#555",
                      color: notificationsEnabled ? "#b8860b" : "#888",
                    }}
                  >
                    {notificationsEnabled ? "ON" : "OFF"}
                  </button>
                </div>
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
              {/* Gallery button mobile */}
              <button
                type="button"
                data-ocid="nav.gallery.open_modal_button"
                onClick={() => setGalleryOpen(true)}
                title={t("navGallery")}
                aria-label={t("navGallery")}
                className="flex items-center justify-center w-8 h-8 rounded-full text-temple-gold hover:bg-temple-gold/10 transition-colors"
              >
                <Images size={18} />
              </button>

              {/* Token button mobile */}
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

              {user ? (
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  <span className="text-white font-body text-xs">
                    {displayName}
                  </span>
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

              {/* Notification bell mobile */}
              {user && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    data-ocid="nav.notifications.open_modal_button"
                    onClick={handleBellClick}
                    title={
                      notificationsEnabled
                        ? t("notificationsOn")
                        : t("notificationsOff")
                    }
                    aria-label={
                      notificationsEnabled
                        ? t("notificationsOn")
                        : t("notificationsOff")
                    }
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-temple-gold/10"
                  >
                    {notificationsEnabled ? (
                      <Bell
                        size={18}
                        className="text-temple-gold fill-temple-gold/30"
                      />
                    ) : (
                      <BellOff size={18} className="text-gray-500" />
                    )}
                  </button>
                  <button
                    type="button"
                    data-ocid="nav.notifications.toggle"
                    onClick={toggleNotifications}
                    className="text-xs px-1 py-0.5 rounded border"
                    style={{
                      borderColor: notificationsEnabled ? "#b8860b" : "#555",
                      color: notificationsEnabled ? "#b8860b" : "#888",
                    }}
                  >
                    {notificationsEnabled ? "ON" : "OFF"}
                  </button>
                </div>
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

      <NotificationPanel
        open={notifPanelOpen}
        onClose={() => setNotifPanelOpen(false)}
      />

      <TokenModal open={tokenOpen} onClose={() => setTokenOpen(false)} />

      <GalleryModal open={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </>
  );
}
