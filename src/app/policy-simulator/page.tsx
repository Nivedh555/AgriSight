
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Info, HelpCircle, BarChart3, TrendingUp, TrendingDown, Users, Wallet } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function PolicySimulator() {
  const [tariffChange, setTariffChange] = useState([0]);

  const impacts = useMemo(() => {
    const val = tariffChange[0];
    // Mock calculations
    return {
      farmPrice: val * 0.8,
      farmerIncome: val * 1.2,
      consumerPrice: val * -0.5,
      exportVolume: val * -1.5
    };
  }, [tariffChange]);

  const ImpactCard = ({ title, value, unit, icon: Icon, colorClass, description }: any) => (
    <Card className="border-none shadow-md overflow-hidden group">
      <div className={`h-1 w-full ${colorClass.split(' ')[0]}`} />
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-lg ${colorClass}`}>
            <Icon className="w-5 h-5" />
          </div>
          <Badge variant={value >= 0 ? "default" : "destructive"} className="rounded-full">
            {value >= 0 ? "+" : ""}{value.toFixed(1)}%
          </Badge>
        </div>
        <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-wider mb-1">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold font-headline">{unit === '$' ? '$' : ''}{Math.abs(value * 10).toFixed(0)}</span>
          <span className="text-xs text-muted-foreground">{unit} avg</span>
        </div>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold font-headline text-primary">Policy Simulator</h1>
        <p className="text-muted-foreground">Visualize the ripple effects of trade policy adjustments on the agricultural ecosystem.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        <Card className="md:col-span-4 bg-card shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Simulation Controls</CardTitle>
            <CardDescription>Adjust variables to see real-time impact.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="font-bold">Tariff Change</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><HelpCircle className="w-3 h-3 text-muted-foreground" /></TooltipTrigger>
                      <TooltipContent>Import/Export duty percentage change</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                  {tariffChange[0]}%
                </Badge>
              </div>
              <Slider 
                value={tariffChange} 
                onValueChange={setTariffChange} 
                min={-10} 
                max={10} 
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold">
                <span>-10% (Lax)</span>
                <span>Neutral</span>
                <span>+10% (Strict)</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <span className="text-xs font-bold text-muted-foreground uppercase">Context Settings</span>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer">Global Scarcity</Badge>
                <Badge variant="outline" className="cursor-pointer">Surplus Season</Badge>
                <Badge variant="outline" className="cursor-pointer">High Inflation</Badge>
              </div>
            </div>

            <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-accent-foreground leading-relaxed">
                  <strong>Analyst Note:</strong> Increasing tariffs by over 5% typically triggers reciprocal duties from neighboring trade partners within 14 days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <ImpactCard 
              title="Farm Gate Price" 
              value={impacts.farmPrice} 
              unit="/kg" 
              icon={BarChart3} 
              colorClass="bg-blue-100 text-blue-700"
              description="The price farmers receive directly at the mandi or collection center."
            />
            <ImpactCard 
              title="Farmer Income" 
              value={impacts.farmerIncome} 
              unit="k/yr" 
              icon={Wallet} 
              colorClass="bg-green-100 text-green-700"
              description="Estimated annual net profit per hectare for a mid-size farm."
            />
            <ImpactCard 
              title="Consumer Price" 
              value={impacts.consumerPrice} 
              unit="/kg" 
              icon={Users} 
              colorClass="bg-orange-100 text-orange-700"
              description="Retail price paid by urban consumers at supermarkets."
            />
            <ImpactCard 
              title="Export Volume" 
              value={impacts.exportVolume} 
              unit="k Ton" 
              icon={TrendingDown} 
              colorClass="bg-purple-100 text-purple-700"
              description="Total tonnage of local produce shipped to international markets."
            />
          </div>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-headline flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Scenario Outcome
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-accent-foreground leading-relaxed">
                {tariffChange[0] > 0 ? (
                  `Increasing tariffs to ${tariffChange[0]}% protects local growers from cheaper imports, driving up farm prices. However, this may lead to consumer inflation and potentially retaliatory trade barriers from export partners.`
                ) : tariffChange[0] < 0 ? (
                  `Lowering tariffs to ${tariffChange[0]}% reduces costs for consumers but puts downward pressure on local farm gate prices. This scenario favors urban centers but may require government subsidies for pulse farmers.`
                ) : (
                  "Maintain existing tariff structures. This provides market stability but misses opportunities for optimizing export-import balances during seasonal shifts."
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
