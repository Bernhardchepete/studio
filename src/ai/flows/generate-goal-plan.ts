'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a financial plan to reach a goal.
 *
 * - generateGoalPlan - A function that initiates the goal plan generation process.
 * - GoalPlanInput - The input type for the generateGoalPlan function.
 * - GoalPlanOutput - The return type for the generateGoalPlan function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { BudgetCategory } from '@/lib/types';

const GoalPlanInputSchema = z.object({
  goalName: z.string().describe('The name of the financial goal.'),
  goalAmount: z.number().describe('The target amount for the goal.'),
  currentSavings: z.number().describe('The amount already saved for the goal.'),
  deadline: z.string().describe('The deadline for the goal in ISO 8601 format.'),
  monthlyIncome: z.number().describe("The user's total monthly income."),
  budgets: z.array(z.object({
    category: z.string(),
    allocated: z.number(),
    spent: z.number(),
  })).describe("The user's current monthly budgets."),
});
export type GoalPlanInput = z.infer<typeof GoalPlanInputSchema>;

const ActionableSuggestionSchema = z.object({
  suggestion: z.string().describe("A short, actionable description of the suggested change. For example, 'Reduce your Entertainment spending by BWP 200.'"),
  action: z.object({
    type: z.literal('ADJUST_BUDGET').describe("The type of action to perform."),
    category: z.string().describe("The budget category to adjust. Must be one of the user's existing budget categories."),
    newAllocatedAmount: z.number().describe("The suggested new allocated amount for the budget category."),
  }).describe("The specific, machine-readable action to take."),
});

const GoalPlanOutputSchema = z.object({
  plan: z.array(ActionableSuggestionSchema).describe('A list of short, actionable financial steps to help the user reach their goal. Provide 1-2 concrete steps.'),
  probability: z.number().min(0).max(1).describe('The probability of the user reaching their goal, as a decimal between 0 and 1.'),
});
export type GoalPlanOutput = z.infer<typeof GoalPlanOutputSchema>;

export async function generateGoalPlan(input: GoalPlanInput): Promise<GoalPlanOutput> {
  return generateGoalPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'goalPlanPrompt',
  input: { schema: GoalPlanInputSchema },
  output: { schema: GoalPlanOutputSchema },
  prompt: `You are a financial advisor. A user wants to achieve a financial goal.

  **Goal Information:**
  - **Goal:** {{{goalName}}}
  - **Target Amount:** {{{goalAmount}}}
  - **Current Savings:** {{{currentSavings}}}
  - **Deadline:** {{{deadline}}}
  - **Monthly Income:** {{{monthlyIncome}}}
  - **Current Budgets:** {{{JSONstringify budgets}}}

  **Your Task:**
  1.  **Calculate Feasibility:** Based on the information, analyze the user's chances of success.
  2.  **Estimate Probability:** Provide a realistic probability of success as a decimal (e.g., 0.75 for 75%). Be critical. If they need to save more per month than their income allows, the probability is very low.
  3.  **Create an Actionable Plan:** Generate a concise, actionable plan with 1-2 simple steps. Each step MUST be an 'ADJUST_BUDGET' action. Find a non-essential budget category (like 'Entertainment' or 'Other') and suggest a reasonable reduction. Calculate the new allocated amount for that category. Phrase the suggestion as a clear instruction. For example, "Cut 'Entertainment' spending to BWP 500/month to free up funds."
  
  Provide the output in the format defined by the output schema, ensuring the 'action.category' exists in the user's provided budgets.`,
});

const generateGoalPlanFlow = ai.defineFlow(
  {
    name: 'generateGoalPlanFlow',
    inputSchema: GoalPlanInputSchema,
    outputSchema: GoalPlanOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
