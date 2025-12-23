import type { DemoData, DemoUser } from './';

export const user: DemoUser = {
    id: 'naledi',
    name: 'Naledi',
    email: 'naledi.employee@wealthwise.app',
    persona: 'The Salaried Employee',
    description: 'With a steady income, Naledi is focused on automating her finances, building her credit score, and saving for a new car.',
    avatarId: 'user-avatar-naledi'
};

const transactions = [
    { id: '1', date: '2024-07-25', description: 'Monthly Salary', category: 'Salary', amount: 15000, type: 'income' },
    { id: '2', date: '2024-07-01', description: 'Rent', category: 'Housing', amount: 4500, type: 'expense' },
    { id: '3', date: '2024-07-02', description: 'Car Insurance', category: 'Transport', amount: 600, type: 'expense' },
    { id: '4', date: '2024-07-05', description: 'Electricity', category: 'Utilities', amount: 300, type: 'expense' },
    { id: '5', date: '2024-07-10', description: 'Internet', category: 'Utilities', amount: 500, type: 'expense' },
    { id: '6', date: '2024-07-15', description: 'Groceries', category: 'Food', amount: 1500, type: 'expense', details: { items: ['Bulk shopping for the month'] } },
    { id: '7', date: '2024-07-20', description: 'Gym Membership', category: 'Entertainment', amount: 400, type: 'expense' },
    { id: '8', date: '2024-07-28', description: 'Dinner with friends', category: 'Food', amount: 350, type: 'expense' },
];

const budgets = [
    { id: '1', category: 'Housing', allocated: 4500, spent: 4500, priority: 'High', paymentMethod: 'Automatic' },
    { id: '2', category: 'Transport', allocated: 600, spent: 600, priority: 'High', paymentMethod: 'Automatic' },
    { id: '3', category: 'Utilities', allocated: 800, spent: 800, priority: 'High', paymentMethod: 'Automatic' },
    { id: '4', category: 'Food', allocated: 2000, spent: 1850, priority: 'High', paymentMethod: 'Manual' },
    { id: '5', category: 'Entertainment', allocated: 1000, spent: 400, priority: 'Medium', paymentMethod: 'Manual' },
    { id: '6', category: 'Investment', allocated: 2000, spent: 0, priority: 'High', paymentMethod: 'Automatic' },
    { id: '7', category: 'Car Purchase', allocated: 3250, spent: 0, priority: 'High', paymentMethod: 'Automatic' },
];

const investments = [
    { id: '1', name: 'WealthWise Growth Fund', amount: 10000, startDate: '2024-01-01' }
];

const goals = [
  {
    id: '1',
    name: 'Buy a Car',
    description: 'Saving for a down payment on a reliable new car.',
    target: 50000,
    saved: 15000,
    deadline: '2025-07-01'
  }
];

const sixMonthPerformance = [
    { month: 'Feb', income: 15000, expenses: 8000, net: 7000 },
    { month: 'Mar', income: 15000, expenses: 8200, net: 6800 },
    { month: 'Apr', income: 15000, expenses: 7900, net: 7100 },
    { month: 'May', income: 15000, expenses: 8500, net: 6500 },
    { month: 'Jun', income: 15000, expenses: 8100, net: 6900 },
    { month: 'Jul', income: 15000, expenses: 8150, net: 6850 },
];

const receipts = [
    {
      id: '1',
      merchant: 'Woolworths',
      date: '2024-07-15',
      items: [
        { name: 'Monthly Groceries', quantity: 1, price: 1500.00 },
      ],
      subtotal: 1500.00,
      tax: 0.00,
      total: 1500.00,
      category: 'Food',
      paymentMethod: 'Card',
    },
];

export const demoData: DemoData = {
    transactions,
    budgets,
    investments,
    goals,
    sixMonthPerformance,
    receipts
}
