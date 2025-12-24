import type { DemoData, DemoUser } from './';

export const user: DemoUser = {
    id: 'family',
    name: 'The Motswais',
    email: 'family.motswai@wealthwise.app',
    persona: 'The Family Account',
    description: 'A shared wallet for the Motswai family. Multiple members contribute towards common goals like holidays and home projects.',
    avatarId: 'user-avatar-family'
};

const transactions = [
    { id: '1', date: '2024-07-05', description: 'Contribution - Dad', category: 'Income', amount: 2000, type: 'income' },
    { id: '2', date: '2024-07-06', description: 'Contribution - Mom', category: 'Income', amount: 2000, type: 'income' },
    { id: '3', date: '2024-07-10', description: 'Contribution - Uncle', category: 'Income', amount: 1000, type: 'income' },
    { id: '4', date: '2024-07-15', description: 'Deposit for Venue', category: 'Other', amount: 3000, type: 'expense' },
    { id: '5', date: '2024-07-25', description: 'Catering Quote Payment', category: 'Other', amount: 1500, type: 'expense' },
];

const budgets = [
    { id: '1', category: 'Family Reunion', allocated: 5000, spent: 4500, priority: 'High', paymentMethod: 'Manual' },
];

const investments: any[] = [];

const goals = [
  {
    id: '1',
    name: 'Annual Family Reunion',
    description: 'Saving for the big family get-together in December.',
    target: 15000,
    saved: 9500,
    deadline: '2024-12-01',
    imageId: 'goal-family-reunion'
  }
];

const sixMonthPerformance = [
    { month: 'Feb', income: 5000, expenses: 1000, net: 4000 },
    { month: 'Mar', income: 5000, expenses: 2000, net: 3000 },
    { month: 'Apr', income: 5000, expenses: 500, net: 4500 },
    { month: 'May', income: 5000, expenses: 3000, net: 2000 },
    { month: 'Jun', income: 5000, expenses: 1500, net: 3500 },
    { month: 'Jul', income: 5000, expenses: 4500, net: 500 },
];

const receipts: any[] = [];

export const demoData: DemoData = {
    transactions,
    budgets,
    investments,
    goals,
    sixMonthPerformance,
    receipts
}
