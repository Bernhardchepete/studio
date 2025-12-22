
'use client';

import { useState } from 'react';
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
import { investments as initialInvestments } from "@/lib/data";
import type { Investment } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ANNUAL_USER_RATE = 0.20; // 20%
const MONTHLY_USER_RATE = ANNUAL_USER_RATE / 12;

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>(initialInvestments);
  const [investmentAmount, setInvestmentAmount] = useState('');

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  
  const handleInvest = () => {
    const amount = parseFloat(investmentAmount);
    if (!amount || amount <= 0) return;

    // This is a simulation. In a real app, you'd check user's balance
    const newInvestment: Investment = {
      id: (investments.length + 1).toString(),
      name: `WealthWise Growth Fund`,
      amount,
      startDate: new Date().toISOString(),
    };
    setInvestments([...investments, newInvestment]);
    setInvestmentAmount('');
  };

  const chartData = Array.from({ length: 13 }, (_, i) => {
    const monthName = new Date(2024, i, 1).toLocaleString('default', { month: 'short' });
    const value = totalInvested * Math.pow(1 + MONTHLY_USER_RATE, i);
    return { name: i === 0 ? 'Start' : monthName, value };
  });

  const projectedValue12Months = totalInvested * Math.pow(1 + MONTHLY_USER_RATE, 12);
  const monthlyReturn = totalInvested * MONTHLY_USER_RATE;

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Investments" />
      <main className="flex-1 p-4 sm:p-6 grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2 grid gap-6 lg:grid-cols-2">
            <Card>
            <CardHeader>
                <CardTitle>Invest Your Money</CardTitle>
                <CardDescription>Grow your wealth with a projected 20% annual return, calculated monthly.</CardDescription>
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
                    Based on a total 25% annual interest rate. You keep 20%, WealthWise receives 5%. Returns are compounded monthly.
                </p>
            </CardContent>
            <CardFooter>
                <Button onClick={handleInvest} disabled={!investmentAmount}>Invest Now</Button>
            </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>12-Month Projection</CardTitle>
                    <CardDescription>Based on your current total investment and monthly compounding.</CardDescription>
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
                  <TableCell colSpan={2} className="text-muted-foreground">Projected Monthly Return</TableCell>
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
