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
    .array(z.string())
    .describe(
      'A list of 3-5 concise, summarized, topic/heading style suggestions or calls to action.'
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
  prompt: `You are a financial advisor. Based on the user's financial data, provide a list of 3-5 concise, actionable, and varied headings or calls to action. 
  
  These should be short phrases (1-2 lines), not full paragraphs. Rotate between different types of insights: warnings, positive reinforcement, and what-if nudges.

  - If a budget category is overspent, create a warning: "Your 'Food' spending is high, consider reviewing it."
  - If they are on track for a goal, give positive reinforcement: "You're on track to hit your savings goal!"
  - If there is unallocated income, suggest a what-if scenario: "What if you invested your BWP 500 surplus?"

  Income: {{income}}
  Expenses: {{#each expenses}}{{@key}}: {{this}}
  {{/each}}
  Financial Goals: {{financialGoals}}
  
  Provide a JSON array of 3-5 varied, heading-style suggestions.`,
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
