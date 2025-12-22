'use server';

/**
 * @fileOverview A financial scenario simulator (Digital Twin) that predicts the outcome of financial changes.
 *
 * - simulateFinancialScenario - A function that runs the financial simulation.
 * - FinancialScenarioInput - The input type for the simulateFinancialScenario function.
 * - FinancialScenarioOutput - The return type for the simulateFinancialScenario function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FinancialScenarioInputSchema = z.object({
  currentFinancials: z.string().describe("A JSON string representing the user's current financial state, including income, expenses, and financial goals."),
  scenario: z.string().describe('The financial change or scenario to simulate. For example, "What if my salary increases by 10%?" or "What if I buy a car for $20,000?"'),
});
export type FinancialScenarioInput = z.infer<typeof FinancialScenarioInputSchema>;

const FinancialScenarioOutputSchema = z.object({
  prediction: z.string().describe('A detailed, predictive analysis of the financial outcome of the simulated scenario over the next 12 months. Include impacts on net worth, savings, and debt.'),
});
export type FinancialScenarioOutput = z.infer<typeof FinancialScenarioOutputSchema>;

export async function simulateFinancialScenario(
  input: FinancialScenarioInput
): Promise<FinancialScenarioOutput> {
  return financialScenarioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialScenarioPrompt',
  input: { schema: FinancialScenarioInputSchema },
  output: { schema: FinancialScenarioOutputSchema },
  prompt: `You are a predictive financial advisor. Your role is to act as a "Digital Twin" for a user's finances.

Given the user's current financial situation and a scenario they want to simulate, provide a detailed prediction of what will happen over the next 12 months.

Your analysis should be predictive, not just a simple record-keeper. Advise the user on the potential consequences and opportunities.

Current Financials:
{{{currentFinancials}}}

Scenario to Simulate:
"{{{scenario}}}"

Based on this, generate a predictive analysis.`,
});

const financialScenarioFlow = ai.defineFlow(
  {
    name: 'financialScenarioFlow',
    inputSchema: FinancialScenarioInputSchema,
    outputSchema: FinancialScenarioOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
