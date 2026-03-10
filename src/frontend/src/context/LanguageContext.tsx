import { type ReactNode, createContext, useContext, useState } from "react";

export type Language = "en" | "ml";

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Nav
  navHome: { en: "Home", ml: "ഹോം" },
  navBookNow: { en: "Book Now", ml: "ഇപ്പോൾ ബുക്ക് ചെയ്യൂ" },
  navAbout: { en: "About", ml: "ഞങ്ങളെ കുറിച്ച്" },
  navContact: { en: "Contact", ml: "ബന്ധപ്പെടുക" },
  langToggle: { en: "മലയാളം", ml: "English" },

  // Hero
  heroTitle: {
    en: "Pallikudath Vishnumaya Temple",
    ml: "പള്ളിക്കുടത്ത് വിഷ്ണുമായ ക്ഷേത്രം",
  },
  heroTagline: {
    en: "A Sacred Abode of Lord Vishnumaya — Where Devotion Meets Divinity",
    ml: "ഭഗവാൻ വിഷ്ണുമായയുടെ പുണ്യ ഭവനം — ഭക്തിയും ദൈവത്വവും സംഗമിക്കുന്നിടം",
  },
  heroSubtitle: {
    en: "Experience divine blessings through our sacred rituals",
    ml: "ഞങ്ങളുടെ പവിത്ര ആചാരങ്ങളിലൂടെ ദൈവിക അനുഗ്രഹം അനുഭവിക്കൂ",
  },
  heroCta: { en: "Book Now", ml: "ഇപ്പോൾ ബുക്ക് ചെയ്യൂ" },

  // Booking section
  bookingTitle: { en: "Book Now", ml: "ഇപ്പോൾ ബുക്ക് ചെയ്യൂ" },
  bookingSubtitle: {
    en: "Fill in your details to schedule a booking with the temple",
    ml: "ക്ഷേത്രവുമായി ഒരു ബുക്കിംഗ് ഷെഡ്യൂൾ ചെയ്യാൻ നിങ്ങളുടെ വിവരങ്ങൾ പൂരിപ്പിക്കൂ",
  },
  devoteeName: { en: "Devotee Name", ml: "ഭക്തന്റെ പേര്" },
  devoteeNamePlaceholder: {
    en: "Enter your full name",
    ml: "നിങ്ങളുടെ പൂർണ്ണ പേര്",
  },
  phoneNumber: { en: "Phone Number", ml: "ഫോൺ നമ്പർ" },
  phoneNumberPlaceholder: {
    en: "Enter your phone number",
    ml: "നിങ്ങളുടെ ഫോൺ നമ്പർ",
  },
  whichPooja: { en: "Which pooja do you want?", ml: "ഏത് പൂജ വേണം?" },
  whichPoojaPlaceholder: {
    en: "Describe the pooja or ritual you want...",
    ml: "നിങ്ങൾ ആഗ്രഹിക്കുന്ന പൂജ അല്ലെങ്കിൽ ആചാരം വിവരിക്കൂ...",
  },
  preferredDate: { en: "Preferred Date", ml: "ഇഷ്ടപ്പെട്ട തീയതി" },
  submitBooking: { en: "Submit Booking", ml: "ബുക്കിംഗ് സമർപ്പിക്കൂ" },
  submitting: { en: "Submitting...", ml: "സമർപ്പിക്കുന്നു..." },
  bookingSuccess: {
    en: "🙏 Your booking has been submitted successfully! May the divine blessings be with you.",
    ml: "🙏 നിങ്ങളുടെ ബുക്കിംഗ് വിജയകരമായി സമർപ്പിച്ചു! ദൈവിക അനുഗ്രഹം നിങ്ങളോടൊപ്പം ഉണ്ടാകട്ടെ.",
  },
  bookingError: {
    en: "Unable to submit booking. Please try again.",
    ml: "ബുക്കിംഗ് സമർപ്പിക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കൂ.",
  },
  bookAnother: { en: "Make Another Booking", ml: "മറ്റൊരു ബുക്കിംഗ് ചെയ്യൂ" },
  allFieldsRequired: {
    en: "Please fill in all fields.",
    ml: "എല്ലാ ഫീൽഡുകളും പൂരിപ്പിക്കൂ.",
  },

  // About section
  aboutTitle: { en: "About the Temple", ml: "ക്ഷേത്രത്തെ കുറിച്ച്" },
  aboutHistory: { en: "History & Heritage", ml: "ചരിത്രവും പൈതൃകവും" },
  aboutHistoryText: {
    en: "Pallikudath Vishnumaya Temple is an ancient and sacred temple dedicated to Lord Vishnumaya, a revered deity in Kerala's spiritual tradition. The temple has been a center of devotion for generations, drawing thousands of devotees who seek divine blessings, healing, and spiritual solace.",
    ml: "പള്ളിക്കുടത്ത് വിഷ്ണുമായ ക്ഷേത്രം കേരളത്തിന്റെ ആത്മീയ പാരമ്പര്യത്തിൽ ആദരണീയ ദേവതയായ ഭഗവാൻ വിഷ്ണുമായക്ക് സമർപ്പിതമായ ഒരു പുരാതന പവിത്ര ക്ഷേത്രമാണ്.",
  },
  aboutVishnumaya: { en: "Lord Vishnumaya", ml: "ഭഗവാൻ വിഷ്ണുമായ" },
  aboutVishnumayaText: {
    en: "Lord Vishnumaya, also known as Kuttichathan, is a powerful and benevolent deity unique to Kerala. Born to Lord Shiva and Goddess Parvati, Vishnumaya is considered the destroyer of evil and the protector of devotees.",
    ml: "കുട്ടിച്ചാത്തൻ എന്നും അറിയപ്പെടുന്ന ഭഗവാൻ വിഷ്ണുമായ കേരളത്തിന് അദ്വിതീയമായ ഒരു ശക്തനും ദയാലുവുമായ ദേവതയാണ്.",
  },
  aboutSignificance: { en: "Spiritual Significance", ml: "ആത്മീയ പ്രാധാന്യം" },
  aboutSignificanceText: {
    en: "The temple is known for its powerful rituals that have brought relief and blessings to countless devotees. Devotees from across Kerala and beyond visit this sacred abode to experience the divine grace of Vishnumaya.",
    ml: "എണ്ണമറ്റ ഭക്തർക്ക് ആശ്വാസവും അനുഗ്രഹവും നൽകിയ ശക്തമായ ആചാരങ്ങൾക്ക് ഈ ക്ഷേത്രം പ്രസിദ്ധമാണ്.",
  },

  // Contact section
  contactTitle: { en: "Contact & Location", ml: "ബന്ധപ്പെടുക & സ്ഥലം" },
  address: { en: "Address", ml: "വിലാസം" },
  addressText: {
    en: "Pallikudath Vishnumaya Temple, Kerala, India",
    ml: "പള്ളിക്കുടത്ത് വിഷ്ണുമായ ക്ഷേത്രം, കേരള, ഇന്ത്യ",
  },
  phone: { en: "Phone", ml: "ഫോൺ" },
  phoneText: { en: "+91 00000 00000", ml: "+91 00000 00000" },
  openingHours: { en: "Opening Hours", ml: "തുറക്കുന്ന സമയം" },
  morningHours: {
    en: "Morning: 5:00 AM – 12:00 PM",
    ml: "രാവിലെ: 5:00 AM – 12:00 PM",
  },
  eveningHours: {
    en: "Evening: 4:00 PM – 8:30 PM",
    ml: "വൈകുന്നേരം: 4:00 PM – 8:30 PM",
  },
  allDaysOpen: { en: "Open all days", ml: "എല്ലാ ദിവസവും തുറക്കും" },
  getDirections: { en: "Get Directions", ml: "ദിശകൾ നേടൂ" },

  // Footer
  footerRights: { en: "All rights reserved.", ml: "എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തമാണ്." },
  footerBuilt: {
    en: "Built with love using",
    ml: "ഉപയോഗിച്ച് സ്നേഹത്തോടെ നിർമ്മിച്ചത്",
  },

  // Currency
  rupee: { en: "₹", ml: "₹" },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "ml" : "en"));
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] ?? entry.en ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
