'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSign,
  Wallet,
  Sparkles,
  Loader2,
  TrendingUp,
  Target
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { transactions, investments, goals, sixMonthPerformance } from "@/lib/data";
import { useState, useTransition } from "react";
import { generateFinancialSummary } from '@/ai/flows/generate-financial-summary';
import { Button } from "@/components/ui/button";

const totalIncome = transactions
  .filter((t) => t.type === "income")
  .reduce((sum, t) => sum + t.amount, 0);
const totalExpenses = transactions
  .filter((t) => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);
const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
const totalGoalSavings = goals.reduce((sum, goal) => sum + goal.saved, 0);


const overviewData = [
  {
    title: "Monthly Income",
    value: totalIncome,
    icon: DollarSign,
    change: "+12% from last month",
  },
  {
    title: "Monthly Expenses",
    value: totalExpenses,
    icon: Wallet,
    change: "-5% from last month",
  },
  {
    title: "Total Invested",
    value: totalInvested,
    icon: TrendingUp,
    change: "20% avg. return",
  },
  {
    title: "Goal Savings",
    value: totalGoalSavings,
    icon: Target,
    change: "On track for Cape Town!",
  },
];


export function OverviewCards() {
  return (
    <>
      {overviewData.map((item, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(item.value)}
            </div>
            <p className="text-xs text-muted-foreground">{item.change}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export function PerformanceChartCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>6-Month Performance</CardTitle>
                <CardDescription>Your income, expenses, and net savings over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sixMonthPerformance}>
                        <XAxis
                            dataKey="month"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => formatCurrency(value, {notation: 'compact'})}
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                            <div className="flex items-center">
                                                <div className="font-semibold col-span-2 text-center mb-1">{label}</div>
                                            </div>
                                            <div className="font-medium text-muted-foreground">Income</div>
                                            <div className="text-right">{formatCurrency(payload.find(p => p.dataKey === 'income')?.value as number)}</div>

                                            <div className="font-medium text-muted-foreground">Expenses</div>
                                            <div className="text-right">{formatCurrency(payload.find(p => p.dataKey === 'expenses')?.value as number)}</div>
                                            
                                            <div className="font-medium text-muted-foreground">Net Savings</div>
                                            <div className="text-right font-bold">{formatCurrency(payload.find(p => p.dataKey === 'net')?.value as number)}</div>
                                        </div>
                                    </div>
                                )
                                }
                                return null
                            }}
                        />
                        <Legend wrapperStyle={{fontSize: "0.875rem"}}/>
                        <Line
                            type="monotone"
                            stroke="hsl(var(--primary))"
                            dataKey="income"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                        />
                        <Line
                            type="monotone"
                            stroke="hsl(var(--accent))"
                            dataKey="expenses"
                            strokeWidth={2}
                             dot={{ r: 4 }}
                        />
                         <Line
                            type="monotone"
                            stroke="hsl(var(--chart-3))"
                            dataKey="net"
                            strokeWidth={2}
                             dot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}


export function AIInsightsCard() {
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState('');

  const handleGenerateSummary = () => {
    startTransition(async () => {
      const incomeString = transactions.filter(t => t.type === 'income').map(t => `${t.description}: ${formatCurrency(t.amount)}`).join(', ');
      const expensesString = transactions.filter(t => t.type === 'expense').map(t => `${t.category} - ${t.description}: ${formatCurrency(t.amount)}`).join(', ');
      
      const result = await generateFinancialSummary({
        assets: `Total Investments: ${formatCurrency(totalInvested)}, Goal Savings: ${formatCurrency(totalGoalSavings)}`,
        liabilities: 'No liabilities',
        income: incomeString,
        expenses: expensesString,
      });
      setSummary(result.summary);
    });
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-background">
      <CardHeader className="flex-row items-start justify-between">
        <div>
          <CardTitle className="text-primary flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Financial Summary
          </CardTitle>
          <CardDescription>
            Get an AI-powered overview of your financial health.
          </CardDescription>
        </div>
        <Button onClick={handleGenerateSummary} disabled={isPending}>
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate
        </Button>
      </CardHeader>
      <CardContent>
        {isPending && (
          <div className="space-y-2">
             <div className="h-4 bg-muted-foreground/10 rounded-md animate-pulse" />
             <div className="h-4 bg-muted-foreground/10 rounded-md animate-pulse w-5/6" />
             <div className="h-4 bg-muted-foreground/10 rounded-md animate-pulse w-3/4" />
          </div>
        )}
        {summary && !isPending && (
          <div className="prose prose-sm max-w-none text-foreground/90">
            <p>{summary}</p>
          </div>
        )}
         {!summary && !isPending && (
            <p className="text-sm text-muted-foreground">Click "Generate" to get your personalized financial summary.</p>
         )}
      </CardContent>
    </Card>
  );
}
