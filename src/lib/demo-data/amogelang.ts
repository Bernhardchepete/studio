
import type { DemoData, DemoUser } from './';

export const user: DemoUser = {
    id: 'amogelang',
    name: 'Amogelang',
    email: 'amo.freelancer@thuo.app',
    persona: 'The Gig Worker',
    description: 'Riding the waves of freelance life, Amogelang needs tools to smooth out income, save for goals, and manage irregular payments.',
    avatarId: 'user-avatar-amogelang'
};

const transactions = [
    { id: '1', date: '2024-07-08', description: 'Logo Design Project', category: 'Income', amount: 3500, type: 'income' },
    { id: '2', date: '2024-07-22', description: 'Website Consultation', category: 'Income', amount: 5000, type: 'income' },
    { id: '3', date: '2024-07-01', description: 'Rent', category: 'Housing', amount: 3000, type: 'expense' },
    { id: '4', date: '2024-07-05', description: 'Co-working Space', category: 'Utilities', amount: 1000, type: 'expense' },
    { id: '5', date: '2024-07-12', description: 'Groceries', category: 'Food', amount: 800, type: 'expense' },
    { id: '6', date: '2024-07-19', description: 'Client Lunch', category: 'Food', amount: 250, type: 'expense' },
    { id: '7', date: '2024-07-28', description: 'Transport', category: 'Transport', amount: 400, type: 'expense' },
];

const budgets = [
    { id: '1', category: 'Housing', allocated: 3000, spent: 3000, priority: 'High', paymentMethod: 'Confirmation' },
    { id: '2', category: 'Utilities', allocated: 1000, spent: 1000, priority: 'High', paymentMethod: 'Automatic' },
    { id: '3', category: 'Food', allocated: 1500, spent: 1050, priority: 'Medium', paymentMethod: 'Manual' },
    { id: '4', category: 'Transport', allocated: 500, spent: 400, priority: 'Medium', paymentMethod: 'Manual' },
    { id: '5', category: 'Emergency Fund', allocated: 1500, spent: 0, priority: 'High', paymentMethod: 'Automatic' },
    { id: '6', category: 'Device Upgrade', allocated: 1050, spent: 0, priority: 'Medium', paymentMethod: 'Automatic' },
];

const investments = [
    { id: '1', name: 'Thuo Balanced Fund', amount: 4000, startDate: '2024-02-01' }
];

const goals = [
    {
        id: '1',
        name: 'Emergency Fund',
        description: 'Build a 3-month living expense safety net.',
        target: 18000,
        saved: 6000,
        deadline: '2025-01-01',
        imageId: 'goal-emergency-fund'
    },
    {
        id: '2',
        name: 'New Laptop',
        description: 'Upgrade to a new MacBook Pro for work.',
        target: 25000,
        saved: 5000,
        deadline: '2024-12-01',
        imageId: 'goal-new-laptop'
    }
];

const sixMonthPerformance = [
    { month: 'Feb', income: 7000, expenses: 5000, net: 2000 },
    { month: 'Mar', income: 12000, expenses: 6000, net: 6000 },
    { month: 'Apr', income: 5000, expenses: 5500, net: -500 },
    { month: 'May', income: 9000, expenses: 5800, net: 3200 },
    { month: 'Jun', income: 11000, expenses: 6200, net: 4800 },
    { month: 'Jul', income: 8500, expenses: 5450, net: 3050 },
];

const receipts: any[] = [];

const lending = {
    eligibility: {
        eligible: false,
        maxLoanAmount: 0,
        interestRate: 0,
        explanation: "Income is too variable for a standard loan. Build a more consistent income history to become eligible."
    }
};

export const demoData: DemoData = {
    transactions,
    budgets,
    investments,
    goals,
    sixMonthPerformance,
    receipts,
    lending,
}
