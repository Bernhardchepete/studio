import type { Transaction, Budget, Investment, Goal } from './types';

// All amounts are in BWP (Pula)

export const transactions: Transaction[] = [
  { id: '1', date: '2024-07-28', description: 'School Allowance', category: 'Allowance', amount: 1900, type: 'income' },
  { id: '2', date: '2024-07-25', description: 'Side Hustle Payment', category: 'Income', amount: 600, type: 'income' },
  { id: '3', date: '2024-07-01', description: 'Rent', category: 'Housing', amount: 1000, type: 'expense' },
  { id: '4', date: '2024-07-26', description: 'Groceries', category: 'Food', amount: 120, type: 'expense' },
  { id: '5', date: '2024-07-22', description: 'Transport - Week 4', category: 'Transport', amount: 80, type: 'expense' },
  { id: '6', date: '2024-07-19', description: 'Groceries', category: 'Food', amount: 95, type: 'expense' },
  { id: '7', date: '2024-07-15', description: 'Transport - Week 3', category: 'Transport', amount: 80, type: 'expense' },
  { id: '8', date: '2024-07-12', description: 'Takeout', category: 'Food', amount: 85, type: 'expense' },
  { id: '9', date: '2024-07-08', description: 'Transport - Week 2', category: 'Transport', amount: 80, type: 'expense' },
  { id: '10', date: '2024-07-05', description: 'Groceries', category: 'Food', amount: 100, type: 'expense' },
  { id: '11', date: '2024-07-01', description: 'Transport - Week 1', category: 'Transport', amount: 80, type: 'expense' },
];

export const budgets: Budget[] = [
  { id: '1', category: 'Housing', allocated: 1000, spent: 1000, priority: 'High', paymentMethod: 'Automatic' },
  { id: '2', category: 'Food', allocated: 400, spent: 400, priority: 'High', paymentMethod: 'Manual' },
  { id: '3', category: 'Transport', allocated: 320, spent: 320, priority: 'Medium', paymentMethod: 'Confirmation' },
  { id: '4', category: 'Other', allocated: 180, spent: 0, priority: 'Low', paymentMethod: 'Manual' },
];

export const investments: Investment[] = [
    { id: '1', name: 'WealthWise Growth Fund', amount: 500, startDate: '2024-06-01' }
];

export const goals: Goal[] = [
  {
    id: '1',
    name: 'Trip to Cape Town',
    description: 'A 5-day trip to explore the Mother City for my birthday.',
    target: 7000,
    saved: 2500,
    deadline: '2024-12-15'
  }
];
