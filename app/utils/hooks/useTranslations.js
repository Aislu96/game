// hooks/useTranslations.js
import { useState, useEffect } from "react";
import { useGameContext } from "../../context/game";

export function useTranslations() {
  const [translations, setTranslations] = useState({});
  const { language_code, setLanguage_code } = useGameContext();

  useEffect(() => {
    // Check if we're in the Telegram Web App environment
    if (window.Telegram?.WebApp) {
      // Load translations
      fetch(`/locales/${language_code}.json`)
        .then((res) => res.json())
        .then((data) => setTranslations(data))
        .catch(() => {
          // Fallback to English if translation file not found
          fetch("/locales/en.json")
            .then((res) => res.json())
            .then((data) => setTranslations(data));
        });
    }
  }, []);

  const t = (key) => translations[key] || key;

  return { t, language_code };
}
