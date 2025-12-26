export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: 'Income' | 'Housing' | 'Food' | 'Transport' | 'Entertainment' | 'Utilities' | 'Other' | 'Investment' | 'Salary' | 'Allowance' | 'Cape Town Trip';
  amount: number;
  type: 'income' | 'expense';
  details?: {
    items?: string[];
    from?: string;
    to?: string;
    [key: string]: any;
  }
};

export type Budget = {
  id: string;
  category: 'Housing' | 'Food' | 'Transport' | 'Entertainment' | 'Utilities' | 'Other' | 'Investment' | 'Cape Town Trip' | 'Family Reunion' | 'Emergency Fund' | 'Device Upgrade';
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
  imageId: string;
};

export type Receipt = {
    id: string;
    merchant: string;
    date: string;
    items: { name: string; quantity: number; price: number }[];
    subtotal: number;
    tax: number;
    total: number;
    category: 'Food' | 'Transport' | 'Utilities' | 'Other';
    paymentMethod: string;
};

export type Lending = {
    eligibility: {
        eligible: boolean;
        maxLoanAmount: number;
        interestRate: number;
        explanation: string;
    } | null;
};
