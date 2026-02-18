"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, BarChart3, TrendingUp, TrendingDown, Users, Wallet, Play } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";

const CROPS = ["potato", "apple", "pulses", "tomato", "onion", "broccoli", "ginger", "greenChillies", "brinjal"] as const;

export default function PolicySimulator() {
  const { t } = useLanguage();
  const [tariffChange, setTariffChange] = useState([0]);
  const [crop, setCrop] = useState("potato");
  const [policy, setPolicy] = useState("tariff");
  const [simulated, setSimulated] = useState(false);

  const impacts = useMemo(() => {
    const val = tariffChange[0];
    return {
      farmPrice: val * 0.85,
      farmerIncome: val * 1.1,
      consumerPrice: val * -0.4,
      exportVolume: val * -1.2
    };
  }, [tariffChange]);

  const handleSimulate = () => {
    setSimulated(true);
  };

  const getExplanation = () => {
    const val = tariffChange[0];
    const direction = impacts.farmPrice >= 0 ? "increase" : "decrease";
    return `Prices will ${direction} by ${Math.abs(impacts.farmPrice).toFixed(1)}% for farmers under the current ${t(policy)} policy for ${t(crop)}.`;
  };

  const ImpactMetric = ({ title, value, icon: Icon, colorClass }: any) => (
    <div className="p-4 rounded-xl border bg-background/50 space-y-3">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${colorClass}`}>
          <Icon className="w-4 h-4" />
        </div>
        <Badge 
          className={value >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
        >
          {value >= 0 ? "+" : ""}{value.toFixed(1)}%
        </Badge>
      </div>
      <div>
        <span className="text-xs font-bold text-muted-foreground uppercase block">{title}</span>
        <span className="text-xl font-bold font-headline">{Math.abs(value * 5).toFixed(0)} Units</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold font-headline text-primary">{t('policySimulatorTitle')}</h1>
        <p className="text-muted-foreground">Analyze and predict economic ripples caused by trade policy shifts.</p>
      </div>

      <Card className="border-primary/20 shadow-xl overflow-hidden">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="text-primary" />
            {t('policySimulatorTitle')}
          </CardTitle>
          <CardDescription>Configure simulation parameters and run models.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            <div className="p-8 space-y-8 border-r">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">{t('selectCrop')}</label>
                <Select value={crop} onValueChange={setCrop}>
                  <SelectTrigger>
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
                <label className="text-xs font-bold text-muted-foreground uppercase">{t('policyType')}</label>
                <Select value={policy} onValueChange={setPolicy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tariff">{t('tariffReduction')}</SelectItem>
                    <SelectItem value="quota">{t('importQuota')}</SelectItem>
                    <SelectItem value="agreement">{t('tradeAgreement')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">{t('adjustmentAmount')}</span>
                  <Badge variant="outline" className="font-mono text-accent border-accent/20">
                    {tariffChange[0] > 0 ? "+" : ""}{tariffChange[0]}%
                  </Badge>
                </div>
                <Slider 
                  value={tariffChange} 
                  onValueChange={setTariffChange} 
                  min={-20} 
                  max={20} 
                  step={1}
                />
              </div>

              <Button onClick={handleSimulate} size="lg" className="w-full bg-accent hover:bg-accent/90">
                <Play className="w-4 h-4 mr-2" />
                {t('simulate')}
              </Button>
            </div>

            <div className="p-8 bg-card flex flex-col justify-center">
              {!simulated ? (
                <div className="text-center space-y-4 opacity-50">
                  <Info className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-bold">Awaiting Simulation</h3>
                    <p className="text-sm">Configure parameters and click simulate to see results.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="grid grid-cols-2 gap-4">
                    <ImpactMetric 
                      title={t('priceImpact')} 
                      value={impacts.farmPrice} 
                      icon={TrendingUp} 
                      colorClass="bg-blue-100 text-blue-700"
                    />
                    <ImpactMetric 
                      title={t('farmerIncomeChange')} 
                      value={impacts.farmerIncome} 
                      icon={Wallet} 
                      colorClass="bg-green-100 text-green-700"
                    />
                    <ImpactMetric 
                      title={t('consumerPriceChange')} 
                      value={impacts.consumerPrice} 
                      icon={Users} 
                      colorClass="bg-orange-100 text-orange-700"
                    />
                    <ImpactMetric 
                      title={t('importVolumeChange')} 
                      value={impacts.exportVolume} 
                      icon={TrendingDown} 
                      colorClass="bg-purple-100 text-purple-700"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold uppercase tracking-wider">{t('simulationExplanation')}</span>
                    </div>
                    <p className="text-sm font-medium leading-relaxed">
                      {getExplanation()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
