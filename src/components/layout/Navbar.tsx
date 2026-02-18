"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout, LineChart, ShieldCheck, Handshake, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { name: t('navHome'), href: "/", icon: Home },
    { name: t('navPricePredictor'), href: "/price-predictor", icon: LineChart },
    { name: t('navPolicySimulator'), href: "/policy-simulator", icon: ShieldCheck },
    { name: t('navBuyerMatching'), href: "/buyer-matching", icon: Handshake },
  ];

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-2 rounded-xl text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
            <Sprout className="w-7 h-7" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-primary font-headline hidden sm:block">
            {t('appName')}
          </span>
        </Link>

        <div className="hidden lg:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-bold transition-all hover:text-primary relative py-2",
                pathname === item.href 
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Login button removed as requested */}
        </div>
      </div>
    </nav>
  );
}
