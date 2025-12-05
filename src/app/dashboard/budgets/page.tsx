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
import { Progress } from "@/components/ui/progress";
import { budgets } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { PlusCircle, MoreVertical } from "lucide-react";

export default function BudgetsPage() {
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

            return (
              <Card key={budget.id}>
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle>{budget.category}</CardTitle>
                    <CardDescription>
                      {formatCurrency(budget.allocated)} Allocated
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={isOverBudget ? 100 : progress} className={isOverBudget ? "[&>div]:bg-destructive" : ""} />
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{formatCurrency(budget.spent)} Spent</span>
                      <span className={isOverBudget ? "text-destructive font-medium" : "text-muted-foreground"}>
                        {isOverBudget ? `${formatCurrency(Math.abs(remaining))} Over` : `${formatCurrency(remaining)} Left`}
                      </span>
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
