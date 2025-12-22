export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: 'Income' | 'Housing' | 'Food' | 'Transport' | 'Entertainment' | 'Utilities' | 'Other' | 'Investment' | 'Salary' | 'Allowance';
  amount: number;
  type: 'income' | 'expense';
};

export type Budget = {
  id: string;
  category: 'Housing' | 'Food' | 'Transport' | 'Entertainment' | 'Utilities' | 'Other';
  allocated: number;
  spent: number;
  priority: 'High' | 'Medium' | 'Low';
  paymentMethod: 'Automatic' | 'Manual' | 'Confirmation';
};

export type Investment = {
  id: string;
  name: string;
  amount: number;
  startDate: string;
};

export type Goal = {
  id: string;
  name: string;
  target: number;
  saved: number;
  deadline: string;
  description: string;
};
