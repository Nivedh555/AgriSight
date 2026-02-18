
"use client";

import { useLanguage } from '@/context/LanguageContext';
import { languages } from '@/lib/translations';
import { Sprout } from 'lucide-react';
import { useState, useEffect } from 'react';

export function LanguageModal() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure we are on the client before deciding to show/hide
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by not rendering anything on server
  if (!mounted) return null;

  // Only show the modal if no language is currently set in state
  if (language !== null) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="max-w-2xl w-full space-y-12">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-primary p-4 rounded-3xl text-primary-foreground">
            <Sprout className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold font-headline tracking-tight text-primary">AgriSight</h1>
          <p className="text-xl text-muted-foreground font-medium">Please select your preferred language</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="h-[60px] flex items-center justify-between px-8 bg-card border-2 border-primary/10 hover:border-accent hover:bg-accent/5 rounded-2xl transition-all group shadow-sm hover:shadow-md"
            >
              <span className="text-lg font-bold group-hover:text-accent transition-colors">{lang.native}</span>
              <span className="text-sm text-muted-foreground italic">{lang.label}</span>
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground opacity-60">
          Selected language will be saved for your next visit.
        </p>
      </div>
    </div>
  );
}
