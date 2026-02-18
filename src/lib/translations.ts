export type Language = 'en';

export const languages: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
];

export const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: "AgriSight",
    navHome: "Home",
    navPricePredictor: "Price Trends",
    navPolicySimulator: "Policy",
    navBuyerMatching: "Buyers",
    heroTitle: "Empowering Agriculture with Data Intelligence",
    heroSubtitle: "AgriSight provides farmers and policymakers with the tools to predict market trends, simulate policy impacts, and bridge the gap between production and commerce.",
    getStarted: "Get Started",
    watchDemo: "Watch Demo",
    login: "Farmer Login",
    selectLanguage: "Choose Your Language",
    welcome: "Welcome to AgriSight",
    continue: "Continue",
    // Crops
    potato: "Potato",
    apple: "Apple",
    pulses: "Pulses",
    tomato: "Tomato",
    onion: "Onion",
    broccoli: "Broccoli",
    ginger: "Ginger",
    greenChillies: "Green Chillies",
    brinjal: "Brinjal",
    // UI Elements
    currentPrice: "Current Price",
    forecast: "Forecast",
    recommendation: "Recommendation",
    store: "Store for Later",
    sellNow: "Sell Now",
    selectCrop: "Select Crop",
    analyzeMarket: "Analyze Market",
    // Policy Simulator
    policySimulatorTitle: "📊 Trade Policy Simulator",
    policyType: "Policy Type",
    tariffReduction: "Tariff Reduction",
    importQuota: "Import Quota",
    tradeAgreement: "Trade Agreement",
    adjustmentAmount: "Adjustment Amount",
    simulate: "Simulate",
    priceImpact: "Price Impact",
    farmerIncomeChange: "Farmer Income Change",
    consumerPriceChange: "Consumer Price Change",
    importVolumeChange: "Import Volume Change",
    simulationControls: "Simulation Controls",
    simulationExplanation: "Simple Explanation",
    // Buyer Matching
    findBuyersTitle: "🤝 Find Buyers Near You",
    useMyLocation: "📍 Use My Location",
    typeStateRegion: "Type state/region",
    quantity: "Quantity",
    search: "🔍 Search",
    buyerName: "Buyer Name",
    distance: "Distance",
    offeredPrice: "Offered Price",
    quantityNeeded: "Quantity Needed",
    contact: "📞 Contact",
    // Messages
    loading: "Loading...",
    allowLocation: "Allow Location Access",
    locationDenied: "Location Denied",
    noBuyersFound: "No Buyers Found",
    errorOccurred: "Error Occurred",
  }
};
