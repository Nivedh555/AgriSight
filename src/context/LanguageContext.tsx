
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language | null;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language | null>(null);

  useEffect(() => {
    // Client-side only initialization
    const savedLang = localStorage.getItem('agrisight_language') as Language;
    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
    } else {
      // Clear potentially invalid data
      localStorage.removeItem('agrisight_language');
      setLanguageState(null);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    localStorage.setItem('agrisight_language', lang);
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    // Fallback logic for translations
    const activeLang = language || 'en';
    const dict = translations[activeLang] || translations['en'];
    return dict[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
