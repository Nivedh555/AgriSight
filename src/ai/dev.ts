import { config } from 'dotenv';
config();

import '@/ai/flows/predict-crop-prices.ts';
import '@/ai/flows/get-market-stats.ts';
import '@/ai/flows/search-buyers.ts';
