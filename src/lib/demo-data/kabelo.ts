import type { DemoData, DemoUser } from './';

export const user: DemoUser = {
    id: 'kabelo',
    name: 'Kabelo',
    email: 'kabelo.sme@wealthwise.app',
    persona: 'The SME Owner',
    description: 'Juggling variable business income, Kabelo needs to track expenses meticulously and access working capital to grow his business.',
    avatarId: 'user-avatar-kabelo'
};

const transactions = [
    { id: '1', date: '2024-07-05', description: 'Client Payment - Project A', category: 'Income', amount: 12000, type: 'income' },
    { id: '2', date: '2024-07-15', description: 'Client Payment - Project B', category: 'Income', amount: 8500, type: 'income' },
    { id: '3', date: '2024-07-28', description: 'Client Payment - Retainer', category: 'Income', amount: 5000, type: 'income' },
    { id: '4', date: '2024-07-02', description: 'Office Supplies', category: 'Other', amount: 1200, type: 'expense' },
    { id: '5', date: '2024-07-10', description: 'Software Subscriptions', category: 'Utilities', amount: 800, type: 'expense' },
    { id: '6', date: '2024-07-18', description: 'Contractor Payout', category: 'Other', amount: 7000, type: 'expense' },
    { id: '7', date: '2024-07-25', description: 'Personal Drawdown', category: 'Income', amount: 10000, type: 'expense' },
];

const budgets = [
    { id: '1', category: 'Utilities', allocated: 1000, spent: 800, priority: 'High', paymentMethod: 'Automatic' },
    { id: '2', category: 'Other', allocated: 10000, spent: 8200, priority: 'Medium', paymentMethod: 'Manual' },
    { id: '3', category: 'Investment', allocated: 5000, spent: 0, priority: 'Low', paymentMethod: 'Manual' },
];

const investments = [
    { id: '1', name: 'Business Re-investment', amount: 25000, startDate: '2024-03-01' }
];

const goals = [
  {
    id: '1',
    name: 'Stabilize Cash Flow',
    description: 'Maintain a minimum of P15,000 positive cash flow for 3 consecutive months.',
    target: 15000,
    saved: 6500, // Current month's net
    deadline: '2024-10-01'
  },
  {
    id: '2',
    name: 'Access Working Capital',
    description: 'Become eligible for a P20,000 short-term loan for business expansion.',
    target: 20000,
    saved: 0,
    deadline: '2024-09-01'
  }
];

const sixMonthPerformance = [
    { month: 'Feb', income: 20000, expenses: 15000, net: 5000 },
    { month: 'Mar', income: 15000, expenses: 18000, net: -3000 },
    { month: 'Apr', income: 30000, expenses: 20000, net: 10000 },
    { month: 'May', income: 22000, expenses: 25000, net: -3000 },
    { month: 'Jun', income: 28000, expenses: 18000, net: 10000 },
    { month: 'Jul', income: 25500, expenses: 19000, net: 6500 },
];

const receipts = [
    {
      id: '1',
      merchant: 'Office R Us',
      date: '2024-07-02',
      items: [
        { name: 'Printer Paper', quantity: 5, price: 250.00 },
        { name: 'Ink Cartridge', quantity: 2, price: 800.00 },
        { name: 'Pens & Markers', quantity: 1, price: 150.00 },
      ],
      subtotal: 1200.00,
      tax: 0.00,
      total: 1200.00,
      category: 'Other',
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
