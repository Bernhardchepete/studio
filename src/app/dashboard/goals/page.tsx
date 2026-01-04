
'use client';

import { useState, useTransition, useEffect } from 'react';
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
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import type { Goal } from '@/lib/types';
import { PlusCircle, Target, Bot, Loader2, Gauge, RefreshCw } from 'lucide-react';
import { generateGoalPlan } from '@/ai/flows/generate-goal-plan';
import { Badge } from '@/components/ui/badge';
import { differenceInMonths, formatDistanceToNow } from 'date-fns';
import { useDemoUser } from '@/contexts/demo-user-context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const GoalCard = ({ goal }: { goal: Goal }) => {
  const [isPending, startTransition] = useTransition();
  const [plan, setPlan] = useState<{ plan: string, probability: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data } = useDemoUser();

  const progress = (goal.saved / goal.target) * 100;
  const deadlineDate = new Date(goal.deadline);
  const monthsRemaining = differenceInMonths(deadlineDate, new Date());
  const monthlyContribution = (goal.target - goal.saved) / (monthsRemaining > 0 ? monthsRemaining : 1);
  
  const goalImage = PlaceHolderImages.find(p => p.id === goal.imageId);

  const handleGeneratePlan = () => {
    if (!data) return;
    const totalIncome = data.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

    setError(null);
    startTransition(async () => {
      try {
        const result = await generateGoalPlan({
          goalName: goal.name,
          goalAmount: goal.target,
          currentSavings: goal.saved,
          deadline: goal.deadline,
          monthlyIncome: totalIncome
        });
        setPlan(result);
      } catch (e) {
        console.error(e);
        setError("The AI model is currently busy. Please try again in a moment.");
      }
    });
  };

  useEffect(() => {
    // Automatically generate plan when the component mounts
    handleGeneratePlan();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); 

  return (
    <Card className="flex flex-col overflow-hidden">
      {goalImage && (
        <div className="relative w-full h-48">
            <Image 
                src={goalImage.imageUrl}
                alt={goal.name}
                fill
                className="object-cover"
                data-ai-hint={goalImage.imageHint}
            />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <Target /> {goal.name}
                </CardTitle>
                <CardDescription>{goal.description}</CardDescription>
            </div>
             <Badge variant="outline">{formatDistanceToNow(deadlineDate, { addSuffix: true })}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Progress</span>
            <span>{formatCurrency(goal.saved)} / {formatCurrency(goal.target)}</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
                <p className="text-muted-foreground">Monthly Contribution</p>
                <p className="font-semibold">{formatCurrency(monthlyContribution)}</p>
            </div>
            <div className="space-y-1">
                <p className="text-muted-foreground">Months Remaining</p>
                <p className="font-semibold">{monthsRemaining > 0 ? monthsRemaining : 'Now'}</p>
            </div>
        </div>

        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Gauge className="text-primary"/>
                <h3 className="font-semibold">AI Probability &amp; Plan</h3>
            </div>
            {plan && !isPending && !error && (
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{Math.round(plan.probability * 100)}%</p>
                        <p className="text-xs text-muted-foreground">Success Rate</p>
                    </div>
                    <p className="text-sm text-foreground/80 border-l pl-4">{plan.plan}</p>
                </div>
            )}
            {isPending && (
                <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                    <div className="h-4 bg-muted-foreground/10 rounded-md animate-pulse w-1/3" />
                    <div className="h-8 bg-muted-foreground/10 rounded-md animate-pulse" />
                </div>
            )}
            {error && !isPending && (
                <Alert variant="destructive">
                    <Bot className="h-4 w-4" />
                    <AlertTitle>AI Plan Failed</AlertTitle>
                    <AlertDescription className="flex items-center justify-between">
                        {error}
                        <Button variant="destructive" size="sm" onClick={handleGeneratePlan}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                    </AlertDescription>
                </Alert>
            )}
        </div>
      </CardContent>
      <CardFooter>
          <Button variant="outline" size="sm">
            Contribute
          </Button>
      </CardFooter>
    </Card>
  );
};


export default function GoalsPage() {
    const { data } = useDemoUser();
    if (!data) return null;

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Financial Goals" />
      <main className="flex-1 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Goals</h2>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
            </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {data.goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </main>
    </div>
  );
}
