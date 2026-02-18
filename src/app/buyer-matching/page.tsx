"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Search, TrendingUp, CheckCircle2, Minus, Plus, Navigation } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

const CROPS = ["potato", "apple", "pulses", "tomato", "onion", "broccoli", "ginger", "greenChillies", "brinjal"] as const;

interface Buyer {
  id: number;
  name: string;
  distance: number;
  offeredPrice: number;
  quantityNeeded: string;
}

const INITIAL_BUYERS: Buyer[] = [
  { id: 1, name: "Local Mandi", distance: 5, offeredPrice: 2150, quantityNeeded: "500 kg" },
  { id: 2, name: "Processor Co.", distance: 12, offeredPrice: 2100, quantityNeeded: "1000 kg" },
  { id: 3, name: "Exporter", distance: 25, offeredPrice: 2200, quantityNeeded: "2000 kg" },
  { id: 4, name: "Cooperative", distance: 8, offeredPrice: 2120, quantityNeeded: "750 kg" },
];

export default function BuyerMatching() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searching, setSearching] = useState(false);
  const [quantity, setQuantity] = useState(100);
  const [results, setResults] = useState<Buyer[]>(INITIAL_BUYERS);
  const [locationLoading, setLocationLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    setTimeout(() => {
      const updated = [...INITIAL_BUYERS].sort((a, b) => a.distance - b.distance);
      setResults(updated);
      setSearching(false);
    }, 800);
  };

  const handleUseLocation = () => {
    setLocationLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          toast({
            title: "Location Updated",
            description: "Showing buyers near your current coordinates.",
          });
          setLocationLoading(false);
        },
        () => {
          toast({
            variant: "destructive",
            title: "Location Access Denied",
            description: "Please enter your region manually.",
          });
          setLocationLoading(false);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Geolocation is not supported by your browser.",
      });
      setLocationLoading(false);
    }
  };

  const handleContact = (name: string) => {
    toast({
      title: "Contact Initiated",
      description: `Demo: Contact info for ${name} would be shown here.`,
    });
  };

  const bestPrice = useMemo(() => {
    return Math.max(...results.map(b => b.offeredPrice));
  }, [results]);

  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => a.distance - b.distance);
  }, [results]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold font-headline text-primary">🤝 {t('findBuyersTitle')}</h1>
        <p className="text-muted-foreground">Direct connection to verified local and regional agricultural markets.</p>
      </div>

      <Card className="border-primary/20 shadow-lg overflow-hidden">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="text-xl font-bold">{t('findBuyersTitle')}</CardTitle>
          <CardDescription>Enter your produce details to find matching buyers.</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">{t('selectCrop')}</label>
                <Select defaultValue="potato">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CROPS.map(c => (
                      <SelectItem key={c} value={c}>{t(c)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">{t('quantity')} (kg)</label>
                <div className="flex items-center gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    className="h-10 w-10 shrink-0"
                    onClick={() => setQuantity(Math.max(0, quantity - 50))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="text-center font-bold"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    className="h-10 w-10 shrink-0"
                    onClick={() => setQuantity(quantity + 50)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex justify-between items-center">
                   <label className="text-xs font-bold text-muted-foreground uppercase">{t('typeStateRegion')}</label>
                   <Button 
                    type="button" 
                    variant="link" 
                    size="sm" 
                    className="h-auto p-0 text-xs text-primary"
                    onClick={handleUseLocation}
                    disabled={locationLoading}
                  >
                    <Navigation className="h-3 w-3 mr-1" />
                    {locationLoading ? t('loading') : t('useMyLocation')}
                  </Button>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="e.g., Telangana, Punjab..." className="pl-9 bg-background" />
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 shadow-md transition-all active:scale-[0.98]" disabled={searching}>
              <Search className="w-4 h-4 mr-2" />
              {searching ? t('loading') : t('search')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-primary/10 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold">{t('buyerName')}</TableHead>
                <TableHead className="font-bold">{t('distance')}</TableHead>
                <TableHead className="font-bold">{t('offeredPrice')}</TableHead>
                <TableHead className="font-bold">{t('quantityNeeded')}</TableHead>
                <TableHead className="text-right font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searching ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <TrendingUp className="h-8 w-8 text-primary animate-bounce" />
                      <span className="font-medium text-muted-foreground">{t('loading')}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedResults.map((buyer) => (
                  <TableRow key={buyer.id} className="group hover:bg-primary/5 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {buyer.name}
                        {buyer.distance <= 10 && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0 h-4">Hyper-Local</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{buyer.distance} km</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={buyer.offeredPrice === bestPrice ? "font-bold text-green-600" : "font-medium"}>
                          {formatCurrency(buyer.offeredPrice)}
                        </span>
                        {buyer.offeredPrice === bestPrice && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">BEST PRICE</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{buyer.quantityNeeded}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="rounded-full hover:bg-accent hover:text-white transition-all"
                        onClick={() => handleContact(buyer.name)}
                      >
                        {t('contact')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold">Verified Buyer Network</h4>
            <p className="text-sm text-muted-foreground">All listed buyers undergo a strict verification process to ensure payment security.</p>
          </div>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="rounded-xl">Help Center</Button>
           <Button className="bg-primary text-primary-foreground rounded-xl">Register as Buyer</Button>
        </div>
      </div>
    </div>
  );
}
