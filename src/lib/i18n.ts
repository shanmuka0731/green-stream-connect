
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    common: () => import('../../public/locales/en/common.json')
  },
  te: {
    common: () => import('../../public/locales/te/common.json')
  },
  hi: {
    common: () => import('../../public/locales/hi/common.json')
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false
    },

    resources: {},

    // Lazy loading configuration
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    ns: ['common'],
    defaultNS: 'common'
  });

// Lazy load language resources
const loadLanguageAsync = async (language: string) => {
  if (resources[language as keyof typeof resources]) {
    const translations = await resources[language as keyof typeof resources].common();
    i18n.addResourceBundle(language, 'common', translations.default || translations, true, true);
  }
};

// Load initial language
const currentLanguage = localStorage.getItem('i18nextLng') || 'en';
loadLanguageAsync(currentLanguage);

export { loadLanguageAsync };
export default i18n;
