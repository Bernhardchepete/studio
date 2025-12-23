import type { Transaction, Budget, Investment, Goal, Receipt } from './types';
import { demoData as thaboData } from './demo-data/thabo';

// Default export can be one of the users, or a generic one.
// The actual data will be loaded based on the selected user profile.
export const transactions: Transaction[] = thaboData.transactions;
export const budgets: Budget[] = thaboData.budgets;
export const investments: Investment[] = thaboData.investments;
export const goals: Goal[] = thaboData.goals;
export const sixMonthPerformance = thaboData.sixMonthPerformance;
export const receipts: Receipt[] = thaboData.receipts;
