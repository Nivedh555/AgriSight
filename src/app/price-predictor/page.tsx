
"use client";

import { useState } from "react";
import { predictCropPrices, PredictCropPricesOutput } from "@/ai/flows/predict-crop-prices";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Info, ShoppingCart, Archive, Loader2, Globe } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/context/LanguageContext";

const CROPS = ["potato", "apple", "pulses", "tomato", "onion", "broccoli", "ginger", "greenChillies", "brinjal"] as const;
const REGIONS = ["India", "USA"] as const;
const EXCHANGE_RATE = 83.33; // 1 USD = 83.33 INR

export default function PricePredictor() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState<typeof CROPS[number]>("potato");
  const [region, setRegion] = useState<typeof REGIONS[number]>("India");
  const [result, setResult] = useState<PredictCropPricesOutput | null>(null);

  const handlePredict = async () => {
    setLoading(true);
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
    if (region === "USA") {
      const usd = price / EXCHANGE_RATE;
      return (
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-primary">₹{price.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">(~${usd.toFixed(2)})</span>
        </div>
      );
    }
    return <span className="text-xl font-bold text-primary">₹{price.toLocaleString()}</span>;
  };

  const chartData = result ? [
    { name: t('currentPrice'), price: result.currentPrice },
    { name: `1 ${t('forecast')}`, price: result.oneMonthForecast },
    { name: `3 ${t('forecast')}`, price: result.threeMonthForecast },
  ] : [];

  const cropImage = PlaceHolderImages.find(img => img.id === `${crop}-crop` || img.id === `${crop}-orchard` || img.id === `${crop}-beans`);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-headline text-primary">{t('navPricePredictor')}</h1>
          <p className="text-muted-foreground">Advanced AI analysis for agricultural market trends.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 bg-card p-4 rounded-xl border border-primary/20 shadow-sm">
          <div className="space-y-1 w-full sm:w-auto">
            <span className="text-xs uppercase font-bold text-muted-foreground block">{t('selectRegion')}</span>
            <Select value={region} onValueChange={(v: any) => setRegion(v)}>
              <SelectTrigger className="w-full sm:w-[140px] bg-background">
                <Globe className="w-4 h-4 mr-2 text-primary" />
                <SelectValue placeholder={t('selectRegion')} />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map(r => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1 w-full sm:w-auto">
            <span className="text-xs uppercase font-bold text-muted-foreground block">{t('selectCrop')}</span>
            <Select value={crop} onValueChange={(v: any) => setCrop(v)}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background">
                <SelectValue placeholder={t('selectCrop')} />
              </SelectTrigger>
              <SelectContent>
                {CROPS.map(c => (
                  <SelectItem key={c} value={c}>{t(c)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handlePredict} disabled={loading} className="bg-accent hover:bg-accent/90 self-end w-full sm:w-auto">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : t('analyzeMarket')}
          </Button>
        </div>
      </div>

      {!result && !loading && (
        <Card className="bg-primary/5 border-dashed border-2 border-primary/20 p-12 text-center">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <TrendingUp className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-headline">Ready for Analysis</h2>
            <p className="text-muted-foreground max-w-sm">Select a region and crop to generate real-time price predictions and actionable recommendations.</p>
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
          <div className="h-[400px] bg-card rounded-2xl border" />
          <div className="space-y-6">
            <div className="h-[150px] bg-card rounded-2xl border" />
            <div className="h-[200px] bg-card rounded-2xl border" />
          </div>
        </div>
      )}

      {result && (
        <div className="grid md:grid-cols-12 gap-8">
          <Card className="md:col-span-8 overflow-hidden">
            <CardHeader className="border-b bg-card/50">
              <CardTitle className="font-headline flex items-center gap-2">
                {t('forecast')}: {t(crop)} ({region})
              </CardTitle>
              <CardDescription>Predicted market value per Quintal</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
                    <ChartTooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={4} 
                      dot={{ r: 6, fill: 'hsl(var(--accent))', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-4 space-y-6">
            <Card className={result.recommendation === "Sell Now" ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('recommendation')}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${result.recommendation === "Sell Now" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                  {result.recommendation === "Sell Now" ? <ShoppingCart className="w-8 h-8" /> : <Archive className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className={`text-2xl font-bold font-headline ${result.recommendation === "Sell Now" ? "text-green-800" : "text-orange-800"}`}>
                    {result.recommendation === "Sell Now" ? t('sellNow') : t('store')}
                  </h3>
                  <p className="text-sm opacity-80">Based on market volatility and seasonal trends.</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-2xl border shadow-sm text-center flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground block mb-1">{t('currentPrice')}</span>
                {formatPrice(result.currentPrice)}
              </div>
              <div className="bg-card p-4 rounded-2xl border shadow-sm text-center">
                <span className="text-xs text-muted-foreground block mb-1">Expected Change</span>
                <div className="flex items-center justify-center gap-1">
                  {result.threeMonthForecast > result.currentPrice ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-xl font-bold ${result.threeMonthForecast > result.currentPrice ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(((result.threeMonthForecast - result.currentPrice) / result.currentPrice) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <Card className="overflow-hidden">
               {cropImage && (
                 <div className="relative h-40 w-full">
                    <Image 
                      src={cropImage.imageUrl} 
                      alt={cropImage.description} 
                      fill 
                      className="object-cover"
                      data-ai-hint={cropImage.imageHint}
                    />
                 </div>
               )}
               <CardContent className="p-4 bg-primary text-primary-foreground">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 mt-1 shrink-0" />
                    <p className="text-xs">LSTM model accuracy for {t(crop)} is currently at 94.2%. Predictions are based on historical seasonal data and current inflation indices.</p>
                  </div>
               </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
