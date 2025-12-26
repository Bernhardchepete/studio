import type { Transaction, Budget, Investment, Goal, Receipt, Lending } from '../types';

import { demoData as thaboData, user as thaboUser } from './thabo';
import { demoData as nalediData, user as nalediUser } from './naledi';
import { demoData as kabeloData, user as kabeloUser } from './kabelo';
import { demoData as amogelangData, user as amogelangUser } from './amogelang';
import { demoData as familyData, user as familyUser } from './family';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  persona: string;
  description: string;
  avatarId: string;
}

export interface DemoData {
  transactions: Transaction[];
  budgets: Budget[];
  investments: Investment[];
  goals: Goal[];
  sixMonthPerformance: { month: string; income: number; expenses: number; net: number }[];
  receipts: Receipt[];
  lending: Lending;
}

export const demoUsers: DemoUser[] = [
  thaboUser,
  nalediUser,
  kabeloUser,
  amogelangUser,
  familyUser,
];

export const demoData = {
  thabo: thaboData,
  naledi: nalediData,
  kabelo: kabeloData,
  amogelang: amogelangData,
  family: familyData,
};
