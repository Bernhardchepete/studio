import type { Transaction, Asset, Liability, Budget } from './types';

export const transactions: Transaction[] = [
  { id: '1', date: '2024-07-28', description: 'Salary Deposit', category: 'Salary', amount: 5000, type: 'income' },
  { id: '2', date: '2024-07-27', description: 'Grocery Shopping', category: 'Food', amount: 150, type: 'expense' },
  { id: '3', date: '2024-07-26', description: 'Netflix Subscription', category: 'Entertainment', amount: 15.99, type: 'expense' },
  { id: '4', date: '2024-07-25', description: 'Rent Payment', category: 'Housing', amount: 1200, type: 'expense' },
  { id: '5', date: '2024-07-24', description: 'Gasoline', category: 'Transport', amount: 45, type: 'expense' },
  { id: '6', date: '2024-07-23', description: 'Electricity Bill', category: 'Utilities', amount: 75, type: 'expense' },
  { id: '7', date: '2024-07-22', description: 'Dinner with friends', category: 'Entertainment', amount: 60, type: 'expense' },
  { id: '8', date: '2024-07-20', description: 'Freelance Project', category: 'Income', amount: 750, type: 'income' },
  { id: '9', date: '2024-07-18', description: 'Stock Investment', category: 'Investment', amount: 500, type: 'expense' },
];

export const assets: Asset[] = [
  { id: '1', name: 'Checking Account', type: 'Bank Account', value: 8500 },
  { id: '2', name: 'Savings Account', type: 'Bank Account', value: 15000 },
  { id: '3', name: 'Stock Portfolio', type: 'Investment', value: 25000 },
  { id: '4', name: 'Real Estate', type: 'Property', value: 250000 },
];

export const liabilities: Liability[] = [
  { id: '1', name: 'Mortgage', type: 'Loan', amount: 180000 },
  { id: '2', name: 'Car Loan', type: 'Loan', amount: 15000 },
  { id: '3', name: 'Credit Card Debt', type: 'Credit', amount: 2500 },
];

export const budgets: Budget[] = [
  { id: '1', category: 'Food', allocated: 500, spent: 320 },
  { id: '2', category: 'Transport', allocated: 200, spent: 110 },
  { id: '3', category: 'Entertainment', allocated: 250, spent: 180 },
  { id: '4', category: 'Housing', allocated: 1500, spent: 1200 },
  { id: '5', category: 'Utilities', allocated: 150, spent: 75 },
  { id: '6', category: 'Other', allocated: 300, spent: 50 },
];
