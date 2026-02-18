
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Phone, Star, TrendingUp, DollarSign, Package, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/context/LanguageContext";

const CROPS = ["potato", "apple", "pulses", "tomato", "onion", "broccoli", "ginger", "greenChillies", "brinjal"] as const;

const MOCK_BUYERS = [
  {
    id: 1,
    name: "GreenValley Logistics",
    location: "Punjab, Regional Hub",
    distance: "12 km",
    rating: 4.8,
    offeredPrice: 45.5,
    capacity: "500 Tons",
    verified: true,
    tags: ["Immediate Pay", "Storage Available"],
    image: "https://picsum.photos/seed/warehouse/600/400"
  },
  {
    id: 2,
    name: "PureAgro Exports",
    location: "Haryana North",
    distance: "28 km",
    rating: 4.6,
    offeredPrice: 48.2,
    capacity: "250 Tons",
    verified: true,
    tags: ["Bulk Only", "Premium Quality"],
    image: "https://picsum.photos/seed/agro/600/400"
  }
];

export default function BuyerMatching() {
  const { t } = useLanguage();
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(MOCK_BUYERS);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-card p-8 rounded-3xl border border-primary/20 shadow-sm">
        <div className="space-y-4 flex-1">
          <h1 className="text-3xl font-bold font-headline text-primary">{t('findBuyersTitle')}</h1>
          <p className="text-muted-foreground">Find verified buyers ready to purchase your produce at competitive prices.</p>
          
          <form onSubmit={handleSearch} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground uppercase">{t('selectCrop')}</label>
              <Select defaultValue="potato">
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder={t('selectCrop')} />
                </SelectTrigger>
                <SelectContent>
                  {CROPS.map(c => (
                    <SelectItem key={c} value={c}>{t(c)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground uppercase">{t('quantity')} (Tons)</label>
              <Input type="number" placeholder="e.g. 10" className="bg-background" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground uppercase">{t('selectRegion')}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder={t('typeStateRegion')} className="pl-9 bg-background" />
              </div>
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                <Search className="w-4 h-4 mr-2" />
                {t('search')}
              </Button>
            </div>
          </form>
          <div className="flex justify-end">
             <Button variant="link" size="sm" className="text-xs text-primary h-auto p-0 flex items-center gap-1">
               <MapPin className="w-3 h-3" />
               {t('useMyLocation')}
             </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-headline flex items-center gap-2">
            Nearby Verified Buyers
            <Badge variant="secondary" className="bg-primary/10 text-primary">{results.length} results</Badge>
          </h2>
        </div>

        {searching ? (
          <div className="flex items-center justify-center p-20">
            <TrendingUp className="w-12 h-12 text-primary animate-bounce" />
            <span className="ml-4 font-bold text-lg">{t('loading')}</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {results.map((buyer) => (
              <Card key={buyer.id} className="overflow-hidden group hover:shadow-xl transition-all border-primary/10">
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
                    <Image 
                      src={buyer.image} 
                      alt={buyer.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      data-ai-hint="warehouse logistics"
                    />
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold font-headline">{buyer.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold">{buyer.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                      <MapPin className="w-3 h-3" />
                      <span>{buyer.location} • {buyer.distance}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground block">{t('offeredPrice')}</span>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="text-lg font-bold text-primary">{buyer.offeredPrice}</span>
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground block">{t('quantityNeeded')}</span>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4 text-primary" />
                          <span className="text-lg font-bold text-primary">{buyer.capacity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-accent hover:bg-accent/90 rounded-xl">{t('contact')}</Button>
                      <Button variant="outline" size="icon" className="rounded-xl">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
