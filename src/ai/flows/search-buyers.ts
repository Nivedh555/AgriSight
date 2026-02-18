'use server';
/**
 * @fileOverview A Genkit flow for searching verified buyers based on crop and location.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchBuyersInputSchema = z.object({
  crop: z.string(),
  location: z.string().optional(),
  quantity: z.number(),
});
export type SearchBuyersInput = z.infer<typeof SearchBuyersInputSchema>;

const BuyerSchema = z.object({
  id: z.string(),
  name: z.string(),
  distance: z.number().describe('Distance in km'),
  offeredPrice: z.number().describe('Price in INR per quintal'),
  quantityNeeded: z.string().describe('Total capacity needed by buyer'),
  isHyperLocal: z.boolean(),
});

const SearchBuyersOutputSchema = z.object({
  buyers: z.array(BuyerSchema),
});
export type SearchBuyersOutput = z.infer<typeof SearchBuyersOutputSchema>;

export async function searchBuyers(input: SearchBuyersInput): Promise<SearchBuyersOutput> {
  return searchBuyersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchBuyersPrompt',
  input: {schema: SearchBuyersInputSchema},
  output: {schema: SearchBuyersOutputSchema},
  prompt: `You are an agricultural logistics coordinator. 
  Generate a list of 4-6 realistic, verified buyers for the specified crop and location.
  Crop: {{{crop}}}
  Location: {{{location}}}
  Quantity: {{{quantity}}} kg

  For each buyer, provide:
  - A realistic name (e.g., "Kisan Cooperative", "Metro Processing Ltd", "Regional Mandi Hub")
  - Distance between 2 and 50 km.
  - An offered price in INR per quintal that is competitive for the crop.
  - A needed quantity that matches or exceeds the user's input.
  - Flag 'isHyperLocal' as true if distance is < 10km.`,
});

const searchBuyersFlow = ai.defineFlow(
  {
    name: 'searchBuyersFlow',
    inputSchema: SearchBuyersInputSchema,
    outputSchema: SearchBuyersOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
