import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

// Translation resources
const resources = {
  en: {
    translation: {
      home: "Home",
      dashboard: "Dashboard",
      profile: "Profile",
      notifications: "Notifications",
      settings: "Settings",
      logout: "Logout",
      map: "Map",
      leads: "Lead",
      payments: "Payments",
      siteSurveyForm: "Site Survey Form",
      goSolarPage: "Go Solar",
      documentProposalRef: "Document Proposal Reference",
      marketingPortal: "Marketing Portal",
      login: "Login",
      username: "Username",
      password: "Password",
      invalidCredentials: "Invalid username or password!",
    },
  },
  hi: {
    translation: {
      home: "होम",
      dashboard: "डैशबोर्ड",
      profile: "प्रोफ़ाइल",
      notifications: "सूचनाएँ",
      settings: "सेटिंग्स",
      logout: "लॉगआउट",
      map: "मानचित्र",
      leads: "लीड सूची",
      payments: "भुगतान",
      siteSurveyForm: "साइट सर्वेक्षण फॉर्म",
      goSolarPage: "गो सोलर",
      documentProposalRef: "दस्तावेज़ प्रस्ताव",
      marketingPortal: "मार्केटिंग पोर्टल",
      login: "लॉगिन",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      invalidCredentials: "अमान्य उपयोगकर्ता नाम या पासवर्ड!",

    },
  },
};


const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: (cb: any) => {
    const locales = RNLocalize.getLocales();
    cb(locales[0]?.languageCode || "en");
  },
  init: () => { },
  cacheUserLanguage: () => { },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
