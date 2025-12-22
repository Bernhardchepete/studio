import type { Transaction, Budget, Investment, Goal } from './types';

// All amounts are in BWP (Pula)

export const transactions: Transaction[] = [
  { id: '1', date: '2024-07-28', description: 'School Allowance', category: 'Allowance', amount: 1900, type: 'income' },
  { id: '2', date: '2024-07-25', description: 'Side Hustle Payment', category: 'Income', amount: 600, type: 'income' },
  { id: '3', date: '2024-07-01', description: 'Rent', category: 'Housing', amount: 1000, type: 'expense' },
  { id: '4', date: '2024-07-26', description: 'Weekly Groceries', category: 'Food', amount: 120, type: 'expense', details: { items: ['Milk', 'Bread', 'Eggs', 'Chicken Breasts', 'Rice'] } },
  { id: '5', date: '2024-07-22', description: 'Trip to University', category: 'Transport', amount: 80, type: 'expense', details: { from: 'Home (Gaborone West)', to: 'University of Botswana' } },
  { id: '6', date: '2024-07-19', description: 'Groceries', category: 'Food', amount: 95, type: 'expense', details: { items: ['Apples', 'Yogurt', 'Cereal', 'Snacks'] } },
  { id: '7', date: '2024-07-15', description: 'Trip to Mall', category: 'Transport', amount: 80, type: 'expense', details: { from: 'Home', to: 'Game City Mall' } },
  { id: '8', date: '2024-07-12', description: 'Takeout', category: 'Food', amount: 85, type: 'expense' },
  { id: '9', date: '2024-07-08', description: 'Commute to Intern', category: 'Transport', amount: 80, type: 'expense', details: { from: 'Home', to: 'BTC Office' } },
  { id: '10', date: '2024-07-05', description: 'Groceries', category: 'Food', amount: 100, type: 'expense', details: { items: ['Pasta', 'Sauce', 'Vegetables'] } },
  { id: '11', date: '2024-07-01', description: 'Commute to Intern', category: 'Transport', amount: 80, type: 'expense', details: { from: 'Home', to: 'BTC Office' } },
];

const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0); // 2500
const existingBudgets = [
    { id: '1', category: 'Housing', allocated: 1000, spent: 1000, priority: 'High', paymentMethod: 'Automatic' },
    { id: '2', category: 'Food', allocated: 400, spent: 400, priority: 'High', paymentMethod: 'Manual' },
    { id: '3', category: 'Transport', allocated: 320, spent: 320, priority: 'Medium', paymentMethod: 'Confirmation' },
    { id: '4', category: 'Other', allocated: 180, spent: 0, priority: 'Low', paymentMethod: 'Manual' },
];
const totalBudgeted = existingBudgets.reduce((sum, b) => sum + b.allocated, 0); // 1900
const whatsLeft = totalIncome - totalBudgeted; // 600
const investmentAmount = whatsLeft * 0.6; // 360
const goalAmount = whatsLeft * 0.4; // 240


export const budgets: Budget[] = [
    ...existingBudgets,
    { id: '5', category: 'Investment', allocated: investmentAmount, spent: 0, priority: 'High', paymentMethod: 'Automatic' },
    { id: '6', category: 'Cape Town Trip', allocated: goalAmount, spent: 0, priority: 'High', paymentMethod: 'Automatic' },
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

export const sixMonthPerformance = [
    { month: 'Feb', income: 2200, expenses: 1800, net: 400 },
    { month: 'Mar', income: 2300, expenses: 1900, net: 400 },
    { month: 'Apr', income: 2400, expenses: 2000, net: 400 },
    { month: 'May', income: 2350, expenses: 1950, net: 400 },
    { month: 'Jun', income: 2600, expenses: 2100, net: 500 },
    { month: 'Jul', income: 2500, expenses: 1900, net: 600 },
];
