
'use client';

import { useState, useEffect } from 'react';
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter as TableFoot,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import type { Investment, Transaction } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDemoUser } from '@/contexts/demo-user-context';

const MONTHLY_INTEREST_RATE = 0.25; // 25%

export default function InvestmentsPage() {
  const { data, updateData } = useDemoUser();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [investmentAmount, setInvestmentAmount] = useState('');

  useEffect(() => {
    if (data) {
      setInvestments(data.investments);
    }
  }, [data]);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  
  const handleInvest = () => {
    const amount = parseFloat(investmentAmount);
    if (!amount || amount <= 0 || !data) return;

    const newInvestment: Investment = {
      id: (investments.length + 1).toString(),
      name: `,ThuoX Growth Fund`,
      amount,
      startDate: new Date().toISOString(),
    };

    const newTransaction: Transaction = {
        id: (data.transactions.length + 1).toString(),
        date: new Date().toISOString(),
        description: 'New Investment',
        category: 'Investment',
        amount: amount,
        type: 'expense'
    };
    
    const newInvestments = [...investments, newInvestment];
    const newTransactions = [newTransaction, ...data.transactions];

    updateData({ investments: newInvestments, transactions: newTransactions });
    setInvestmentAmount('');
  };

  const chartData = Array.from({ length: 13 }, (_, i) => {
    const monthName = new Date(2024, i, 1).toLocaleString('default', { month: 'short' });
    const value = totalInvested * Math.pow(1 + MONTHLY_INTEREST_RATE, i);
    return { name: i === 0 ? 'Start' : monthName, value };
  });

  const projectedValue12Months = totalInvested * Math.pow(1 + MONTHLY_INTEREST_RATE, 12);
  const monthlyReturn = totalInvested * MONTHLY_INTEREST_RATE;
  
  if (!data) return null;

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Investments" />
      <main className="flex-1 p-4 sm:p-6 grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2 grid gap-6 lg:grid-cols-2">
            <Card>
            <CardHeader>
                <CardTitle>Invest Your Money</CardTitle>
                <CardDescription>Grow your wealth with a projected 25% monthly return.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="investment-amount">Amount to Invest (BWP)</Label>
                <Input
                    id="investment-amount"
                    type="number"
                    placeholder="e.g., 500"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                />
                </div>
                 <p className="text-sm text-muted-foreground">
                    Based on a 25% monthly interest rate. Returns are compounded monthly.
                </p>
            </CardContent>
            <CardFooter>
                <Button onClick={handleInvest} disabled={!investmentAmount}>Invest Now</Button>
            </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>12-Month Projection</CardTitle>
                    <CardDescription>Based on your current total investment and monthly compounding at 25%.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => formatCurrency(value, {notation: 'compact'})} />
                        <Tooltip content={({ active, payload }) => {
                             if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <p className="font-bold">{`${payload[0].name}: ${formatCurrency(payload[0].value as number)}`}</p>
                                    </div>
                                )
                                }
                                return null
                        }} />
                        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{r: 5, fill: "hsl(var(--primary))"}} activeDot={{ r: 8 }}/>
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Investment Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investment</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.name}</TableCell>
                    <TableCell>{new Date(inv.startDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(inv.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFoot>
                <TableRow className="text-base font-bold">
                  <TableCell colSpan={2}>Total Invested</TableCell>
                  <TableCell className="text-right">{formatCurrency(totalInvested)}</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell colSpan={2} className="text-muted-foreground">Projected Monthly Return (25%)</TableCell>
                  <TableCell className="text-right text-green-600">{formatCurrency(monthlyReturn)}</TableCell>
                </TableRow>
                <TableRow className="text-lg font-bold">
                  <TableCell colSpan={2}>Projected Value (12 Months)</TableCell>
                  <TableCell className="text-right">{formatCurrency(projectedValue12Months)}</TableCell>
                </TableRow>
              </TableFoot>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
