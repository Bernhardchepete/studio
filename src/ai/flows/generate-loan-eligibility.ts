'use server';

/**
 * @fileOverview This file defines a Genkit flow for assessing loan eligibility.
 *
 * - generateLoanEligibility - A function that initiates the loan eligibility assessment.
 * - LoanEligibilityInput - The input type for the generateLoanEligibility function.
 * - LoanEligibilityOutput - The return type for the generateLoanEligibility function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const LoanEligibilityInputSchema = z.object({
  monthlyIncome: z.number().describe('The user\'s total monthly income.'),
  monthlyExpenses: z.number().describe('The user\'s total monthly expenses.'),
  creditHistory: z.string().describe('A summary of the user\'s credit history.'),
  existingDebt: z.number().describe('The user\'s total existing debt.'),
});
export type LoanEligibilityInput = z.infer<typeof LoanEligibilityInputSchema>;

const LoanEligibilityOutputSchema = z.object({
  eligible: z.boolean().describe('Whether the user is eligible for a loan.'),
  maxLoanAmount: z.number().describe('The maximum loan amount the user is eligible for.'),
  interestRate: z.number().describe('The suggested interest rate for the loan.'),
  explanation: z.string().describe('An explanation of the eligibility decision.'),
});
export type LoanEligibilityOutput = z.infer<typeof LoanEligibilityOutputSchema>;

export async function generateLoanEligibility(input: LoanEligibilityInput): Promise<LoanEligibilityOutput> {
  return generateLoanEligibilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'loanEligibilityPrompt',
  input: { schema: LoanEligibilityInputSchema },
  output: { schema: LoanEligibilityOutputSchema },
  prompt: `You are an AI underwriting agent for a fintech company. Your task is to assess a user's loan eligibility based on their financial data.

  **User Financial Profile:**
  - **Monthly Income:** {{{monthlyIncome}}}
  - **Monthly Expenses:** {{{monthlyExpenses}}}
  - **Credit History:** {{{creditHistory}}}
  - **Existing Debt:** {{{existingDebt}}}

  **Your Task:**
  1.  **Analyze Affordability:** Calculate the user's debt-to-income ratio and disposable income.
  2.  **Assess Risk:** Based on the credit history and existing debt, determine the risk profile.
  3.  **Determine Eligibility:** Decide if the user is eligible for a loan.
  4.  **Calculate Loan Amount:** If eligible, calculate a reasonable maximum loan amount (e.g., 3-6 times their disposable income).
  5.  **Suggest Interest Rate:** Propose an interest rate based on their risk profile.
  6.  **Provide Explanation:** Briefly explain your decision.

  Provide the output in the format defined by the output schema.`,
});

const generateLoanEligibilityFlow = ai.defineFlow(
  {
    name: 'generateLoanEligibilityFlow',
    inputSchema: LoanEligibilityInputSchema,
    outputSchema: LoanEligibilityOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
