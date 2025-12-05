'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Wallet,
  Sparkles,
  Loader2,
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
import { assets, liabilities, transactions, budgets } from "@/lib/data";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { generateFinancialSummary } from '@/ai/flows/generate-financial-summary';

const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
const totalLiabilities = liabilities.reduce(
  (sum, liability) => sum + liability.amount,
  0
);
const netWorth = totalAssets - totalLiabilities;

const totalIncome = transactions
  .filter((t) => t.type === "income")
  .reduce((sum, t) => sum + t.amount, 0);
const totalExpenses = transactions
  .filter((t) => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);

const overviewData = [
  {
    title: "Net Worth",
    value: netWorth,
    icon: Wallet,
    change: "+$2,019.00 from last month",
  },
  {
    title: "Monthly Income",
    value: totalIncome,
    icon: ArrowUpRight,
    change: "+12% from last month",
  },
  {
    title: "Monthly Expenses",
    value: totalExpenses,
    icon: ArrowDownLeft,
    change: "-5% from last month",
  },
  {
    title: "Savings Rate",
    value: ((totalIncome - totalExpenses) / totalIncome) * 100,
    icon: DollarSign,
    isPercentage: true,
    change: "+3% from last month",
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
              {item.isPercentage
                ? `${item.value.toFixed(2)}%`
                : formatCurrency(item.value)}
            </div>
            <p className="text-xs text-muted-foreground">{item.change}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export function RecentTransactionsCard() {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          Your latest financial activities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.category}
                  </div>
                </TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end">
        <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/transactions">View All</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function BudgetProgressCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Budget Progress</CardTitle>
                <CardDescription>How you're tracking against your monthly budgets.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {budgets.map(budget => {
                    const progress = (budget.spent / budget.allocated) * 100;
                    return (
                        <div key={budget.id}>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">{budget.category}</span>
                                <span className="text-sm text-muted-foreground">
                                    {formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}
                                </span>
                            </div>
                            <Progress value={progress} />
                        </div>
                    )
                })}
            </CardContent>
            <CardFooter className="justify-end">
                <Button asChild variant="ghost" size="sm">
                    <Link href="/dashboard/budgets">Manage Budgets</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export function CashflowChartCard() {
    const data = [
        { name: 'Income', value: totalIncome },
        { name: 'Expenses', value: totalExpenses },
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
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} >
                            {
                                data.map((entry, index) => (
                                    <rect key={`cell-${index}`} fill={index === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))'} />
                                ))
                            }
                        </Bar>
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
      const assetsString = assets.map(a => `${a.name}: ${formatCurrency(a.value)}`).join(', ');
      const liabilitiesString = liabilities.map(l => `${l.name}: ${formatCurrency(l.amount)}`).join(', ');
      const incomeString = transactions.filter(t => t.type === 'income').map(t => `${t.description}: ${formatCurrency(t.amount)}`).join(', ');
      const expensesString = transactions.filter(t => t.type === 'expense').map(t => `${t.category} - ${t.description}: ${formatCurrency(t.amount)}`).join(', ');
      
      const result = await generateFinancialSummary({
        assets: assetsString,
        liabilities: liabilitiesString,
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
