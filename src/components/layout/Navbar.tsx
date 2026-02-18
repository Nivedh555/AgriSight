
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout, LineChart, ShieldCheck, Handshake, Languages, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { languages } from "@/lib/translations";

export function Navbar() {
  const pathname = usePathname();
  const { t, setLanguage } = useLanguage();

  const navItems = [
    { name: t('navHome'), href: "/", icon: Home },
    { name: t('navPricePredictor'), href: "/price-predictor", icon: LineChart },
    { name: t('navPolicySimulator'), href: "/policy-simulator", icon: ShieldCheck },
    { name: t('navBuyerMatching'), href: "/buyer-matching", icon: Handshake },
  ];

  return (
    <nav className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg text-primary-foreground transition-transform group-hover:scale-110">
            <Sprout className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary font-headline">{t('appName')}</span>
        </Link>

        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent",
                pathname === item.href ? "text-accent" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-accent/10 rounded-full text-muted-foreground transition-colors">
                <Languages className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((l) => (
                <DropdownMenuItem key={l.code} onClick={() => setLanguage(l.code)}>
                  {l.native} ({l.label})
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="text-sm font-semibold bg-accent text-accent-foreground px-4 py-2 rounded-full hover:bg-accent/90 transition-all shadow-sm">
            {t('login')}
          </button>
        </div>
      </div>
    </nav>
  );
}
