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
      'A detailed explanation of budget suggestions based on the provided income, expenses, and financial goals.'
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
  prompt: `Given the user's income, expenses, and financial goals, provide personalized budget suggestions.

Income: {{income}}
Expenses: {{#each expenses}}{{@key}}: {{this}}
{{/each}}
Financial Goals: {{financialGoals}}

Suggestions:`,
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
