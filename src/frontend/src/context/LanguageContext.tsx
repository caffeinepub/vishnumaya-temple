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
  navRegister: { en: "Register", ml: "രജിസ്റ്റർ" },
  navToken: { en: "Token", ml: "ടോക്കൺ" },
  navGallery: { en: "Gallery", ml: "ഗ്യാലറി" },
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

  // Registration
  registerTitle: {
    en: "Register with Mobile",
    ml: "മൊബൈൽ ഉപയോഗിച്ച് രജിസ്റ്റർ ചെയ്യൂ",
  },
  registerSubtitle: {
    en: "Enter your name and mobile number to register with the temple.",
    ml: "ക്ഷേത്രത്തിൽ രജിസ്റ്റർ ചെയ്യാൻ നിങ്ങളുടെ പേരും മൊബൈൽ നമ്പറും നൽകൂ.",
  },
  registerName: { en: "Full Name", ml: "പൂർണ്ണ നാമം" },
  registerNamePlaceholder: {
    en: "Enter your full name",
    ml: "നിങ്ങളുടെ പൂർണ്ണ പേര്",
  },
  registerPhone: { en: "Mobile Number", ml: "മൊബൈൽ നമ്പർ" },
  registerPhonePlaceholder: { en: "e.g. 9876543210", ml: "ഉദാ: 9876543210" },
  registerSendOTP: { en: "Send OTP", ml: "OTP അയക്കൂ" },
  registerSending: { en: "Sending...", ml: "അയക്കുന്നു..." },
  registerOTPSent: {
    en: "OTP generated. Enter the code below.",
    ml: "OTP ജനറേറ്റ് ചെയ്തു. ചുവടെ കോഡ് നൽകൂ.",
  },
  registerOTPDemoNote: {
    en: "Your OTP (demo mode — shown on screen):",
    ml: "നിങ്ങളുടെ OTP (ഡെമോ മോഡ് — സ്ക്രീനിൽ കാണിക്കുന്നു):",
  },
  registerEnterOTPLabel: { en: "Enter 6-digit OTP", ml: "6 അക്ക OTP നൽകൂ" },
  registerVerify: { en: "Verify & Register", ml: "പരിശോധിക്കൂ & രജിസ്റ്റർ" },
  registerVerifying: { en: "Verifying...", ml: "പരിശോധിക്കുന്നു..." },
  registerBack: { en: "Back", ml: "തിരിക" },
  registerSuccessTitle: {
    en: "Registration Successful!",
    ml: "രജിസ്ട്രേഷൻ വിജയകരം!",
  },
  registerSuccessMessage: {
    en: "You are now registered with Pallikudath Vishnumaya Temple. May Lord Vishnumaya bless you.",
    ml: "നിങ്ങൾ ഇപ്പോൾ പള്ളിക്കുടത്ത് വിഷ്ണുമായ ക്ഷേത്രത്തിൽ രജിസ്റ്റർ ചെയ്തു. ഭഗവാൻ വിഷ്ണുമായ നിങ്ങളെ അനുഗ്രഹിക്കട്ടെ.",
  },
  registerDone: { en: "Done", ml: "പൂർത്തിയായി" },
  registerFillAll: {
    en: "Please enter your name and phone number.",
    ml: "ദയവായി പേരും ഫോൺ നമ്പറും നൽകൂ.",
  },
  registerInvalidPhone: {
    en: "Please enter a valid mobile number.",
    ml: "ദയവായി ഒരു ശരിയായ മൊബൈൽ നമ്പർ നൽകൂ.",
  },
  registerAlreadyRegistered: {
    en: "This number is already registered.",
    ml: "ഈ നമ്പർ ഇതിനകം രജിസ്റ്റർ ചെയ്തിട്ടുണ്ട്.",
  },
  registerEnterOTP: { en: "Please enter the OTP.", ml: "ദയവായി OTP നൽകൂ." },
  registerInvalidOTP: {
    en: "Invalid OTP. Please try again.",
    ml: "തെറ്റായ OTP. ദയവായി വീണ്ടും ശ്രമിക്കൂ.",
  },
  notificationsOn: { en: "Notifications ON", ml: "അറിയിപ്പുകൾ ഓൺ" },
  notificationsOff: { en: "Notifications OFF", ml: "അറിയിപ്പുകൾ ഓഫ്" },
  registeredAs: { en: "Registered", ml: "രജിസ്റ്റർ ചെയ്തു" },
  registerError: {
    en: "Something went wrong. Please try again.",
    ml: "എന്തോ കുഴപ്പം. ദയവായി വീണ്ടും ശ്രമിക്കൂ.",
  },

  // Admin Panel
  adminPanel: { en: "Admin Panel", ml: "അഡ്മിൻ പാനൽ" },
  adminPassword: { en: "Admin Password", ml: "അഡ്മിൻ പാസ്‌വേഡ്" },
  adminLogin: { en: "Login", ml: "ലോഗിൻ" },
  adminWrongPassword: { en: "Incorrect password", ml: "തെറ്റായ പാസ്‌വേഡ്" },
  adminNotificationMessage: {
    en: "Notification Message",
    ml: "അറിയിപ്പ് സന്ദേശം",
  },
  adminPublish: {
    en: "Publish & Notify via WhatsApp",
    ml: "പ്രസിദ്ധീകരിക്കൂ & WhatsApp വഴി അറിയിക്കൂ",
  },
  adminPublishing: { en: "Publishing...", ml: "പ്രസിദ്ധീകരിക്കുന്നു..." },
  adminPublished: {
    en: "Notification published!",
    ml: "അറിയിപ്പ് പ്രസിദ്ധീകരിച്ചു!",
  },
  adminOptedInUsers: {
    en: "Send to opted-in users:",
    ml: "അറിയിപ്പ് ഓൺ ചെയ്ത ഉപയോക്താക്കൾക്ക് അയക്കൂ:",
  },
  adminNoOptedInUsers: {
    en: "No users have opted in for notifications.",
    ml: "ഒരു ഉപയോക്താവും അറിയിപ്പുകൾ ഓൺ ചെയ്തിട്ടില്ല.",
  },
  adminSendWhatsApp: { en: "Send WhatsApp to", ml: "WhatsApp അയക്കൂ" },
  adminPastNotifications: { en: "Past Notifications", ml: "മുൻ അറിയിപ്പുകൾ" },
  adminTokens: { en: "Booked Tokens", ml: "ബുക്ക് ചെയ്ത ടോക്കണുകൾ" },
  adminTokenNumber: { en: "Token #", ml: "ടോക്കൺ #" },
  adminTokenName: { en: "Name", ml: "പേര്" },
  adminTokenPhone: { en: "Phone", ml: "ഫോൺ" },
  adminNoTokens: {
    en: "No tokens booked yet.",
    ml: "ഇനിയും ടോക്കണുകൾ ബുക്ക് ചെയ്തിട്ടില്ല.",
  },
  adminGallery: { en: "Gallery", ml: "ഗ്യാലറി" },
  adminGalleryEmpty: {
    en: "No gallery items yet.",
    ml: "ഇനിയും ഗ്യാലറി ഇനങ്ങൾ ഇല്ല.",
  },
  notificationPanelTitle: { en: "Temple Notifications", ml: "ക്ഷേത്ര അറിയിപ്പുകൾ" },
  noNotifications: { en: "No notifications yet.", ml: "ഇനിയും അറിയിപ്പുകൾ ഇല്ല." },

  // Token booking
  tokenTitle: {
    en: "Book Your Temple Token",
    ml: "നിങ്ങളുടെ ക്ഷേത്ര ടോക്കൺ ബുക്ക് ചെയ്യൂ",
  },
  tokenSubtitle: {
    en: "Reserve your token before visiting the temple",
    ml: "ക്ഷേത്രം സന്ദർശിക്കുന്നതിന് മുൻപ് ടോക്കൺ ബുക്ക് ചെയ്യൂ",
  },
  tokenSelectDate: {
    en: "Select a Saturday",
    ml: "ഒരു ശനിയാഴ്ച തിരഞ്ഞെടുക്കൂ",
  },
  tokenSaturdayOnly: {
    en: "Tokens are available on Saturdays only, from 6:00 PM onwards",
    ml: "ശനിയാഴ്ചകളിൽ മാത്രം, വൈകിട്ട് 6:00 മണി മുതൽ ടോക്കണുകൾ ലഭ്യം",
  },
  tokenAvailability: {
    en: "Token Availability",
    ml: "ടോക്കൺ ലഭ്യത",
  },
  tokenNumbers: {
    en: "Tokens",
    ml: "ടോക്കണുകൾ",
  },
  tokenFromEvening: {
    en: "Available from 6:00 PM at the temple",
    ml: "ക്ഷേത്രത്തിൽ വൈകിട്ട് 6:00 മണി മുതൽ ലഭ്യം",
  },
  tokenContinue: {
    en: "Continue to Book",
    ml: "ബുക്ക് ചെയ്യാൻ തുടരൂ",
  },
  tokenChange: {
    en: "Change date",
    ml: "തീയതി മാറ്റൂ",
  },
  tokenSlot6PM: {
    en: "Please be at the temple by 6:00 PM",
    ml: "വൈകിട്ട് 6:00 മണിക്ക് ക്ഷേത്രത്തിൽ എത്തൂ",
  },
  tokenShowAtOffice: {
    en: "Show this token number at the temple office when you arrive",
    ml: "എത്തുമ്പോൾ ക്ഷേത്ര ഓഫീസിൽ ഈ ടോക്കൺ നമ്പർ കാണിക്കൂ",
  },
  tokenName: { en: "Your Name", ml: "നിങ്ങളുടെ പേര്" },
  tokenPhone: { en: "WhatsApp Number", ml: "WhatsApp നമ്പർ" },
  tokenPhonePlaceholder: { en: "e.g. 9876543210", ml: "ഉദാ: 9876543210" },
  tokenSubmit: { en: "Get Token", ml: "ടോക്കൺ നേടൂ" },
  tokenSubmitting: { en: "Booking...", ml: "ബുക്ക് ചെയ്യുന്നു..." },
  tokenSuccess: { en: "Your Token Number", ml: "നിങ്ങളുടെ ടോക്കൺ നമ്പർ" },
  tokenShareWhatsApp: { en: "Share on WhatsApp", ml: "WhatsApp-ൽ ഷെയർ ചെയ്യൂ" },
  tokenBookAnother: { en: "Book Another Token", ml: "മറ്റൊരു ടോക്കൺ ബുക്ക് ചെയ്യൂ" },
  tokenFillAll: {
    en: "Please fill in all fields.",
    ml: "എല്ലാ ഫീൽഡുകളും പൂരിപ്പിക്കൂ.",
  },
  tokenError: {
    en: "Unable to book token. Please try again.",
    ml: "ടോക്കൺ ബുക്ക് ചെയ്യാൻ കഴിഞ്ഞില്ല.",
  },

  // Gallery
  galleryTitle: { en: "Temple Gallery", ml: "ക്ഷേത്ര ഗ്യാലറി" },
  galleryUpload: { en: "Upload Photo/Video", ml: "ഫോട്ടോ/വീഡിയോ അപ്‌ലോഡ് ചെയ്യുക" },
  galleryCaption: { en: "Caption (optional)", ml: "അടിക്കുറിപ്പ് (ഐച്ഛിക)" },
  galleryEmpty: {
    en: "No photos or videos yet",
    ml: "ഇതുവരെ ഫോട്ടോകളോ വീഡിയോകളോ ഇല്ല",
  },
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
