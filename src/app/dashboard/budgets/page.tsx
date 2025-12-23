'use client';

import { useState, useEffect } from 'react';
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from "@/components/ui/progress";
import type { Budget } from '@/lib/types';
import { formatCurrency, cn } from "@/lib/utils";
import { PlusCircle, MoreVertical, Zap, CircleDot, ShieldCheck, User, CheckCircle } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { useDemoUser } from '@/contexts/demo-user-context';

const priorityConfig = {
    High: {
      label: "High",
      color: "bg-red-500",
    },
    Medium: {
      label: "Medium",
      color: "bg-yellow-500",
    },
    Low: {
      label: "Low",
      color: "bg-green-500",
    },
  };

  const paymentMethodConfig = {
    Automatic: { label: 'Automatic', icon: Zap },
    Manual: { label: 'Manual', icon: User },
    Confirmation: { label: 'Confirmation', icon: ShieldCheck },
  };

export default function BudgetsPage() {
  const { data } = useDemoUser();
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    if (data) {
      setBudgets(data.budgets);
    }
  }, [data]);

  const handlePaymentMethodChange = (budgetId: string, method: Budget['paymentMethod']) => {
    setBudgets(currentBudgets => 
      currentBudgets.map(b => 
        b.id === budgetId ? { ...b, paymentMethod: method } : b
      )
    );
  };
  
  if (!data) return null;

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Budgets" />
      <main className="flex-1 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Monthly Budgets</h2>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Budget
            </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => {
            const progress = (budget.spent / budget.allocated) * 100;
            const remaining = budget.allocated - budget.spent;
            const isOverBudget = progress > 100;
            const PaymentIcon = paymentMethodConfig[budget.paymentMethod].icon;

            return (
              <Card key={budget.id}>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle>{budget.category}</CardTitle>
                            <CardDescription>
                                {formatCurrency(budget.allocated)} Allocated
                            </CardDescription>
                        </div>
                        <Badge variant={budget.priority === 'High' ? 'destructive' : budget.priority === 'Medium' ? 'secondary' : 'default'}
                            className={cn("capitalize", budget.priority === 'Low' && "bg-green-600 hover:bg-green-700 text-white")}
                        >
                            {budget.priority}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                        <Progress value={isOverBudget ? 100 : progress} className={isOverBudget ? "[&>div]:bg-destructive" : ""} />
                        <div className="flex justify-between text-sm">
                        <span className="font-medium">{formatCurrency(budget.spent)} Spent</span>
                        <span className={isOverBudget ? "text-destructive font-medium" : "text-muted-foreground"}>
                            {isOverBudget ? `${formatCurrency(Math.abs(remaining))} Over` : `${formatCurrency(remaining)} Left`}
                        </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Payment Method</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-auto p-1 -mr-1">
                                    <PaymentIcon className="mr-2 h-4 w-4" />
                                    <span>{paymentMethodConfig[budget.paymentMethod].label}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuRadioGroup 
                                    value={budget.paymentMethod}
                                    onValueChange={(value) => handlePaymentMethodChange(budget.id, value as Budget['paymentMethod'])}
                                >
                                    {Object.entries(paymentMethodConfig).map(([key, {label, icon: Icon}]) => (
                                        <DropdownMenuRadioItem key={key} value={key} className="gap-2">
                                            <Icon className="h-4 w-4" />
                                            <span>{label}</span>
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
