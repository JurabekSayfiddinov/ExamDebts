
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ru from "./locales/ru";
import en from "./locales/en";
import tg from "./locales/tj";

const savedLanguage = localStorage.getItem("language");

const initialLanguage =
  savedLanguage === "ru" ||
  savedLanguage === "en" ||
  savedLanguage === "tg"
    ? savedLanguage
    : "ru";

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
    tg: { translation: tg },
  },

  lng: initialLanguage,
  fallbackLng: "ru",
  supportedLngs: ["ru", "en", "tg"],

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
