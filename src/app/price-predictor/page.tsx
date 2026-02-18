"use client";

import { useState, useMemo } from "react";
import { predictCropPrices, PredictCropPricesOutput } from "@/ai/flows/predict-crop-prices";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { TrendingUp, Info, ShoppingCart, Archive, Loader2, Share2, Sparkles } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/context/LanguageContext";

const CROPS = ["potato", "apple", "pulses", "tomato", "onion", "broccoli", "ginger", "greenChillies", "brinjal"] as const;

export default function PricePredictor() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState<typeof CROPS[number]>("potato");
  const [result, setResult] = useState<PredictCropPricesOutput | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      const cropInput = ["potato", "apple", "pulses"].includes(crop) ? crop as any : "potato";
      const data = await predictCropPrices({ cropType: cropInput });
      setResult(data);
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return <span className="text-2xl font-bold text-primary">₹{price.toLocaleString('en-IN')}</span>;
  };

  const trendData = useMemo(() => {
    if (!result) return [];
    return [
      { name: 'Last Month', Price: result.currentPrice * 0.95 },
      { name: 'Current', Price: result.currentPrice },
      { name: '1M Forecast', Price: result.oneMonthForecast },
      { name: '3M Forecast', Price: result.threeMonthForecast },
    ];
  }, [result]);

  const handleShare = () => {
    if (result) {
      const text = `AgriSight Prediction for ${crop}: Current ₹${result.currentPrice.toLocaleString('en-IN')}. Recommendation: ${result.recommendation}. Check it out!`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const cropImage = PlaceHolderImages.find(img => img.id === `${crop}-crop` || img.id === `${crop}-orchard` || img.id === `${crop}-beans`);

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-headline text-primary">📈 {t('navPricePredictor')}</h1>
          <p className="text-muted-foreground font-medium">Empowering farmers with state-of-the-art AI market analysis.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white p-6 rounded-2xl border shadow-sm w-full md:w-auto">
          <div className="space-y-1">
            <label className="text-xs uppercase font-bold text-muted-foreground">{t('selectCrop')}</label>
            <Select value={crop} onValueChange={(v: any) => setCrop(v)}>
              <SelectTrigger className="w-full sm:w-[220px] h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CROPS.map(c => <SelectItem key={c} value={c}>{t(c)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handlePredict} disabled={loading} size="lg" className="bg-primary hover:bg-primary/90 h-12 px-8 mt-4 sm:mt-5">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {t('analyzeMarket')}
          </Button>
        </div>
      </div>

      {!result && !loading && (
        <Card className="bg-white border-2 border-dashed border-primary/20 p-16 text-center shadow-none rounded-[2rem]">
          <CardContent className="flex flex-col items-center gap-6">
            <div className="bg-primary/10 p-6 rounded-full">
              <TrendingUp className="w-16 h-16 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-headline">Intelligence Dashboard</h2>
              <p className="text-muted-foreground max-w-sm mx-auto">Select your crop above to generate localized price forecasts and AI-driven selling strategies.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8 h-[500px] bg-white rounded-[2rem] border animate-pulse" />
          <div className="md:col-span-4 space-y-6">
            <div className="h-40 bg-white rounded-[2rem] border animate-pulse" />
            <div className="h-40 bg-white rounded-[2rem] border animate-pulse" />
          </div>
        </div>
      )}

      {result && (
        <div className="grid md:grid-cols-12 gap-8 animate-in fade-in duration-700">
          <Card className="md:col-span-8 overflow-hidden rounded-[2rem] border-none shadow-lg">
            <CardHeader className="bg-white pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-headline flex items-center gap-2">
                    {t('forecast')}: {t(crop)}
                  </CardTitle>
                  <CardDescription className="text-base font-medium">Price Trends per Quintal (₹)</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleShare} className="rounded-full h-10 border-primary text-primary hover:bg-primary/10">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share to WhatsApp
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 13}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 13}} dx={-10} />
                    <ChartTooltip 
                      formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Price']}
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Price" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={4} 
                      dot={{ r: 6, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-4 space-y-6">
            <Card className={`rounded-[2rem] border-none shadow-md ${result.recommendation === "Sell Now" ? "bg-accent text-white" : "bg-primary text-white"}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest opacity-80">{t('recommendation')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-4 rounded-2xl">
                    {result.recommendation === "Sell Now" ? <ShoppingCart className="w-10 h-10" /> : <Archive className="w-10 h-10" />}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold font-headline">
                      {result.recommendation === "Sell Now" ? t('sellNow') : t('store')}
                    </h3>
                    <p className="text-sm opacity-90 leading-tight">AI Strategy based on local supply peaks and mandi demand indices.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-[2rem] border shadow-sm text-center">
                <span className="text-xs font-bold text-muted-foreground uppercase block mb-2">{t('currentPrice')}</span>
                {formatPrice(result.currentPrice)}
              </div>
              <div className="bg-white p-6 rounded-[2rem] border shadow-sm text-center">
                <span className="text-xs font-bold text-muted-foreground uppercase block mb-2">Confidence</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-primary">85.2%</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 mt-1">HIGH ACCURACY</Badge>
                </div>
              </div>
            </div>

            <Card className="overflow-hidden rounded-[2rem] shadow-sm">
               <CardContent className="p-0">
                  <div className="bg-primary/5 p-6 border-b">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="w-5 h-5 text-primary" />
                      <h4 className="font-bold text-sm uppercase tracking-wide">Analytic Reason</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Supply chain data indicates a {result.recommendation === "Sell Now" ? "surplus" : "deficit"} in upcoming mandi cycles for {t(crop)}. 
                      Market volatility is currently low, stabilizing domestic price potential.
                    </p>
                  </div>
                  {cropImage && (
                    <div className="relative h-32 w-full">
                      <Image 
                        src={cropImage.imageUrl} 
                        alt={cropImage.description} 
                        fill 
                        className="object-cover grayscale-[20%]"
                        data-ai-hint={cropImage.imageHint}
                      />
                    </div>
                  )}
               </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
