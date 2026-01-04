
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  DollarSign,
  Wallet,
  Sparkles,
  Loader2,
  TrendingUp,
  Target,
  ArrowRight
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
import { formatCurrency, cn } from "@/lib/utils";
import { useState, useTransition, useEffect } from "react";
import { generateFinancialSummary } from '@/ai/flows/generate-financial-summary';
import { getPersonalizedBudgetSuggestions } from '@/ai/flows/personalized-budget-suggestions';
import { Button } from "@/components/ui/button";
import { useDemoUser } from "@/contexts/demo-user-context";
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';

export function OverviewCards() {
  const { user, data } = useDemoUser();

  if (!user || !data) return null;

  const totalIncome = data.transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = data.transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalInvested = data.investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalGoalSavings = data.goals.reduce((sum, goal) => sum + goal.saved, 0);

  const overviewData = [
    {
      title: "Total Income",
      value: totalIncome,
      icon: DollarSign,
      change: "This month",
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      icon: Wallet,
      change: "This month",
    },
    {
      title: "Total Invested",
      value: totalInvested,
      icon: TrendingUp,
      change: `25% projected m/m return`,
    },
    {
      title: "Goal Savings",
      value: totalGoalSavings,
      icon: Target,
      change: "Across all goals",
    },
  ];

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
    const { data } = useDemoUser();
    if (!data) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>6-Month Performance</CardTitle>
                <CardDescription>Your income, expenses, and net savings over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.sixMonthPerformance}>
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


export function AICopilotCard() {
  const [isPending, startTransition] = useTransition();
  const [suggestion, setSuggestion] = useState('');
  const { data } = useDemoUser();

  useEffect(() => {
    if (!data) return;
    
    startTransition(async () => {
      const expenseMap = data.transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            if (!acc[t.category]) {
                acc[t.category] = 0;
            }
            acc[t.category] += t.amount;
            return acc;
        }, {} as Record<string, number>);

      const totalIncome = data.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

      const result = await getPersonalizedBudgetSuggestions({
        income: totalIncome,
        expenses: expenseMap,
        financialGoals: data.goals.map(g => g.name).join(', '),
      });
      setSuggestion(result.suggestions);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-background">
      <CardHeader className="flex-row items-start justify-between">
        <div>
          <CardTitle className="text-primary flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Co-pilot
          </CardTitle>
          <CardDescription>
            Your AI-powered financial assistant.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isPending && (
          <div className="space-y-2">
             <div className="h-4 bg-muted-foreground/10 rounded-md animate-pulse" />
             <div className="h-4 bg-muted-foreground/10 rounded-md animate-pulse w-5/6" />
          </div>
        )}
        {suggestion && !isPending && (
          <div className="prose prose-sm max-w-none text-foreground/90">
            <p>{suggestion}</p>
          </div>
        )}
         {!suggestion && !isPending && (
            <p className="text-sm text-muted-foreground">Analyzing your finances for suggestions...</p>
         )}
      </CardContent>
       {suggestion && !isPending && (
        <CardFooter className="gap-2">
          <Button size="sm" asChild>
            <Link href="/dashboard/digital-twin">
                <Sparkles className="mr-2 h-4 w-4" /> Simulate a Scenario
            </Link>
          </Button>
          <Button size="sm" variant="secondary" asChild>
             <Link href="/dashboard/budgets">Adjust Budgets</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}


export function FinancialPulseCard() {
    const { data } = useDemoUser();
    const [safeToSpend, setSafeToSpend] = useState(0);
    const [status, setStatus] = useState<'safe' | 'caution' | 'risk'>('safe');

    useEffect(() => {
        if (!data) return;

        const totalIncome = data.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalSpent = data.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const totalBudgeted = data.budgets.reduce((sum, b) => sum + b.allocated, 0);
        
        // A simple calculation for "safe to spend"
        // (Total Income - Total Budgeted for month) = Discretionary spending
        const discretionary = totalIncome - totalBudgeted;

        // Of the discretionary money, how much is left after all actual expenses.
        // This calculation is a bit flawed for a real app but works for demo.
        // A better way would be: (Income - Fixed/Budgeted Expenses) - Discretionary Spending so far.
        const remaining = totalIncome - totalSpent;
        setSafeToSpend(remaining);

        const spentPercentage = (totalSpent / totalIncome) * 100;

        if (spentPercentage > 90) {
            setStatus('risk');
        } else if (spentPercentage > 70) {
            setStatus('caution');
        } else {
            setStatus('safe');
        }
    }, [data]);

    const statusConfig = {
        safe: {
            color: 'text-green-600',
            bgColor: 'bg-green-500/10',
            progressColor: 'bg-green-500',
            message: 'You are on track this month.'
        },
        caution: {
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-500/10',
            progressColor: 'bg-yellow-500',
            message: 'Your spending is higher than usual.'
        },
        risk: {
            color: 'text-red-600',
            bgColor: 'bg-red-500/10',
            progressColor: 'bg-red-500',
            message: 'You are close to exceeding your income.'
        }
    };

    return (
        <Card className={cn("flex flex-col gap-6 p-6", statusConfig[status].bgColor)}>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="space-y-2">
                    <CardTitle className="text-base font-medium text-foreground/80">Safe to Spend</CardTitle>
                    <div className="flex items-baseline gap-2">
                        <p className={cn("text-4xl font-bold", statusConfig[status].color)}>
                            {formatCurrency(safeToSpend)}
                        </p>
                        <span className="text-sm font-medium text-foreground/60">
                            this month
                        </span>
                    </div>
                </div>
                 <Button variant="ghost" asChild className="w-full sm:w-auto">
                    <Link href="/dashboard/transactions">
                        View All Transactions <ArrowRight className="ml-2 h-4 w-4"/>
                    </Link>
                </Button>
            </div>
            <p className="text-sm text-foreground/60">{statusConfig[status].message}</p>
        </Card>
    );
}
