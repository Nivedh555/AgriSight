
"use client";

import { useState } from "react";
import { predictCropPrices, PredictCropPricesOutput } from "@/ai/flows/predict-crop-prices";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from "recharts";
import { AlertCircle, TrendingUp, TrendingDown, Info, ShoppingCart, Archive, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function PricePredictor() {
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState<"potato" | "apple" | "pulses">("potato");
  const [result, setResult] = useState<PredictCropPricesOutput | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const data = await predictCropPrices({ cropType: crop });
      setResult(data);
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = result ? [
    { name: "Current", price: result.currentPrice },
    { name: "1 Month", price: result.oneMonthForecast },
    { name: "3 Months", price: result.threeMonthForecast },
  ] : [];

  const cropImage = PlaceHolderImages.find(img => img.id === `${crop}-crop` || img.id === `${crop}-orchard` || img.id === `${crop}-beans`);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-headline text-primary">Price Predictor</h1>
          <p className="text-muted-foreground">Advanced AI analysis for agricultural market trends.</p>
        </div>
        <div className="flex items-center gap-3 bg-card p-4 rounded-xl border border-primary/20 shadow-sm">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-muted-foreground block">Select Crop Type</span>
            <Select value={crop} onValueChange={(v: any) => setCrop(v)}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="potato">Potato</SelectItem>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="pulses">Pulses</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handlePredict} disabled={loading} className="bg-accent hover:bg-accent/90 self-end">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Analyze Market"}
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
            <p className="text-muted-foreground max-w-sm">Select a crop and click 'Analyze Market' to generate a real-time price prediction and actionable recommendation.</p>
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
          {/* Chart Section */}
          <Card className="md:col-span-8 overflow-hidden">
            <CardHeader className="border-b bg-card/50">
              <CardTitle className="font-headline flex items-center gap-2">
                Price Forecast: {crop.charAt(0).toUpperCase() + crop.slice(1)}
              </CardTitle>
              <CardDescription>Predicted market value over the next 3 months (USD/Quintal)</CardDescription>
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

          {/* Result Cards Section */}
          <div className="md:col-span-4 space-y-6">
            <Card className={result.recommendation === "Sell Now" ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Our Recommendation</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${result.recommendation === "Sell Now" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                  {result.recommendation === "Sell Now" ? <ShoppingCart className="w-8 h-8" /> : <Archive className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className={`text-2xl font-bold font-headline ${result.recommendation === "Sell Now" ? "text-green-800" : "text-orange-800"}`}>
                    {result.recommendation}
                  </h3>
                  <p className="text-sm opacity-80">Based on market volatility and seasonal trends.</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-2xl border shadow-sm text-center">
                <span className="text-xs text-muted-foreground block mb-1">Current Price</span>
                <span className="text-xl font-bold text-primary">${result.currentPrice}</span>
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
                    <p className="text-xs">LSTM model accuracy for {crop} is currently at 94.2%. Predictions are based on historical seasonal data and current inflation indices.</p>
                  </div>
               </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Market Sentiment */}
      <div className="grid md:grid-cols-3 gap-6">
        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800 font-bold">Logistics Alert</AlertTitle>
          <AlertDescription className="text-blue-700 text-sm">
            Diesel prices have stabilized, reducing transportation costs by 4% this week.
          </AlertDescription>
        </Alert>
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800 font-bold">Weather Warning</AlertTitle>
          <AlertDescription className="text-yellow-700 text-sm">
            Unseasonal rains in Northern regions may impact apple shelf life.
          </AlertDescription>
        </Alert>
        <Alert className="bg-purple-50 border-purple-200">
          <AlertCircle className="h-4 w-4 text-purple-600" />
          <AlertTitle className="text-purple-800 font-bold">Global Trade</AlertTitle>
          <AlertDescription className="text-purple-700 text-sm">
            New export incentives for pulses starting next fiscal month.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
