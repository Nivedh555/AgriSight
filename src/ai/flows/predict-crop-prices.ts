'use server';
/**
 * @fileOverview A Genkit flow for predicting crop prices and providing recommendations.
 *
 * - predictCropPrices - A function that handles the crop price prediction and recommendation process.
 * - PredictCropPricesInput - The input type for the predictCropPrices function.
 * - PredictCropPricesOutput - The return type for the predictCropPrices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictCropPricesInputSchema = z.object({
  cropType: z.enum(['potato', 'apple', 'pulses']).describe('The type of crop for which to predict prices.'),
});
export type PredictCropPricesInput = z.infer<typeof PredictCropPricesInputSchema>;

const PredictCropPricesOutputSchema = z.object({
  currentPrice: z.number().describe('The current price of the crop.'),
  oneMonthForecast: z.number().describe('The predicted price of the crop in one month.'),
  threeMonthForecast: z.number().describe('The predicted price of the crop in three months.'),
  recommendation: z.enum(['Sell Now', 'Store for Later']).describe('An actionable recommendation: either "Sell Now" or "Store for Later".'),
});
export type PredictCropPricesOutput = z.infer<typeof PredictCropPricesOutputSchema>;

export async function predictCropPrices(input: PredictCropPricesInput): Promise<PredictCropPricesOutput> {
  return predictCropPricesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictCropPricesPrompt',
  input: {schema: PredictCropPricesInputSchema},
  output: {schema: PredictCropPricesOutputSchema},
  prompt: `You are an expert agricultural economist specializing in crop price forecasting and market recommendations.

Given the crop type, provide a simulated current price, a 1-month forecast, a 3-month forecast, and a clear recommendation on whether the farmer should 'Sell Now' or 'Store for Later'.

Consider typical market fluctuations, seasonal demands, and storage costs for the specified crop when determining your recommendation. For example, if prices are expected to rise significantly, recommend 'Store for Later'. If current prices are high and expected to drop, recommend 'Sell Now'.

Crop Type: {{{cropType}}}`,
});

const predictCropPricesFlow = ai.defineFlow(
  {
    name: 'predictCropPricesFlow',
    inputSchema: PredictCropPricesInputSchema,
    outputSchema: PredictCropPricesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
