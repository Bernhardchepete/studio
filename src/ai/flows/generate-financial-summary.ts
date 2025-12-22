'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a summarized overview of a user's financial data.
 *
 * - generateFinancialSummary - A function that initiates the financial summary generation process.
 * - FinancialSummaryInput - The input type for the generateFinancialSummary function.
 * - FinancialSummaryOutput - The return type for the generateFinancialSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialSummaryInputSchema = z.object({
  assets: z.string().describe('A summary of assets, like investments and savings.'),
  liabilities: z.string().describe('A summary of liabilities, if any.'),
  income: z.string().describe('A list of income sources and amounts.'),
  expenses: z.string().describe('A list of expenses with their amounts.'),
});
export type FinancialSummaryInput = z.infer<typeof FinancialSummaryInputSchema>;

const FinancialSummaryOutputSchema = z.object({
  summary: z.string().describe('A summarized overview of the user\'s financial data, highlighting key trends and insights.'),
});
export type FinancialSummaryOutput = z.infer<typeof FinancialSummaryOutputSchema>;

export async function generateFinancialSummary(input: FinancialSummaryInput): Promise<FinancialSummaryOutput> {
  return generateFinancialSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialSummaryPrompt',
  input: {schema: FinancialSummaryInputSchema},
  output: {schema: FinancialSummaryOutputSchema},
  prompt: `You are a financial advisor providing a summary of a user's financial situation.

  Based on the following financial data, provide a concise summary highlighting key trends, insights, and potential areas for improvement.

  Assets: {{{assets}}}
  Liabilities: {{{liabilities}}}
  Income: {{{income}}}
  Expenses: {{{expenses}}}

  Summary:`,
});

const generateFinancialSummaryFlow = ai.defineFlow(
  {
    name: 'generateFinancialSummaryFlow',
    inputSchema: FinancialSummaryInputSchema,
    outputSchema: FinancialSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
