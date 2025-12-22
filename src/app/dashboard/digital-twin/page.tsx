'use client';

import { useState, useTransition } from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Loader2 } from 'lucide-react';
import { transactions } from '@/lib/data';
import { simulateFinancialScenario } from '@/ai/flows/financial-scenario-simulator';

export default function DigitalTwinPage() {
  const [scenario, setScenario] = useState('');
  const [isPending, startTransition] = useTransition();
  const [prediction, setPrediction] = useState('');

  const currentFinancials = JSON.stringify({
    transactions,
    financialGoals: "Saving for a trip to Cape Town at the end of the year.",
  }, null, 2);

  const handleSimulate = () => {
    if (!scenario) return;

    startTransition(async () => {
      const result = await simulateFinancialScenario({
        currentFinancials: currentFinancials,
        scenario: scenario,
      });
      setPrediction(result.prediction);
    });
  };

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Digital Twin" />
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Digital Twin</CardTitle>
              <CardDescription>
                Ask a question or propose a scenario to see the financial impact.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  id="scenario"
                  placeholder="e.g., What happens if I save BWP 500 more per month? or What if my side hustle income increases by 20%?"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  className="h-24"
                />
              </div>
              <Button onClick={handleSimulate} disabled={isPending || !scenario}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Bot className="mr-2 h-4 w-4" />
                )}
                Talk to Twin
              </Button>
            </CardContent>
          </Card>

          {(isPending || prediction) && (
            <Card>
                <CardHeader>
                    <CardTitle>Simulation Result</CardTitle>
                    <CardDescription>
                    Here's the predicted outcome from your Digital Twin.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isPending && (
                    <div className="space-y-3">
                        <div className="h-5 bg-muted-foreground/10 rounded-md animate-pulse" />
                        <div className="h-5 bg-muted-foreground/10 rounded-md animate-pulse w-5/6" />
                        <div className="h-5 bg-muted-foreground/10 rounded-md animate-pulse w-3/4" />
                        <div className="h-5 bg-muted-foreground/10 rounded-md animate-pulse w-4/6" />
                        <div className="h-5 bg-muted-foreground/10 rounded-md animate-pulse w-5/6" />
                    </div>
                    )}
                    {prediction && !isPending && (
                    <div className="prose prose-sm max-w-none text-foreground/90">
                        <p>{prediction}</p>
                    </div>
                    )}
                </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
