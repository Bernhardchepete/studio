'use server';

/**
 * @fileOverview A personalized budget suggestions AI agent.
 *
 * - getPersonalizedBudgetSuggestions - A function that generates personalized budget suggestions.
 * - PersonalizedBudgetSuggestionsInput - The input type for the getPersonalizedBudgetSuggestions function.
 * - PersonalizedBudgetSuggestionsOutput - The return type for the getPersonalizedBudgetSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedBudgetSuggestionsInputSchema = z.object({
  income: z.number().describe('The user monthly income.'),
  expenses: z.record(z.string(), z.number()).describe('A map of expense categories to monthly amounts.'),
  financialGoals: z.string().describe('The user financial goals.'),
});
export type PersonalizedBudgetSuggestionsInput = z.infer<
  typeof PersonalizedBudgetSuggestionsInputSchema
>;

const PersonalizedBudgetSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'A concise, summarized, topic/heading style suggestion or call to action.'
    ),
});
export type PersonalizedBudgetSuggestionsOutput = z.infer<
  typeof PersonalizedBudgetSuggestionsOutputSchema
>;

export async function getPersonalizedBudgetSuggestions(
  input: PersonalizedBudgetSuggestionsInput
): Promise<PersonalizedBudgetSuggestionsOutput> {
  return personalizedBudgetSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedBudgetSuggestionsPrompt',
  input: {schema: PersonalizedBudgetSuggestionsInputSchema},
  output: {schema: PersonalizedBudgetSuggestionsOutputSchema},
  prompt: `You are a financial advisor. Based on the user's financial data, provide a concise, actionable heading or call to action. 
  
  This should be a short phrase, not a full paragraph. For example: "Your 'Eating Out' budget is high, consider reviewing it" or "You're on track to hit your savings goal!".

  Income: {{income}}
  Expenses: {{#each expenses}}{{@key}}: {{this}}
  {{/each}}
  Financial Goals: {{financialGoals}}
  
  Provide just the heading-style suggestion.`,
});

const personalizedBudgetSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedBudgetSuggestionsFlow',
    inputSchema: PersonalizedBudgetSuggestionsInputSchema,
    outputSchema: PersonalizedBudgetSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
