'use server';
/**
 * @fileOverview A Genkit flow for fetching real-time market statistics.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MarketStatsOutputSchema = z.object({
  tradeVolume: z.string().describe('Total trade volume in INR (e.g., ₹12.4B)'),
  potatoTrend: z.string().describe('Percentage change for Potato (e.g., +4.2%)'),
  appleTrend: z.string().describe('Percentage change for Apple (e.g., -1.8%)'),
  pulseStatus: z.string().describe('Market status for Pulses (e.g., Stable, Rising, Volatile)'),
});
export type MarketStatsOutput = z.infer<typeof MarketStatsOutputSchema>;

export async function getMarketStats(): Promise<MarketStatsOutput> {
  return getMarketStatsFlow();
}

const prompt = ai.definePrompt({
  name: 'getMarketStatsPrompt',
  output: {schema: MarketStatsOutputSchema},
  prompt: `You are a real-time agricultural market data provider. 
  Generate realistic, contextually accurate market statistics for major Indian mandi hubs based on current seasonal patterns.
  Provide:
  1. Total trade volume in INR billions.
  2. Percentage price trends for Potato and Apple.
  3. A qualitative status for the Pulse market.`,
});

const getMarketStatsFlow = ai.defineFlow(
  {
    name: 'getMarketStatsFlow',
    outputSchema: MarketStatsOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
