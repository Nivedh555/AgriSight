
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LineChart, ShieldCheck, Handshake, ArrowRight, TrendingUp, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const features = [
    {
      title: "Price Predictor",
      description: "AI-powered LSTM models for accurate crop price forecasting.",
      icon: LineChart,
      href: "/price-predictor",
      color: "bg-green-100 text-green-700",
      stats: "94% Accuracy"
    },
    {
      title: "Policy Simulator",
      description: "Simulate trade deals and tariff impacts on agricultural markets.",
      icon: ShieldCheck,
      href: "/policy-simulator",
      color: "bg-blue-100 text-blue-700",
      stats: "15+ Scenarios"
    },
    {
      title: "Buyer Matching",
      description: "Connect directly with verified buyers near your location.",
      icon: Handshake,
      href: "/buyer-matching",
      color: "bg-orange-100 text-orange-700",
      stats: "500+ Buyers"
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary/10 p-8 md:p-16 border border-primary/20">
        <div className="max-w-2xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary mb-6 font-headline">
            Empowering Agriculture with <span className="text-accent">Data Intelligence</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            AgriSight provides farmers and policymakers with the tools to predict market trends, 
            simulate policy impacts, and bridge the gap between production and commerce.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-8">
              <Link href="/price-predictor">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 bg-white/50 border-primary/30">
              Watch Demo
            </Button>
          </div>
        </div>
        <div className="absolute right-[-10%] bottom-[-10%] opacity-10">
          <TrendingUp className="w-96 h-96" />
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link key={feature.title} href={feature.href} className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-primary/10">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-bold font-headline">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                  {feature.stats}
                </span>
                <div className="p-2 bg-accent/10 rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* Market Stats Section */}
      <section className="bg-card rounded-2xl p-8 border border-border shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline">Live Market Dashboard</h2>
            <p className="text-muted-foreground">Aggregated real-time data from major mandi hubs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
            <div className="p-4 bg-background rounded-xl border flex flex-col items-center">
              <span className="text-accent font-bold text-xl">$12.4B</span>
              <span className="text-xs text-muted-foreground">Trade Volume</span>
            </div>
            <div className="p-4 bg-background rounded-xl border flex flex-col items-center">
              <span className="text-green-600 font-bold text-xl">+4.2%</span>
              <span className="text-xs text-muted-foreground">Potato Trend</span>
            </div>
            <div className="p-4 bg-background rounded-xl border flex flex-col items-center">
              <span className="text-orange-600 font-bold text-xl">-1.8%</span>
              <span className="text-xs text-muted-foreground">Apple Demand</span>
            </div>
            <div className="p-4 bg-background rounded-xl border flex flex-col items-center">
              <span className="text-blue-600 font-bold text-xl">Stable</span>
              <span className="text-xs text-muted-foreground">Pulse Market</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold">Farmer Focused</h4>
            <p className="text-sm text-muted-foreground">Designed with input from over 10k rural farmers.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold">Predictive AI</h4>
            <p className="text-sm text-muted-foreground">State-of-the-art LSTM models for price forecasting.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold">Regional Reach</h4>
            <p className="text-sm text-muted-foreground">Hyper-local buyer matching across 12 countries.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
