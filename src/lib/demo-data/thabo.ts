
import type { DemoData, DemoUser } from './';

export const user: DemoUser = {
    id: 'thabo',
    name: 'Thabo',
    email: 'thabo.student@thuo.app',
    persona: 'The Student',
    description: 'Balancing a school allowance and a side hustle, Thabo is focused on micro-saving and getting a head start on investing.',
    avatarId: 'user-avatar-thabo'
};

const transactions = [
    { id: '1', date: '2024-07-28', description: 'School Allowance', category: 'Allowance', amount: 1900, type: 'income' },
    { id: '2', date: '2024-07-15', description: 'Side Hustle - Tutoring', category: 'Income', amount: 500, type: 'income' },
    { id: '3', date: '2024-07-01', description: 'Rent Contribution', category: 'Housing', amount: 1000, type: 'expense' },
    { id: '4', date: '2024-07-26', description: 'Weekly Groceries', category: 'Food', amount: 120, type: 'expense', details: { items: ['Milk', 'Bread', 'Eggs', 'Chicken Breasts', 'Rice'] } },
    { id: '5', date: '2024-07-22', description: 'Trip to University', category: 'Transport', amount: 80, type: 'expense', details: { from: 'Home (Gaborone West)', to: 'University of Botswana' } },
    { id: '6', date: '2024-07-19', description: 'Groceries', category: 'Food', amount: 95, type: 'expense', details: { items: ['Apples', 'Yogurt', 'Cereal', 'Snacks'] } },
    { id: '7', date: '2024-07-15', description: 'Social Outing', category: 'Entertainment', amount: 150, type: 'expense' },
    { id: '8', date: '2024-07-12', description: 'Takeout', category: 'Food', amount: 85, type: 'expense' },
    { id: '9', date: '2024-07-08', description: 'Data & Airtime', category: 'Utilities', amount: 100, type: 'expense' },
    { id: '10', date: '2024-07-05', description: 'Groceries', category: 'Food', amount: 100, type: 'expense', details: { items: ['Pasta', 'Sauce', 'Vegetables'] } },
    { id: '11', date: '2024-07-01', description: 'Books & Supplies', category: 'Other', amount: 200, type: 'expense' },
];

const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
const whatsLeft = totalIncome - totalExpenses;
const investmentAmount = whatsLeft > 0 ? whatsLeft * 0.6 : 0;
const goalAmount = whatsLeft > 0 ? whatsLeft * 0.4 : 0;

const budgets = [
    { id: '1', category: 'Housing', allocated: 1000, spent: 1000, priority: 'High', paymentMethod: 'Automatic' },
    { id: '2', category: 'Food', allocated: 400, spent: 400, priority: 'High', paymentMethod: 'Manual' },
    { id: '3', category: 'Transport', allocated: 80, spent: 80, priority: 'Medium', paymentMethod: 'Manual' },
    { id: '4', category: 'Entertainment', allocated: 150, spent: 150, priority: 'Low', paymentMethod: 'Manual' },
    { id: '5', category: 'Utilities', allocated: 100, spent: 100, priority: 'High', paymentMethod: 'Confirmation' },
    { id: '6', category: 'Other', allocated: 200, spent: 200, priority: 'Low', paymentMethod: 'Manual' },
    { id: '7', category: 'Investment', allocated: investmentAmount, spent: 0, priority: 'High', paymentMethod: 'Automatic' },
    { id: '8', category: 'Cape Town Trip', allocated: goalAmount, spent: 0, priority: 'High', paymentMethod: 'Automatic' },
];

const investments = [
    { id: '1', name: 'Thuo Growth Fund', amount: 500, startDate: '2024-06-01' }
];

const goals = [
  {
    id: '1',
    name: 'Trip to Cape Town',
    description: 'A 5-day trip to explore the Mother City for my birthday.',
    target: 7000,
    saved: 2500,
    deadline: '2024-12-15',
    imageId: 'goal-cape-town',
  }
];

const sixMonthPerformance = [
    { month: 'Feb', income: 1900, expenses: 1800, net: 100 },
    { month: 'Mar', income: 1900, expenses: 1900, net: 0 },
    { month: 'Apr', income: 2400, expenses: 1850, net: 550 },
    { month: 'May', income: 2400, expenses: 1950, net: 450 },
    { month: 'Jun', income: 2400, expenses: 1800, net: 600 },
    { month: 'Jul', income: 2400, expenses: 1930, net: 470 },
];

const receipts = [
    {
      id: '1',
      merchant: 'Shoprite',
      date: '2024-07-26',
      items: [
        { name: 'Milk 1L', quantity: 2, price: 24.00 },
        { name: 'Brown Bread', quantity: 1, price: 10.00 },
        { name: 'Eggs 12-pack', quantity: 1, price: 26.00 },
        { name: 'Chicken Breasts 1kg', quantity: 1, price: 60.00 },
      ],
      subtotal: 120.00,
      tax: 0.00,
      total: 120.00,
      category: 'Food',
      paymentMethod: 'Card',
    },
    {
        id: '2',
        merchant: 'Chicken Licken',
        date: '2024-07-12',
        items: [{ name: 'Streetwise 2', quantity: 2, price: 85.00 }],
        subtotal: 85.00,
        tax: 0.00,
        total: 85.00,
        category: 'Food',
        paymentMethod: 'Cash',
      },
  ];

const lending = {
    eligibility: {
        eligible: false,
        maxLoanAmount: 0,
        interestRate: 0,
        explanation: "Low and inconsistent income. Focus on building a more stable income source before applying for loans."
    }
};

export const demoData: DemoData = {
    transactions,
    budgets,
    investments,
    goals,
    sixMonthPerformance,
    receipts,
    lending
}
