
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import i18n from '@/lib/i18n';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => Promise<void>;
  supportedLanguages: Array<{ code: string; name: string }>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const supportedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'Telugu' },
  { code: 'hi', name: 'Hindi' }
];

// Simple translation function
const getTranslation = (key: string, language: string): string => {
  const keys = key.split('.');
  let result: any = i18n.getResourceBundle(language, 'common');
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      // Fallback to English if key not found
      result = i18n.getResourceBundle('en', 'common');
      for (const fallbackKey of keys) {
        if (result && typeof result === 'object' && fallbackKey in result) {
          result = result[fallbackKey];
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }
  
  return typeof result === 'string' ? result : key;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  // Load user's saved language preference on login
  useEffect(() => {
    const loadUserLanguage = async () => {
      if (user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('language_preference')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching user language preference:', error);
          } else if (profile?.language_preference) {
            await changeLanguage(profile.language_preference);
          }
        } catch (error) {
          console.error('Error loading user language:', error);
        }
      } else {
        // For guests, use localStorage preference
        const savedLanguage = localStorage.getItem('i18nextLng') || 'en';
        if (savedLanguage !== currentLanguage) {
          await changeLanguage(savedLanguage);
        }
      }
    };

    loadUserLanguage();
  }, [user]);

  const changeLanguage = async (language: string) => {
    try {
      // Change language in i18n
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);

      if (user) {
        // Save to Supabase for logged-in users
        const { error } = await supabase
          .from('profiles')
          .update({ language_preference: language })
          .eq('id', user.id);

        if (error) {
          console.error('Error saving language preference:', error);
        }
      } else {
        // Save to localStorage for guests
        localStorage.setItem('i18nextLng', language);
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const t = (key: string): string => {
    return getTranslation(key, currentLanguage);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    supportedLanguages,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
