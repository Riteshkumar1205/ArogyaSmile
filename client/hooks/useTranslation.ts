import { useEffect, useState } from 'react';
import { LanguageCode, Translations, getTranslation } from '@shared/i18n';

export const useTranslation = () => {
  const [language, setLanguage] = useState<LanguageCode>('en-IN');
  const [translations, setTranslations] = useState<Translations>(getTranslation('en-IN'));

  useEffect(() => {
    // Load language from localStorage
    const stored = localStorage.getItem('arogya_language') as LanguageCode;
    if (stored) {
      setLanguage(stored);
      setTranslations(getTranslation(stored));
    } else {
      // Default to English
      setLanguage('en-IN');
      setTranslations(getTranslation('en-IN'));
    }
  }, []);

  const changeLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    setTranslations(getTranslation(lang));
    localStorage.setItem('arogya_language', lang);
    // Update HTML lang attribute
    document.documentElement.lang = lang.split('-')[0];
    // Update speech recognition language
    const recognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (recognition) {
      const instance = new recognition();
      instance.lang = lang;
    }
  };

  return {
    language,
    t: translations,
    changeLanguage,
  };
};
