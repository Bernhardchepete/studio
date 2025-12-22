export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: 'Income' | 'Housing' | 'Food' | 'Transport' | 'Entertainment' | 'Utilities' | 'Other' | 'Investment' | 'Salary' | 'Allowance';
  amount: number;
  type: 'income' | 'expense';
};

export type Asset = {
  id: string;
  name: string;
  type: string;
  value: number;
};

export type Liability = {
  id:string;
  name: string;
  type: string;
  amount: number;
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
