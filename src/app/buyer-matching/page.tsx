
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
    image: PlaceHolderImages.find(i => i.id === 'buyer-warehouse')?.imageUrl
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
    tags: ["Bulk Only", "Premium Apple"],
    image: "https://picsum.photos/seed/agro/600/400"
  },
  {
    id: 3,
    name: "Rural Mart Co-op",
    location: "State Mandi Area",
    distance: "5 km",
    rating: 4.2,
    offeredPrice: 42.0,
    capacity: "100 Tons",
    verified: false,
    tags: ["Small Lots", "Local Pick-up"],
    image: "https://picsum.photos/seed/coop/600/400"
  },
  {
    id: 4,
    name: "Global Grain Corp",
    location: "Dry Port Zone",
    distance: "45 km",
    rating: 4.9,
    offeredPrice: 50.1,
    capacity: "2000 Tons",
    verified: true,
    tags: ["Export Quality", "Long-term Contract"],
    image: "https://picsum.photos/seed/grain/600/400"
  }
];

export default function BuyerMatching() {
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
          <h1 className="text-3xl font-bold font-headline text-primary">Buyer Matching</h1>
          <p className="text-muted-foreground">Find verified buyers ready to purchase your produce at competitive prices.</p>
          
          <form onSubmit={handleSearch} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground uppercase">Crop Type</label>
              <Select defaultValue="potato">
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="potato">Potato</SelectItem>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="pulses">Pulses</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground uppercase">Quantity (Tons)</label>
              <Input type="number" placeholder="e.g. 10" className="bg-background" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground uppercase">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="City or District" className="pl-9 bg-background" />
              </div>
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                <Search className="w-4 h-4 mr-2" />
                Find Buyers
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-headline flex items-center gap-2">
            Nearby Verified Buyers
            <Badge variant="secondary" className="bg-primary/10 text-primary">{results.length} results</Badge>
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">Sort by Price</Button>
            <Button variant="outline" size="sm" className="rounded-full">Sort by Distance</Button>
          </div>
        </div>

        {searching ? (
          <div className="grid md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 bg-card rounded-3xl border" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {results.map((buyer) => (
              <Card key={buyer.id} className="overflow-hidden group hover:shadow-xl transition-all border-primary/10">
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
                    <Image 
                      src={buyer.image || 'https://picsum.photos/seed/default/400/300'} 
                      alt={buyer.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      data-ai-hint="warehouse logistics"
                    />
                    {buyer.verified && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        <span className="text-[10px] font-bold text-green-700 uppercase">Verified</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold font-headline group-hover:text-accent transition-colors">{buyer.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded-full">
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
                        <span className="text-[10px] uppercase font-bold text-muted-foreground block">Offered Price</span>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="text-lg font-bold text-primary">{buyer.offeredPrice}</span>
                          <span className="text-xs text-muted-foreground">/Qt</span>
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground block">Requirement</span>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4 text-primary" />
                          <span className="text-lg font-bold text-primary">{buyer.capacity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {buyer.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-secondary px-2 py-0.5 rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-accent hover:bg-accent/90 rounded-xl">Contact Buyer</Button>
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

      <section className="bg-primary/5 rounded-3xl p-12 text-center border border-primary/10">
        <h2 className="text-2xl font-bold font-headline mb-4">Are you a bulk buyer?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Join our network of verified procurement partners and get access to high-quality produce directly from regional farms.
        </p>
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 rounded-full">
          Register as Buyer
        </Button>
      </section>
    </div>
  );
}
