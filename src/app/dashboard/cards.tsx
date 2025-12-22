'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Wallet,
  Sparkles,
  Loader2,
  TrendingUp,
  Target
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { transactions, investments, goals } from "@/lib/data";
import { useState, useTransition } from "react";
import { generateFinancialSummary } from '@/ai/flows/generate-financial-summary';

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

export function CashflowChartCard() {
    const data = [
        { name: 'Income', value: totalIncome, fill: 'hsl(var(--primary))' },
        { name: 'Expenses', value: totalExpenses, fill: 'hsl(var(--accent))' },
    ]
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cash Flow</CardTitle>
                <CardDescription>Your income vs. expenses this month.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data} layout="vertical" margin={{ left: -10 }}>
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={80} />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <p className="font-bold">{`${payload[0].name}: ${formatCurrency(payload[0].value as number)}`}</p>
                                    </div>
                                )
                                }
                                return null
                            }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                    </BarChart>
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
